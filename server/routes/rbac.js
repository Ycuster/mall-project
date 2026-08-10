const router = require('express').Router()
const db = require('../config/db')
const { auth, requirePermission, getUserPermissions, getUserRoles, clearAllPermissionCache } = require('../middleware/rbac')

// ================================================
// 权限树（前端菜单+按钮渲染）
// ================================================
router.get('/tree', auth, async (req, res) => {
  try {
    const { codes, modules } = await getUserPermissions(req.user.id)
    const roles = await getUserRoles(req.user.id)

    // 获取所有启用的权限（类型为 menu 的用于构建菜单树）
    const [allMenus] = await db.query(
      `SELECT * FROM permissions WHERE type = 'menu' AND status = 1
       ORDER BY module, sort_order`
    )

    const accessibleMenus = allMenus.filter(m => codes.includes(m.code))

    // 按模块分组
    const menuMap = {}
    for (const m of accessibleMenus) {
      if (!menuMap[m.module]) menuMap[m.module] = { module: m.module, menus: [] }
      menuMap[m.module].menus.push(m)
    }

    res.json({
      code: 200,
      data: {
        menus: Object.values(menuMap),
        codes,
        modules,
        roles: roles.map(r => ({ id: r.id, code: r.code, name: r.name }))
      }
    })
  } catch (e) {
    console.error('[RBAC] tree error:', e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

// ================================================
// 角色列表（管理端）
// ================================================
router.get('/roles', auth, requirePermission('role:view'), async (req, res) => {
  try {
    const { keyword, status, page = 1, pageSize = 20 } = req.query
    let where = 'WHERE 1=1', countWhere = 'WHERE 1=1'
    let params = [], countParams = []

    if (keyword) {
      const like = `%${keyword}%`
      where += ' AND (name LIKE ? OR code LIKE ? OR description LIKE ?)'
      countWhere += ' AND (name LIKE ? OR code LIKE ? OR description LIKE ?)'
      params.push(like, like, like)
      countParams.push(like, like, like)
    }
    if (status !== undefined && status !== '') {
      where += ' AND status=?'; countWhere += ' AND status=?'
      params.push(+status); countParams.push(+status)
    }

    const offset = (Math.max(1, +page) - 1) * +pageSize
    params.push(+pageSize, offset)

    const [list] = await db.query(
      `SELECT * FROM roles ${where} ORDER BY sort_order, id LIMIT ? OFFSET ?`,
      params
    )
    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) as total FROM roles ${countWhere}`, countParams
    )

    // 附加每个角色的权限列表
    for (const role of list) {
      const [perms] = await db.query(
        `SELECT p.* FROM permissions p
         JOIN role_permissions rp ON p.id = rp.permission_id
         WHERE rp.role_id = ?`,
        [role.id]
      )
      role.permissions = perms
    }

    res.json({ code: 200, data: { list, total, page: +page, pageSize: +pageSize } })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 新增角色
router.post('/roles', auth, requirePermission('role:create'), async (req, res) => {
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()
    const { name, code, description, sort_order = 0, status = 1, permission_ids = [] } = req.body

    if (!name || !code) return res.json({ code: 400, message: '名称和编码必填' })

    const [exists] = await conn.query('SELECT id FROM roles WHERE code=?', [code])
    if (exists.length) return res.json({ code: 400, message: '角色编码已存在' })

    const [r] = await conn.query(
      'INSERT INTO roles (name, code, description, sort_order, status) VALUES (?,?,?,?,?)',
      [name, code, description || '', sort_order, status]
    )

    if (permission_ids.length) {
      const values = permission_ids.map(pid => [r.insertId, pid])
      await conn.query('INSERT INTO role_permissions (role_id, permission_id) VALUES ?', [values])
    }

    await conn.commit()
    clearAllPermissionCache()
    res.json({ code: 200, data: { id: r.insertId }, message: '创建成功' })
  } catch (e) {
    await conn.rollback()
    res.json({ code: 500, message: '服务器错误' })
  } finally {
    conn.release()
  }
})

// 更新角色
router.put('/roles/:id', auth, requirePermission('role:edit'), async (req, res) => {
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()
    const { name, code, description, sort_order, status, permission_ids } = req.body

    await conn.query(
      `UPDATE roles SET name=?, code=?, description=?, sort_order=?, status=? WHERE id=?`,
      [name, code, description || '', sort_order, status, req.params.id]
    )

    if (Array.isArray(permission_ids)) {
      await conn.query('DELETE FROM role_permissions WHERE role_id=?', [req.params.id])
      if (permission_ids.length) {
        const values = permission_ids.map(pid => [req.params.id, pid])
        await conn.query('INSERT INTO role_permissions (role_id, permission_id) VALUES ?', [values])
      }
    }

    await conn.commit()
    clearAllPermissionCache()
    res.json({ code: 200, message: '更新成功' })
  } catch (e) {
    await conn.rollback()
    res.json({ code: 500, message: '服务器错误' })
  } finally {
    conn.release()
  }
})

// 删除角色
router.delete('/roles/:id', auth, requirePermission('role:delete'), async (req, res) => {
  try {
    const [role] = await db.query('SELECT code FROM roles WHERE id=?', [req.params.id])
    if (!role.length) return res.json({ code: 404, message: '角色不存在' })
    if (role[0].code === 'super_admin') return res.json({ code: 400, message: '超级管理员不可删除' })

    await db.query('DELETE FROM role_permissions WHERE role_id=?', [req.params.id])
    await db.query('DELETE FROM user_roles WHERE role_id=?', [req.params.id])
    await db.query('DELETE FROM roles WHERE id=?', [req.params.id])
    clearAllPermissionCache()
    res.json({ code: 200, message: '删除成功' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// ================================================
// 权限列表（管理端）
// ================================================
router.get('/permissions', auth, requirePermission('role:view'), async (req, res) => {
  try {
    const { module, type } = req.query
    let where = 'WHERE 1=1', params = []
    if (module) { where += ' AND module=?'; params.push(module) }
    if (type) { where += ' AND type=?'; params.push(type) }

    const [list] = await db.query(
      `SELECT * FROM permissions ${where} ORDER BY module, type, sort_order`,
      params
    )

    // 按模块分组返回
    const groups = {}
    for (const p of list) {
      if (!groups[p.module]) groups[p.module] = { module: p.module, items: [] }
      groups[p.module].items.push(p)
    }

    res.json({ code: 200, data: { list, groups } })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 新增权限
router.post('/permissions', auth, requirePermission('role:create'), async (req, res) => {
  try {
    const { code, name, module, type = 'api', parent_id = 0, sort_order = 0, icon = '', route_path = '', status = 1 } = req.body
    if (!code || !name || !module) return res.json({ code: 400, message: '编码、名称、模块必填' })

    const [exists] = await db.query('SELECT id FROM permissions WHERE code=?', [code])
    if (exists.length) return res.json({ code: 400, message: '权限编码已存在' })

    const [r] = await db.query(
      `INSERT INTO permissions (code, name, module, type, parent_id, sort_order, icon, route_path, status)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [code, name, module, type, parent_id, sort_order, icon, route_path, status]
    )
    clearAllPermissionCache()
    res.json({ code: 200, data: { id: r.insertId }, message: '创建成功' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 更新权限
router.put('/permissions/:id', auth, requirePermission('role:edit'), async (req, res) => {
  try {
    const { name, module, type, sort_order, icon, route_path, status } = req.body
    await db.query(
      `UPDATE permissions SET name=?, module=?, type=?, sort_order=?, icon=?, route_path=?, status=? WHERE id=?`,
      [name, module, type, sort_order, icon || '', route_path || '', status, req.params.id]
    )
    clearAllPermissionCache()
    res.json({ code: 200, message: '更新成功' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 删除权限
router.delete('/permissions/:id', auth, requirePermission('role:delete'), async (req, res) => {
  try {
    await db.query('DELETE FROM role_permissions WHERE permission_id=?', [req.params.id])
    await db.query('DELETE FROM permissions WHERE id=?', [req.params.id])
    clearAllPermissionCache()
    res.json({ code: 200, message: '删除成功' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// ================================================
// 用户-角色绑定
// ================================================
router.put('/users/:id/roles', auth, requirePermission('user:role'), async (req, res) => {
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()
    const { role_ids = [] } = req.body
    if (+req.params.id === req.user.id) {
      return res.json({ code: 400, message: '不能修改自己的角色' })
    }

    await conn.query('DELETE FROM user_roles WHERE user_id=?', [req.params.id])
    if (role_ids.length) {
      const values = role_ids.map(rid => [req.params.id, rid])
      await conn.query('INSERT INTO user_roles (user_id, role_id) VALUES ?', [values])
    }

    // 同步旧字段（兼容）
    if (role_ids.length) {
      const [role] = await conn.query('SELECT code FROM roles WHERE id=?', [role_ids[0]])
      if (role.length) {
        await conn.query('UPDATE users SET role=? WHERE id=?', [role[0].code === 'super_admin' || role[0].code === 'admin' ? 'admin' : 'user', req.params.id])
      }
    }

    await conn.commit()
    clearAllPermissionCache()
    res.json({ code: 200, message: '更新成功' })
  } catch (e) {
    await conn.rollback()
    res.json({ code: 500, message: '服务器错误' })
  } finally {
    conn.release()
  }
})

// 获取用户角色
router.get('/users/:id/roles', auth, async (req, res) => {
  try {
    const roles = await getUserRoles(req.params.id)
    res.json({ code: 200, data: roles })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// ================================================
// 操作日志
// ================================================
router.get('/logs', auth, requirePermission('role:view'), async (req, res) => {
  try {
    const { module, action, status, keyword, page = 1, pageSize = 20 } = req.query
    let where = 'WHERE 1=1', countWhere = 'WHERE 1=1'
    let params = [], countParams = []

    if (module) { where += ' AND module=?'; countWhere += ' AND module=?'; params.push(module); countParams.push(module) }
    if (action) { where += ' AND action=?'; countWhere += ' AND action=?'; params.push(action); countParams.push(action) }
    if (status !== undefined && status !== '') { where += ' AND status=?'; countWhere += ' AND status=?'; params.push(+status); countParams.push(+status) }
    if (keyword) {
      const like = `%${keyword}%`
      where += ' AND (username LIKE ? OR target_type LIKE ? OR target_id LIKE ?)'
      countWhere += ' AND (username LIKE ? OR target_type LIKE ? OR target_id LIKE ?)'
      params.push(like, like, like); countParams.push(like, like, like)
    }

    const offset = (Math.max(1, +page) - 1) * +pageSize
    params.push(+pageSize, offset)

    const [list] = await db.query(
      `SELECT * FROM operation_logs ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      params
    )
    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) as total FROM operation_logs ${countWhere}`, countParams
    )

    res.json({ code: 200, data: { list, total, page: +page, pageSize: +pageSize } })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

module.exports = router
