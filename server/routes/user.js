const router = require('express').Router()
const db = require('../config/db')
const { auth, adminAuth } = require('../middleware/auth')

// 用户列表（管理员）
router.get('/', auth, adminAuth, async (req, res) => {
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
      `SELECT id, username, nickname, email, phone, avatar, role, status, created_at
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

// 修改用户状态（管理员）
router.put('/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body
    if (+req.params.id === req.user.id) {
      return res.json({ code: 400, message: '不能修改自己的状态' })
    }
    await db.query('UPDATE users SET status=? WHERE id=?', [+status, req.params.id])
    res.json({ code: 200, message: '更新成功' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 修改用户角色（管理员）
router.put('/:id/role', auth, adminAuth, async (req, res) => {
  try {
    const { role } = req.body
    if (+req.params.id === req.user.id) {
      return res.json({ code: 400, message: '不能修改自己的角色' })
    }
    await db.query('UPDATE users SET role=? WHERE id=?', [role, req.params.id])
    res.json({ code: 200, message: '更新成功' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

module.exports = router