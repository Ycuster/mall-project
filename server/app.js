const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const db = require('./config/db')

const app = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// 静态文件
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
app.use('/uploads', express.static(uploadsDir))

// Vue 构建产物
const distDir = path.join(__dirname, '../client/dist')
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
}

// API 路由
app.use('/api/auth', require('./routes/auth'))
app.use('/api/categories', require('./routes/category'))
app.use('/api/products', require('./routes/product'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/orders', require('./routes/order'))
app.use('/api/users', require('./routes/user'))
app.use('/api/dashboard', require('./routes/dashboard'))
app.use('/api/upload', require('./routes/upload'))
app.use('/api/roles', require('./routes/role'))

// 全局错误处理
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.json({ code: 400, message: '文件大小不能超过5MB' })
  }
  res.status(500).json({ code: 500, message: '服务器内部错误' })
})

// Vue SPA fallback
app.get('*', (req, res) => {
  const indexPath = path.join(distDir, 'index.html')
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath)
  } else {
    res.status(404).json({ code: 404, message: 'API not found' })
  }
})

// 初始化种子数据
async function seed() {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS roles (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(50) NOT NULL UNIQUE,
      display_name VARCHAR(100) NOT NULL,
      description VARCHAR(255) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`)

    await db.query(`CREATE TABLE IF NOT EXISTS permissions (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL UNIQUE,
      display_name VARCHAR(100) NOT NULL,
      resource VARCHAR(50) NOT NULL,
      action VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`)

    await db.query(`CREATE TABLE IF NOT EXISTS role_permissions (
      role_id INT NOT NULL,
      permission_id INT NOT NULL,
      PRIMARY KEY (role_id, permission_id),
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
      FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
    )`)

    try {
      const [roleCols] = await db.query('SHOW COLUMNS FROM users LIKE ?', ['role_id'])
      if (!roleCols.length) {
        await db.query('ALTER TABLE users ADD COLUMN role_id INT DEFAULT NULL')
      }
    } catch (e) {
      console.warn('检查 role_id 列失败（users 表可能不存在）:', e.message)
    }

    try {
      const [statusCols] = await db.query('SHOW COLUMNS FROM users LIKE ?', ['status'])
      if (!statusCols.length) {
        await db.query('ALTER TABLE users ADD COLUMN status TINYINT NOT NULL DEFAULT 1')
      }
    } catch (e) {
      console.warn('检查 status 列失败:', e.message)
    }

    await db.query('INSERT IGNORE INTO roles (name, display_name, description) VALUES ?', [[
      ['super_admin', '超级管理员', '拥有所有权限'],
      ['product_manager', '商品管理员', '管理商品和分类'],
      ['order_manager', '订单管理员', '管理订单发货和取消'],
      ['viewer', '只读查看者', '只能查看各模块数据'],
      ['user', '普通用户', '前台普通用户角色']
    ]])

    const permData = [
      ['dashboard:read', '查看数据看板', 'dashboard', 'read'],
      ['product:read', '查看商品', 'product', 'read'],
      ['product:write', '编辑商品', 'product', 'write'],
      ['product:delete', '删除商品', 'product', 'delete'],
      ['category:read', '查看分类', 'category', 'read'],
      ['category:write', '编辑分类', 'category', 'write'],
      ['category:delete', '删除分类', 'category', 'delete'],
      ['order:read', '查看订单', 'order', 'read'],
      ['order:write', '编辑订单', 'order', 'write'],
      ['order:ship', '订单发货', 'order', 'ship'],
      ['order:cancel', '取消订单', 'order', 'cancel'],
      ['user:read', '查看用户', 'user', 'read'],
      ['user:write', '编辑用户', 'user', 'write'],
      ['user:delete', '删除用户', 'user', 'delete'],
      ['role:manage', '管理角色权限', 'role', 'manage']
    ]
    await db.query('INSERT IGNORE INTO permissions (name, display_name, resource, action) VALUES ?', [permData])

    const [[{ id: saId }]] = await db.query("SELECT id FROM roles WHERE name='super_admin'")
    const [[{ id: pmId }]] = await db.query("SELECT id FROM roles WHERE name='product_manager'")
    const [[{ id: omId }]] = await db.query("SELECT id FROM roles WHERE name='order_manager'")
    const [[{ id: viId }]] = await db.query("SELECT id FROM roles WHERE name='viewer'")
    const [[{ id: urId }]] = await db.query("SELECT id FROM roles WHERE name='user'")

    const [allPerms] = await db.query('SELECT id, resource, action FROM permissions')
    const permMap = {}
    for (const p of allPerms) permMap[`${p.resource}:${p.action}`] = p.id

    const [existingRp] = await db.query('SELECT COUNT(*) as c FROM role_permissions')
    if (existingRp[0].c === 0) {
      const rpValues = []
      for (const key of Object.keys(permMap)) rpValues.push([saId, permMap[key]])
      ;['dashboard:read','product:read','product:write','product:delete','category:read','category:write','category:delete']
        .forEach(k => rpValues.push([pmId, permMap[k]]))
      ;['dashboard:read','order:read','order:write','order:ship','order:cancel']
        .forEach(k => rpValues.push([omId, permMap[k]]))
      ;['dashboard:read','product:read','category:read','order:read','user:read']
        .forEach(k => rpValues.push([viId, permMap[k]]))
      await db.query('INSERT INTO role_permissions (role_id, permission_id) VALUES ?', [rpValues])
    }

    try {
      const [[adminUser]] = await db.query("SELECT id, role_id FROM users WHERE username='admin' LIMIT 1")
      if (adminUser && !adminUser.role_id) {
        await db.query('UPDATE users SET role_id=? WHERE id=?', [saId, adminUser.id])
      }
    } catch {}

    const [[{ c }]] = await db.query('SELECT COUNT(*) as c FROM users')
    if (c > 0) return

    console.log('🌱 初始化种子数据...')

    const adminPwd = await bcrypt.hash('admin123', 10)
    const testPwd = await bcrypt.hash('test123', 10)

    await db.query('INSERT INTO users (username,password,nickname,email,phone,role,role_id) VALUES ?', [[
      ['admin', adminPwd, '系统管理员', 'admin@mall.com', '13800000000', 'admin', saId],
      ['test', testPwd, '测试用户', 'test@mall.com', '13900000000', 'user', urId],
      ['zhangsan', testPwd, '张三', 'zhangsan@mall.com', '13700000001', 'user', urId],
      ['lisi', testPwd, '李四', 'lisi@mall.com', '13700000002', 'user', urId]
    ]])

    await db.query('INSERT INTO categories (name, icon, sort_order) VALUES ?', [[
      ['手机数码', '📱', 1], ['电脑办公', '💻', 2], ['家用电器', '🏠', 3],
      ['服饰鞋包', '👕', 4], ['食品生鲜', '🍎', 5], ['美妆护肤', '💄', 6],
      ['运动户外', '⚽', 7], ['图书文具', '📚', 8]
    ]])

    const products = [
      ['iPhone 15 Pro Max 256G', 'A17 Pro芯片,钛金属设计,4800万像素三摄系统,超长续航', 9999, 10999, 100, 1, 1, 1, 2560],
      ['MacBook Pro 14" M3 Pro', 'M3 Pro芯片,18GB统一内存,Liquid Retina XDR显示屏', 14999, 16999, 50, 2, 1, 0, 1890],
      ['Sony WH-1000XM5 降噪耳机', '旗舰级降噪,30小时续航,多点连接,Hi-Res Audio认证', 2499, 2999, 200, 1, 0, 1, 5230],
      ['戴森 V15 Detect 吸尘器', '激光探测灰尘,智能调节吸力,60分钟续航', 4990, 5490, 80, 3, 0, 0, 1560],
      ['Air Jordan 1 Retro High OG', '经典复刻高帮,全粒面皮革,AAir缓震科技', 1299, 1499, 300, 4, 1, 0, 8920],
      ['SK-II 神仙水 230ml', '传奇Pitera精华,改善肤质,提亮肤色', 1590, 1790, 150, 6, 0, 0, 4450],
      ['Samsung Galaxy S24 Ultra', 'Galaxy AI加持,钛金属框架,2亿像素主摄', 9699, 10499, 120, 1, 1, 0, 3340],
      ['iPad Pro 12.9" M2', 'M2芯片,mini-LED显示屏,ProMotion自适应刷新率', 8999, 9999, 60, 2, 0, 0, 2780],
      ['Nintendo Switch OLED', '7英寸OLED屏幕,增强音效,宽可调节支架', 2399, 2599, 90, 1, 0, 1, 5670],
      ['AirPods Pro 2 USB-C', '自适应降噪,个性化空间音频,USB-C充电', 1799, 1999, 300, 1, 1, 0, 10240],
      ['LEGO 哈格沃兹城堡', '哈利波特系列,6020粒积木,收藏级套装', 3699, 4299, 30, 4, 0, 0, 890],
      ['小米净水器 600G', '双RO反渗透,600加仑大通量,智能换芯', 1999, 2499, 200, 3, 0, 0, 1670],
      ['Lululemon Align 瑜伽裤', 'Nulu面料裸感体验,四面弹力', 850, 980, 500, 4, 0, 0, 7230],
      ['智利进口车厘子 2斤装', 'JJ级大果,产地直发,甜度饱满', 128, 168, 1000, 5, 0, 1, 23450],
      ['飞利浦电动牙刷 HX9352', '声波震动技术,5种清洁模式,2周续航', 799, 999, 180, 3, 0, 0, 3200],
      ['Bose SoundLink Flex', '便携蓝牙音箱,IP67防水,12小时续航', 999, 1299, 150, 1, 0, 0, 2100],
    ]

    for (const [name, desc, price, op, stock, cid, hot, news, sales] of products) {
      const cover = `https://picsum.photos/seed/${encodeURIComponent(name)}/400/400`
      await db.query(
        `INSERT INTO products (name,description,price,original_price,stock,category_id,cover,images,status,is_hot,is_new,sales)
         VALUES (?,?,?,?,?,?,?,?,1,?,?,?)`,
        [name, desc, price, op, stock, cid, cover, JSON.stringify([cover]), hot, news, sales]
      )
    }

    // 创建几个测试订单
    const orderNo1 = '20240101120000' + String(Math.floor(Math.random() * 100000)).padStart(5, '0')
    const orderNo2 = '20240102150000' + String(Math.floor(Math.random() * 100000)).padStart(5, '0')
    await db.query(`INSERT INTO orders (order_no,user_id,total_amount,status,receiver_name,receiver_phone,receiver_address) VALUES
      (?,2,9999,'paid','张三','13700000001','北京市朝阳区xxx路'),
      (?,3,3798,'shipped','李四','13700000002','上海市浦东新区xxx路')`,
      [orderNo1, orderNo2])
    await db.query(`INSERT INTO order_items (order_id,product_id,product_name,product_cover,quantity,price) VALUES
      (1,1,'iPhone 15 Pro Max 256G','',1,9999),
      (2,3,'Sony WH-1000XM5 降噪耳机','',1,2499),
      (2,9,'Nintendo Switch OLED','',1,1299)`)

    console.log('✅ 种子数据初始化完成!')
    console.log('   管理员: admin / admin123')
    console.log('   测试用户: test / test123')
  } catch (e) {
    console.error('Seed error:', e)
  }
}

app.listen(PORT, async () => {
  console.log(`\n🚀 服务已启动: http://localhost:${PORT}`)
  console.log(`📡 API 地址: http://localhost:${PORT}/api`)
  await seed()
})