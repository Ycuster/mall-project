const jwt = require('jsonwebtoken')
const db = require('../config/db')
const SECRET = process.env.JWT_SECRET || 'mall-jwt-secret-2024-xK9m2p'

// ================================================
// 1. 认证中间件（复用原有逻辑）
// ================================================
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

// ================================================
// 2. 管理员角色校验（兼容旧系统）
// ================================================
function adminAuth(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ code: 403, message: '权限不足' })
  }
  next()
}

// ================================================
// 3. 权限缓存（Redis 替代可扩展）
// ================================================
const permissionCache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 分钟缓存

async function getUserPermissions(userId) {
  const cacheKey = `perms:${userId}`
  const cached = permissionCache.get(cacheKey)
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return cached.data
  }

  const [rows] = await db.query(
    `SELECT DISTINCT p.*, r.code as role_code
     FROM permissions p
     JOIN role_permissions rp ON p.id = rp.permission_id
     JOIN roles r ON rp.role_id = r.id
     JOIN user_roles ur ON r.id = ur.role_id
     WHERE ur.user_id = ? AND p.status = 1 AND r.status = 1`,
    [userId]
  )

  const codes = rows.map(r => r.code)
  const modules = [...new Set(rows.map(r => r.module))]
  const types = rows.reduce((acc, r) => {
    if (!acc[r.type]) acc[r.type] = []
    acc[r.type].push(r.code)
    return acc
  }, {})

  const result = { codes, modules, types, raw: rows }
  permissionCache.set(cacheKey, { data: result, time: Date.now() })
  return result
}

async function getUserRoles(userId) {
  const [rows] = await db.query(
    `SELECT r.* FROM roles r
     JOIN user_roles ur ON r.id = ur.role_id
     WHERE ur.user_id = ? AND r.status = 1`,
    [userId]
  )
  return rows
}

function clearUserPermissionCache(userId) {
  permissionCache.delete(`perms:${userId}`)
}

function clearAllPermissionCache() {
  permissionCache.clear()
}

// ================================================
// 4. 动态权限校验中间件工厂
// ================================================
function requirePermission(code, options = {}) {
  const { mode = 'all' } = options

  return async (req, res, next) => {
    try {
      const user = req.user
      if (!user) {
        return res.status(401).json({ code: 401, message: '请先登录' })
      }

      // 超级管理员直接放行
      const roles = await getUserRoles(user.id)
      if (roles.some(r => r.code === 'super_admin')) {
        return next()
      }

      const { codes } = await getUserPermissions(user.id)

      if (mode === 'any') {
        // 满足任一权限即可
        if (Array.isArray(code)) {
          if (code.some(c => codes.includes(c))) return next()
        } else if (codes.includes(code)) {
          return next()
        }
      } else {
        // 需要所有权限
        if (Array.isArray(code)) {
          if (code.every(c => codes.includes(c))) return next()
        } else if (codes.includes(code)) {
          return next()
        }
      }

      res.status(403).json({
        code: 403,
        message: '权限不足，需要: ' + (Array.isArray(code) ? code.join(', ') : code)
      })
    } catch (e) {
      console.error('[RBAC] Permission check error:', e.message)
      res.status(500).json({ code: 500, message: '权限校验异常' })
    }
  }
}

// ================================================
// 5. 权限查询中间件（将权限信息附加到请求）
// ================================================
function attachPermissions(roles = []) {
  return async (req, res, next) => {
    try {
      if (req.user) {
        const { codes, modules } = await getUserPermissions(req.user.id)
        req.permissions = { codes, modules }
        req.userRoles = await getUserRoles(req.user.id)
      }
    } catch {}
    next()
  }
}

// ================================================
// 6. 接口级权限自动推断
// ================================================
function autoPermission() {
  return async (req, res, next) => {
    // 对于需要登录的接口，自动根据路由和方法推断所需权限
    const methodMap = {
      GET: 'view',
      POST: 'create',
      PUT: 'edit',
      DELETE: 'delete',
      PATCH: 'edit'
    }

    const pathSegments = req.path.split('/').filter(Boolean)
    const module = pathSegments[0] || ''
    const action = methodMap[req.method] || 'view'
    const requiredCode = `${module}:${action}`

    // 如果是公开接口（无 auth 中间件标记），跳过
    if (!req.user) return next()

    // 超级管理员放行
    const roles = await getUserRoles(req.user.id)
    if (roles.some(r => r.code === 'super_admin')) return next()

    const { codes } = await getUserPermissions(req.user.id)
    if (codes.includes(requiredCode)) {
      return next()
    }

    // 降级：使用旧 admin 角色判断
    if (req.user.role === 'admin' && ['admin', 'dashboard', 'product', 'category', 'order', 'user'].includes(module)) {
      return next()
    }

    next()
  }
}

module.exports = {
  auth,
  adminAuth,
  requirePermission,
  attachPermissions,
  autoPermission,
  getUserPermissions,
  getUserRoles,
  clearUserPermissionCache,
  clearAllPermissionCache,
  SECRET
}
