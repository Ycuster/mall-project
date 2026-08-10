const router = require('express').Router()
const db = require('../config/db')
const { auth, requirePermission } = require('../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM categories WHERE status=1 ORDER BY sort_order, id'
    )
    res.json({ code: 200, data: rows })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.get('/all', auth, async (req, res, next) => {
  const rp = await requirePermission('category', 'read')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY sort_order, id')
    res.json({ code: 200, data: rows })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.post('/', auth, async (req, res, next) => {
  const rp = await requirePermission('category', 'write')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const { name, icon, sort_order } = req.body
    if (!name) return res.json({ code: 400, message: '分类名称不能为空' })

    const [exists] = await db.query('SELECT id FROM categories WHERE name=?', [name])
    if (exists.length) return res.json({ code: 400, message: '分类名称已存在' })

    const [r] = await db.query(
      'INSERT INTO categories (name, icon, sort_order) VALUES (?,?,?)',
      [name, icon || '', sort_order || 0]
    )
    res.json({ code: 200, data: { id: r.insertId }, message: '添加成功' })
  } catch (e) {
    console.error(e)
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.put('/:id', auth, async (req, res, next) => {
  const rp = await requirePermission('category', 'write')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const { name, icon, sort_order, status } = req.body
    await db.query(
      'UPDATE categories SET name=?, icon=?, sort_order=?, status=? WHERE id=?',
      [name, icon || '', sort_order || 0, status ?? 1, req.params.id]
    )
    res.json({ code: 200, message: '更新成功' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

router.delete('/:id', auth, async (req, res, next) => {
  const rp = await requirePermission('category', 'delete')
  rp(req, res, next)
}, async (req, res) => {
  try {
    const [[{ count }]] = await db.query(
      'SELECT COUNT(*) as count FROM products WHERE category_id=?', [req.params.id]
    )
    if (count > 0) return res.json({ code: 400, message: `该分类下有 ${count} 个商品，无法删除` })

    await db.query('DELETE FROM categories WHERE id=?', [req.params.id])
    res.json({ code: 200, message: '删除成功' })
  } catch (e) {
    res.json({ code: 500, message: '服务器错误' })
  }
})

module.exports = router