const router = require('express').Router()
const db = require('../config/db')
const { auth, adminAuth } = require('../middleware/auth')

// 商品列表（公开 - 前台）
router.get('/', async (req, res) => {
  try {
    let {
      keyword, category_id, status = 1,
      is_hot, is_new, page = 1, pageSize = 12,
      sort = 'newest', minPrice, maxPrice
    } = req.query

    page = Math.max(1, +page)
    pageSize = Math.min(50, Math.max(1, +pageSize))

    let where = 'WHERE p.status = ?', params = []
    let countWhere = 'WHERE p.status = ?', countParams = []

    // 前台只显示上架的
    if (req.query._admin) {
      where = 'WHERE 1=1'; countWhere = 'WHERE 1=1'
      params = []; countParams = []
      if (status !== '' && status !== undefined) {
        where += ' AND p.status=?'; countWhere += ' AND p.status=?'
        params.push(+status); countParams.push(+status)
      }
    } else {
      params.push(+status); countParams.push(+status)
    }

    if (keyword) {
      where += ' AND p.name LIKE ?'; countWhere += ' AND p.name LIKE ?'
      params.push(`%${keyword}%`); countParams.push(`%${keyword}%`)
    }
    if (category_id) {
      where += ' AND p.category_id=?'; countWhere += ' AND p.category_id=?'
      params.push(+category_id); countParams.push(+category_id)
    }
    if (is_hot !== undefined && is_hot !== '') {
      where += ' AND p.is_hot=?'; countWhere += ' AND p.is_hot=?'
      params.push(+is_hot); countParams.push(+is_hot)
    }
    if (is_new !== undefined && is_new !== '') {
      where += ' AND p.is_new=?'; countWhere += ' AND p.is_new=?'
      params.push(+is_new); countParams.push(+is_new)
    }
    if (minPrice) {
      where += ' AND p.price>=?'; countWhere += ' AND p.price>=?'
      params.push(+minPrice); countParams.push(+minPrice)
    }
    if (maxPrice) {
      where += ' AND p.price<=?'; countWhere += ' AND p.price<=?'
      params.push(+maxPrice); countParams.push(+maxPrice)
    }

    const sortMap = {
      newest: 'p.created_at DESC',
      price_asc: 'p.price ASC',
      price_desc: 'p.price DESC',
      sales: 'p.sales DESC'
    }

    params.push(pageSize, (page - 1) * pageSize)

    const [list] = await db.query(
      `SELECT p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       ${where}
       ORDER BY ${sortMap[sort] || sortMap.newest}
       LIMIT ? OFFSET ?`,
      params
    )

    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) as total FROM products p ${countWhere}`,
      countParams
    )

    res.json({
      code: 200,
      data: { list, total, page, pageSize, pages: Math.ceil(total / pageSize) }
    })
  } catch (e) {
    console.error('[PRODUCTS]', e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 商品详情
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [req.params.id]
    )
    if (!rows.length) return res.json({ code: 404, message: '商品不存在' })
    res.json({ code: 200, data: rows[0] })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 新增商品（管理员）
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const {
      name, description, detail, price, original_price,
      stock, category_id, cover, images, status, is_hot, is_new
    } = req.body

    if (!name || price === undefined) {
      return res.json({ code: 400, message: '商品名称和价格必填' })
    }

    const [r] = await db.query(
      `INSERT INTO products
       (name, description, detail, price, original_price, stock, category_id, cover, images, status, is_hot, is_new)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        name, description || '', detail || '', price, original_price || 0,
        stock || 0, category_id || null, cover || '',
        JSON.stringify(images || []), status ?? 1, is_hot ? 1 : 0, is_new ? 1 : 0
      ]
    )
    res.json({ code: 200, data: { id: r.insertId }, message: '添加成功' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 更新商品（管理员）
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const {
      name, description, detail, price, original_price,
      stock, category_id, cover, images, status, is_hot, is_new
    } = req.body

    await db.query(
      `UPDATE products SET
       name=?, description=?, detail=?, price=?, original_price=?,
       stock=?, category_id=?, cover=?, images=?, status=?, is_hot=?, is_new=?
       WHERE id=?`,
      [
        name, description || '', detail || '', price, original_price || 0,
        stock || 0, category_id || null, cover || '',
        JSON.stringify(images || []), status, is_hot ? 1 : 0, is_new ? 1 : 0,
        req.params.id
      ]
    )
    res.json({ code: 200, message: '更新成功' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

// 删除商品（管理员）
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    // 检查是否有未完成订单
    const [[{ count }]] = await db.query(
      `SELECT COUNT(*) as count FROM order_items oi
       JOIN orders o ON oi.order_id = o.id
       WHERE oi.product_id=? AND o.status NOT IN ('completed','cancelled')`,
      [req.params.id]
    )
    if (count > 0) return res.json({ code: 400, message: '该商品存在未完成的订单，无法删除' })

    await db.query('DELETE FROM products WHERE id=?', [req.params.id])
    res.json({ code: 200, message: '删除成功' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

module.exports = router