const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '@Yangaohui159753',
  database: process.env.DB_NAME || 'mall_db',
  port:3306,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4'
})

// 测试连接
pool.getConnection().then(conn => {
  console.log('✅ MySQL 连接成功')
  conn.release()
}).catch(err => {
  console.error('❌ MySQL 连接失败:', err.message)
})

module.exports = pool