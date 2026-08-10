const db = require('../config/db')

// 操作日志记录中间件工厂
function logOperation(module, actionGetter) {
  return async (req, res, next) => {
    const originalJson = res.json.bind(res)
    const start = Date.now()

    res.json = function (data) {
      const duration = Date.now() - start

      const logData = {
        user_id: req.user?.id || null,
        username: req.user?.username || null,
        module,
        action: typeof actionGetter === 'function' ? actionGetter(req, data) : actionGetter,
        target_type: req.originalUrl?.split('/')[3] || '',
        target_id: req.params?.id || req.body?.id || '',
        detail: JSON.stringify({
          method: req.method,
          path: req.path,
          body: sanitizeBody(req.body),
          query: req.query
        }),
        ip: req.ip || req.connection?.remoteAddress || '',
        user_agent: req.headers['user-agent']?.substring(0, 500) || '',
        status: data?.code === 200 ? 1 : 0
      }

      db.query('INSERT INTO operation_logs SET ?', logData).catch(e => {
        console.error('[LOG] Failed to write operation log:', e.message)
      })

      return originalJson(data)
    }

    next()
  }
}

function sanitizeBody(body) {
  if (!body) return {}
  const sanitized = { ...body }
  // 移除敏感字段
  delete sanitized.password
  delete sanitized.token
  delete sanitized.old_password
  delete sanitized.new_password
  return sanitized
}

module.exports = { logOperation }
