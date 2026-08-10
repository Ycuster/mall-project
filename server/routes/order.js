const router = require('express').Router()
const db = require('../config/db')
const { auth, requirePermission } = require('../middleware/auth')

function genOrderNo() {
  const d = new Date()
  const ts = [d.getFullYear(), d.getMonth()+1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]
    .map(n => String(n).padStart(2, '0')).join('')
  return ts + String(Math.floor(Math.random() * 100000)).padStart(5, '0')
}

router.post('/', auth, async (req, res) => {
  const conn = await db.getConnection()
  try {
    await conn.beginTransaction()
    const { items, receiver_name, receiver_phone, receiver_address, remark } = req.body

    if (!items?.length) return res.json({ code: 400, message: '商品不能为空' })
    if (!receiver_name || !receiver_phone || !receiver_address) {
      return res.json({ code: 400, message: '请填写完整收货信息' })
    }

    let total = 0
    const orderItems = []

    for (const it of items) {
      const [prods] = await conn.query('SELECT * FROM products WHERE id=? AND status=1 FOR UPDATE',
        [it.product_id])
      if (!prods.length) {
        await conn.rollback()
        return res.json({ code: 400, message: `商品ID ${it.product_id} 不存在或已下架` })
      }
      const p = prods[0]
      if (it.quantity > p.stock) {
        await conn.rollback()
        return res.json({ code: 400, message: `「${p.name}」库存不足，剩余 ${p.stock}` })
      }

      total += p.price * it.quantity
      orderItems.push({
        product_id: p.id,
        product_name: p.name,
        product_cover: p.cover || '',
        quantity: it.quantity,
        price: p.price
      })

      await conn.query(
        'UPDATE products SET stock = stock - ?, sales = sales + ? WHERE id = ?',
        [it.quantity, it.quantity, p.id]
      )
    }

    const orderNo = genOrderNo()
    const [r] = await conn.query(
      `INSERT INTO orders (order_no, user_id, total_amount, receiver_name, receiver_phone, receiver_address, remark)
       VALUES (?,?,?,?,?,?,?)`,
      [orderNo, req.user.id, total, receiver_name, receiver_phone, receiver_address, remark || '']
    )

    for (const it of orderItems) {
      await conn.query(
        'INSERT INTO order_items (order_id, product_id, product_name, product_cover, quantity, price) VALUES (?,?,?,?,?,?)',
        [r.insertId, it.product_id, it.product_name, it.product_cover, it.quantity, it.price]
      )
    }

    await conn.query(
      'DELETE FROM cart_items WHERE user_id=? AND product_id IN (?)',
      [req.user.id, items.map(i => i.product_id)]
    )

    await conn.commit()
    res.json({ code: 200, data: { order_no: orderNo, id: r.insertId }, message: '下单成功' })
  } catch (e) {
    await conn.rollback()
    console.error('[ORDER CREATE]', e)
    res.json({ code: 500, message: '服务器错误' })
  } finally {
    conn.release()
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, pageSize = 10, user_id } = req.query
    const isAdmin = req.user.role === 'admin' || (req.user.role_id && req.user.role_id > 0)

    let where = 'WHERE 1=1', countWhere = 'WHERE 1=1'
    let params = [], countParams = []

    if (!isAdmin) {
      where += ' AND o.user_id=?'; countWhere += ' AND user_id=?'
      params.push(req.user.id); countParams.push(req.user.id)
    } else if (user_id) {
      where += ' AND o.user_id=?'; countWhere += ' AND user_id=?'
      params.push(+user_id); countParams.push(+user_id)
    }

    if (status) {
      where += ' AND o.status=?'; countWhere += ' AND status=?'
      params.push(status); countParams.push(status)
    }

    const offset = (Math.max(1, +page) - 1) * +pageSize
    params.push(+pageSize, offset)

    const [list] = await db.query(
      `SELECT o.*, u.username, u.nickname
       FROM orders o
       JOIN users u ON o.user_id = u.id
       ${where}
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      params
    )

    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) as total FROM orders o ${countWhere}`, countParams
    )

    res.json({ code: 200, data: { list, total, page: +page, pageSize: +pageSize } })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT o.*, u.username, u.nickname
       FROM orders o JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [req.params.id]
    )
    if (!orders.length) return res.json({ code: 404, message: '订单不存在' })

    const order = orders[0]
    const isAdmin = req.user.role === 'admin' || (req.user.role_id && req.user.role_id > 0)
    if (!isAdmin && order.user_id !== req.user.id) {
      return res.json({ code: 403, message: '无权查看' })
    }

    const [items] = await db.query('SELECT * FROM order_items WHERE order_id=?', [order.id])
    order.items = items
    res.json({ code: 200, data: order })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.put('/:id/ship', auth, async (req, res, next) => {
  const rp = await requirePermission('order', 'ship')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE id=?', [req.params.id])
    if (!orders.length) return res.json({ code: 404, message: '订单不存在' })
    if (orders[0].status !== 'paid') return res.json({ code: 400, message: '只能发货已付款订单' })

    await db.query('UPDATE orders SET status=?, ship_time=NOW() WHERE id=?', ['shipped', req.params.id])
    res.json({ code: 200, message: '发货成功' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.put('/:id/cancel', auth, async (req, res, next) => {
  const rp = await requirePermission('order', 'cancel')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE id=?', [req.params.id])
    if (!orders.length) return res.json({ code: 404, message: '订单不存在' })
    const order = orders[0]
    if (!['pending', 'paid'].includes(order.status)) {
      return res.json({ code: 400, message: '当前状态不可取消' })
    }

    await db.query('UPDATE orders SET status=? WHERE id=?', ['cancelled', req.params.id])

    const [items] = await db.query('SELECT * FROM order_items WHERE order_id=?', [order.id])
    for (const it of items) {
      await db.query('UPDATE products SET stock=stock+?, sales=sales-? WHERE id=?',
        [it.quantity, it.quantity, it.product_id])
    }

    res.json({ code: 200, message: '订单已取消' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.put('/:id/status', auth, async (req, res, next) => {
  const rp = await requirePermission('order', 'write')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const { status } = req.body
    const validTransitions = {
      pending: ['paid', 'cancelled'],
      paid: ['shipped', 'cancelled'],
      shipped: ['completed'],
      completed: [],
      cancelled: []
    }

    const [orders] = await db.query('SELECT * FROM orders WHERE id=?', [req.params.id])
    if (!orders.length) return res.json({ code: 404, message: '订单不存在' })

    const order = orders[0]

    if (req.user.role !== 'admin' && !req.user.role_id) {
      if (status !== 'cancelled' || order.user_id !== req.user.id || order.status !== 'pending') {
        return res.json({ code: 403, message: '无权操作' })
      }
    }

    if (!validTransitions[order.status]?.includes(status)) {
      return res.json({ code: 400, message: `不能从 ${order.status} 变更为 ${status}` })
    }

    const timeField = { paid: 'pay_time', shipped: 'ship_time', completed: 'complete_time' }
    let extra = ''
    if (timeField[status]) extra = `, ${timeField[status]} = NOW()`

    await db.query(`UPDATE orders SET status=? ${extra} WHERE id=?`, [status, req.params.id])

    if (status === 'cancelled') {
      const [items] = await db.query('SELECT * FROM order_items WHERE order_id=?', [order.id])
      for (const it of items) {
        await db.query('UPDATE products SET stock=stock+?, sales=sales-? WHERE id=?',
          [it.quantity, it.quantity, it.product_id])
      }
    }

    res.json({ code: 200, message: '状态已更新' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

module.exports = router