const router = require('express').Router()
const db = require('../config/db')
const { auth } = require('../middleware/auth')

// 获取购物车
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT ci.id, ci.quantity, ci.product_id,
              p.name, p.price, p.original_price, p.cover, p.stock, p.status as product_status
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = ?
       ORDER BY ci.created_at DESC`,
      [req.user.id]
    )
    res.json({ code: 200, data: rows })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 添加到购物车
router.post('/', auth, async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body
    if (!product_id) return res.json({ code: 400, message: '商品ID必填' })

    const [prods] = await db.query('SELECT * FROM products WHERE id=? AND status=1', [product_id])
    if (!prods.length) return res.json({ code: 400, message: '商品不存在或已下架' })

    const [exist] = await db.query(
      'SELECT * FROM cart_items WHERE user_id=? AND product_id=?',
      [req.user.id, product_id]
    )

    if (exist.length) {
      const newQty = exist[0].quantity + quantity
      if (newQty > prods[0].stock) return res.json({ code: 400, message: '库存不足' })
      await db.query('UPDATE cart_items SET quantity=? WHERE id=?', [newQty, exist[0].id])
    } else {
      if (quantity > prods[0].stock) return res.json({ code: 400, message: '库存不足' })
      await db.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?,?,?)',
        [req.user.id, product_id, quantity]
      )
    }

    // 返回最新数量
    const [[{ total }]] = await db.query(
      'SELECT SUM(quantity) as total FROM cart_items WHERE user_id=?', [req.user.id]
    )
    res.json({ code: 200, message: '已加入购物车', data: { count: total || 0 } })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 更新数量
router.put('/:id', auth, async (req, res) => {
  try {
    const { quantity } = req.body
    if (!quantity || quantity < 1) return res.json({ code: 400, message: '数量无效' })

    const [item] = await db.query(
      `SELECT ci.*, p.stock FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.id=? AND ci.user_id=?`,
      [req.params.id, req.user.id]
    )
    if (!item.length) return res.json({ code: 404, message: '购物车项不存在' })
    if (quantity > item[0].stock) return res.json({ code: 400, message: '超出库存' })

    await db.query('UPDATE cart_items SET quantity=? WHERE id=? AND user_id=?',
      [quantity, req.params.id, req.user.id])
    res.json({ code: 200 })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 删除单个
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM cart_items WHERE id=? AND user_id=?',
      [req.params.id, req.user.id])
    res.json({ code: 200, message: '已移除' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 清空购物车
router.delete('/', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM cart_items WHERE user_id=?', [req.user.id])
    res.json({ code: 200, message: '已清空' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

module.exports = router