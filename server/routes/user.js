const router = require('express').Router()
const db = require('../config/db')
const { auth, requirePermission } = require('../middleware/auth')

router.get('/', auth, async (req, res, next) => {
  const rp = await requirePermission('user', 'read')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const { keyword, status, page = 1, pageSize = 10 } = req.query
    let where = 'WHERE 1=1', countWhere = 'WHERE 1=1'
    let params = [], countParams = []

    if (keyword) {
      const like = `%${keyword}%`
      where += ' AND (username LIKE ? OR nickname LIKE ? OR email LIKE ? OR phone LIKE ?)'
      countWhere += ' AND (username LIKE ? OR nickname LIKE ? OR email LIKE ? OR phone LIKE ?)'
      params.push(like, like, like, like)
      countParams.push(like, like, like, like)
    }
    if (status !== undefined && status !== '') {
      where += ' AND status=?'; countWhere += ' AND status=?'
      params.push(+status); countParams.push(+status)
    }

    const offset = (Math.max(1, +page) - 1) * +pageSize
    params.push(+pageSize, offset)

    const [list] = await db.query(
      `SELECT id, username, nickname, email, phone, avatar, role, role_id, status, created_at
       FROM users ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      params
    )
    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) as total FROM users ${countWhere}`, countParams
    )

    res.json({ code: 200, data: { list, total, page: +page, pageSize: +pageSize } })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.put('/:id', auth, async (req, res, next) => {
  const rp = await requirePermission('user', 'write')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const allowed = ['nickname', 'email', 'phone', 'avatar', 'role', 'role_id', 'status']
    const updates = {}
    for (const k of allowed) {
      if (req.body[k] !== undefined) updates[k] = req.body[k]
    }

    if (+req.params.id === req.user.id) {
      delete updates.role
      delete updates.role_id
      delete updates.status
    }

    if (!Object.keys(updates).length) {
      return res.json({ code: 200, message: '没有需要更新的字段' })
    }

    const sets = Object.keys(updates).map(k => `${k}=?`).join(',')
    const values = Object.values(updates)
    values.push(req.params.id)

    await db.query(`UPDATE users SET ${sets} WHERE id=?`, values)
    res.json({ code: 200, message: '更新成功' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.delete('/:id', auth, async (req, res, next) => {
  const rp = await requirePermission('user', 'delete')
  rp(req, res, next)
}, async (req, res) => {
  try {
    if (+req.params.id === req.user.id) {
      return res.json({ code: 400, message: '不能删除自己' })
    }
    await db.query('DELETE FROM users WHERE id=?', [req.params.id])
    res.json({ code: 200, message: '删除成功' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

module.exports = router