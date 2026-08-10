const jwt = require('jsonwebtoken')
const db = require('../config/db')
const SECRET = process.env.JWT_SECRET || 'mall-jwt-secret-2024-xK9m2p'

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

function adminAuth(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ code: 403, message: '权限不足，需要管理员权限' })
  }
  next()
}

async function requirePermission(resource, action) {
  return async (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ code: 401, message: '请先登录' })

      if (req.user.role === 'admin' && !req.user.role_id) {
        return next()
      }

      const roleId = req.user.role_id
      if (!roleId) {
        return res.status(403).json({ code: 403, message: '权限不足' })
      }

      const [rows] = await db.query(`
        SELECT COUNT(*) as c FROM permissions p
        JOIN role_permissions rp ON p.id = rp.permission_id
        WHERE rp.role_id = ? AND p.resource = ? AND p.action = ?
      `, [roleId, resource, action])

      if (!rows.length || rows[0].c === 0) {
        return res.status(403).json({ code: 403, message: '权限不足' })
      }
      next()
    } catch (e) {
      console.error('[PERMISSION CHECK ERROR]', e)
      res.status(500).json({ code: 500, message: '服务器错误' })
    }
  }
}

async function getUserPermissions(roleId) {
  if (!roleId) return []
  const [rows] = await db.query(`
    SELECT p.id, p.name, p.resource, p.action
    FROM permissions p
    JOIN role_permissions rp ON p.id = rp.permission_id
    WHERE rp.role_id = ?
    ORDER BY p.resource, p.action
  `, [roleId])
  return rows
}

module.exports = { auth, adminAuth, requirePermission, getUserPermissions, SECRET }