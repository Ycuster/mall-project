const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const { auth, getUserPermissions, SECRET } = require('../middleware/auth')

router.post('/register', async (req, res) => {
  try {
    const { username, password, nickname, email, phone } = req.body
    if (!username || !password) {
      return res.json({ code: 400, message: '用户名和密码不能为空' })
    }
    if (username.length < 3 || username.length > 20) {
      return res.json({ code: 400, message: '用户名长度3-20个字符' })
    }
    if (password.length < 6) {
      return res.json({ code: 400, message: '密码长度不少于6位' })
    }

    const [exists] = await db.query('SELECT id FROM users WHERE username = ?', [username])
    if (exists.length) return res.json({ code: 400, message: '用户名已存在' })

    const hash = await bcrypt.hash(password, 10)
    let roleId = null
    try {
      const [roleRows] = await db.query("SELECT id FROM roles WHERE name = 'user' LIMIT 1")
      roleId = roleRows.length ? roleRows[0].id : null
    } catch (e) {
      console.warn('[REGISTER] 查询角色失败，使用默认值:', e.message)
    }

    const [cols] = await db.query('SHOW COLUMNS FROM users')
    const colNames = cols.map(c => c.Field)
    const fields = ['username', 'password', 'nickname']
    const values = [username, hash, nickname || username]

    if (colNames.includes('email')) { fields.push('email'); values.push(email || '') }
    if (colNames.includes('phone')) { fields.push('phone'); values.push(phone || '') }
    if (colNames.includes('role')) { fields.push('role'); values.push('user') }
    if (colNames.includes('role_id')) { fields.push('role_id'); values.push(roleId) }
    if (colNames.includes('status')) { fields.push('status'); values.push(1) }

    const placeholders = fields.map(() => '?').join(',')
    await db.query(
      `INSERT INTO users (${fields.join(',')}) VALUES (${placeholders})`,
      values
    )
    res.json({ code: 200, message: '注册成功' })
  } catch (e) {
    console.error('[REGISTER]', e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.json({ code: 400, message: '请输入用户名和密码' })
    }

    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username])
    if (!users.length) return res.json({ code: 400, message: '用户名或密码错误' })

    const user = users[0]
    if (!user.status) return res.json({ code: 403, message: '账号已被禁用，请联系管理员' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.json({ code: 400, message: '用户名或密码错误' })

    const permissions = await getUserPermissions(user.role_id)

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, role_id: user.role_id || 0 },
      SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      code: 200,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role,
          role_id: user.role_id || 0,
          permissions
        }
      }
    })
  } catch (e) {
    console.error('[LOGIN]', e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.get('/profile', auth, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id,username,nickname,email,phone,avatar,role,role_id,created_at FROM users WHERE id=?',
      [req.user.id]
    )
    if (!users.length) return res.json({ code: 200, data: null })
    const user = users[0]
    const permissions = await getUserPermissions(user.role_id)
    user.permissions = permissions
    res.json({ code: 200, data: user })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.put('/profile', auth, async (req, res) => {
  try {
    const { nickname, email, phone, avatar } = req.body
    await db.query(
      'UPDATE users SET nickname=?, email=?, phone=?, avatar=? WHERE id=?',
      [nickname || '', email || '', phone || '', avatar || '', req.user.id]
    )
    res.json({ code: 200, message: '更新成功' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

module.exports = router