const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET || 'mall-jwt-secret-2024-xK9m2p'

// 验证 Token
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ code: 401, message: '请先登录' })
  try {
    req.user = jwt.verify(token, SECRET)
    next()
  } catch {
    res.status(401).json({ code: 401, message: '登录已过期，请重新登录' })
  }
}

// 验证管理员权限
function adminAuth(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ code: 403, message: '权限不足，需要管理员权限' })
  }
  next()
}

module.exports = { auth, adminAuth, SECRET }