const router = require('express').Router()
const db = require('../config/db')
const { auth, requirePermission } = require('../middleware/auth')

router.get('/simple', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, display_name FROM roles ORDER BY id')
    res.json({ code: 200, data: rows })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.get('/permissions', auth, async (req, res, next) => {
  const rp = await requirePermission('role', 'manage')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM permissions ORDER BY resource, action')
    res.json({ code: 200, data: rows })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.get('/', auth, async (req, res, next) => {
  const rp = await requirePermission('role', 'manage')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const [roles] = await db.query('SELECT * FROM roles ORDER BY id')
    for (const role of roles) {
      const [perms] = await db.query(`
        SELECT p.* FROM permissions p
        JOIN role_permissions rp ON p.id = rp.permission_id
        WHERE rp.role_id = ?
        ORDER BY p.resource, p.action
      `, [role.id])
      role.permissions = perms
    }
    res.json({ code: 200, data: roles })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.post('/', auth, async (req, res, next) => {
  const rp = await requirePermission('role', 'manage')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const { name, display_name, description, permission_ids } = req.body
    if (!name || !display_name) {
      return res.json({ code: 400, message: '角色名称和显示名称不能为空' })
    }

    const [exists] = await db.query('SELECT id FROM roles WHERE name = ?', [name])
    if (exists.length) return res.json({ code: 400, message: '角色名称已存在' })

    const [r] = await db.query(
      'INSERT INTO roles (name, display_name, description) VALUES (?,?,?)',
      [name, display_name, description || '']
    )

    if (permission_ids?.length) {
      const values = permission_ids.map(pid => [r.insertId, pid])
      await db.query('INSERT INTO role_permissions (role_id, permission_id) VALUES ?', [values])
    }

    res.json({ code: 200, data: { id: r.insertId }, message: '创建成功' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.put('/:id', auth, async (req, res, next) => {
  const rp = await requirePermission('role', 'manage')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const { display_name, description, permission_ids } = req.body
    await db.query(
      'UPDATE roles SET display_name=?, description=? WHERE id=?',
      [display_name || '', description || '', req.params.id]
    )

    await db.query('DELETE FROM role_permissions WHERE role_id=?', [req.params.id])

    if (permission_ids?.length) {
      const values = permission_ids.map(pid => [req.params.id, pid])
      await db.query('INSERT INTO role_permissions (role_id, permission_id) VALUES ?', [values])
    }

    res.json({ code: 200, message: '更新成功' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.delete('/:id', auth, async (req, res, next) => {
  const rp = await requirePermission('role', 'manage')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const [users] = await db.query('SELECT COUNT(*) as c FROM users WHERE role_id=?', [req.params.id])
    if (users[0].c > 0) {
      return res.json({ code: 400, message: `该角色下有 ${users[0].c} 个用户，无法删除` })
    }

    await db.query('DELETE FROM role_permissions WHERE role_id=?', [req.params.id])
    await db.query('DELETE FROM roles WHERE id=?', [req.params.id])
    res.json({ code: 200, message: '删除成功' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

module.exports = router