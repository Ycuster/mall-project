const router = require('express').Router()
const db = require('../config/db')
const { auth, adminAuth } = require('../middleware/auth')

// 统计概览
router.get('/stats', auth, adminAuth, async (req, res) => {
  try {
    const [[users]] = await db.query('SELECT COUNT(*) as c FROM users WHERE role="user"')
    const [[products]] = await db.query('SELECT COUNT(*) as c FROM products')
    const [[orders]] = await db.query('SELECT COUNT(*) as c FROM orders')
    const [[revenue]] = await db.query(
      'SELECT COALESCE(SUM(total_amount),0) as c FROM orders WHERE status IN ("paid","shipped","completed")'
    )
    const [[todayOrders]] = await db.query(
      'SELECT COUNT(*) as c FROM orders WHERE DATE(created_at)=CURDATE()'
    )
    const [[todayRevenue]] = await db.query(
      'SELECT COALESCE(SUM(total_amount),0) as c FROM orders WHERE DATE(created_at)=CURDATE() AND status!="cancelled"'
    )
    const [[pendingOrders]] = await db.query('SELECT COUNT(*) as c FROM orders WHERE status="pending"')
    const [[totalStock]] = await db.query('SELECT COALESCE(SUM(stock),0) as c FROM products')

    res.json({
      code: 200,
      data: {
        totalUsers: users.c,
        totalProducts: products.c,
        totalOrders: orders.c,
        totalRevenue: revenue.c,
        todayOrders: todayOrders.c,
        todayRevenue: todayRevenue.c,
        pendingOrders: pendingOrders.c,
        totalStock: totalStock.c
      }
    })
  } catch (e) {
    console.error(e)
    res.json({ code: 500 })
  }
})

// 近7天营收趋势
router.get('/chart/revenue', auth, adminAuth, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE(created_at) as date,
             COALESCE(SUM(total_amount),0) as revenue,
             COUNT(*) as orders
      FROM orders
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        AND status != 'cancelled'
      GROUP BY DATE(created_at)
      ORDER BY date
    `)
    res.json({ code: 200, data: rows })
  } catch (e) {
    res.json({ code: 500 })
  }
})

// 订单状态分布
router.get('/chart/status', auth, adminAuth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT status, COUNT(*) as count FROM orders GROUP BY status')
    res.json({ code: 200, data: rows })
  } catch (e) {
    res.json({ code: 500 })
  }
})

// 分类销售占比
router.get('/chart/category', auth, adminAuth, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.name, COALESCE(SUM(oi.quantity * oi.price),0) as revenue
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id AND o.status != 'cancelled'
      GROUP BY c.id, c.name
      ORDER BY revenue DESC
    `)
    res.json({ code: 200, data: rows })
  } catch (e) {
    res.json({ code: 500 })
  }
})

// 热销排行
router.get('/top-products', auth, adminAuth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, price, sales, cover FROM products ORDER BY sales DESC LIMIT 10'
    )
    res.json({ code: 200, data: rows })
  } catch (e) {
    res.json({ code: 500 })
  }
})

// 最近订单
router.get('/recent-orders', auth, adminAuth, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.id, o.order_no, o.total_amount, o.status, o.created_at, u.username, u.nickname
      FROM orders o JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC LIMIT 5
    `)
    res.json({ code: 200, data: rows })
  } catch (e) {
    res.json({ code: 500 })
  }
})

module.exports = router