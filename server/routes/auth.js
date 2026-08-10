const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const { auth, SECRET } = require('../middleware/auth')
const { getUserPermissions, getUserRoles } = require('../middleware/rbac')

// 注册
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
    await db.query(
      'INSERT INTO users (username, password, nickname, email, phone) VALUES (?,?,?,?,?)',
      [username, hash, nickname || username, email || '', phone || '']
    )
    res.json({ code: 200, message: '注册成功' })
  } catch (e) {
    console.error('[REGISTER]', e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 登录
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

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: '7d' }
    )

    // 获取 RBAC 权限
    const permissions = await getUserPermissions(user.id)
    const roles = await getUserRoles(user.id)

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
          roles: roles.map(r => ({ id: r.id, code: r.code, name: r.name }))
        },
        permissions: {
          codes: permissions.codes,
          modules: permissions.modules,
          types: permissions.types
        }
      }
    })
  } catch (e) {
    console.error('[LOGIN]', e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 获取个人信息（含权限）
router.get('/profile', auth, async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id,username,nickname,email,phone,avatar,role,created_at FROM users WHERE id=?',
      [req.user.id]
    )
    const user = users[0] || null
    if (!user) return res.json({ code: 200, data: null })

    const permissions = await getUserPermissions(req.user.id)
    const roles = await getUserRoles(req.user.id)

    res.json({
      code: 200,
      data: {
        ...user,
        roles: roles.map(r => ({ id: r.id, code: r.code, name: r.name })),
        permissions: {
          codes: permissions.codes,
          modules: permissions.modules,
          types: permissions.types
        }
      }
    })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 更新个人信息
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