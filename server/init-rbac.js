const fs = require('fs')
const path = require('path')
const db = require('./config/db')

async function initRbac() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'rbac/schema.sql'), 'utf-8')
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'))

    for (const stmt of statements) {
      if (!stmt) continue
      try {
        await db.query(stmt)
      } catch (e) {
        if (!stmt.startsWith('CREATE TABLE') && !stmt.startsWith('CREATE INDEX')) {
          // Ignore seed data errors (duplicates, etc.)
        } else {
          console.error('❌ SQL Error:', e.message, '\nStatement:', stmt.slice(0, 100))
          throw e
        }
      }
    }
    console.log('✅ RBAC 权限系统初始化完成')
  } catch (e) {
    console.error('❌ RBAC 初始化失败:', e.message)
  }
}

if (require.main === module) {
  initRbac()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

module.exports = { initRbac }
