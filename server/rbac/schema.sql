-- ================================================
-- RBAC 权限系统数据库迁移
-- ================================================

-- 1. 角色表
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE COMMENT '角色名称',
  code VARCHAR(50) NOT NULL UNIQUE COMMENT '角色编码',
  description VARCHAR(255) DEFAULT '' COMMENT '角色描述',
  sort_order INT DEFAULT 0 COMMENT '排序',
  status TINYINT DEFAULT 1 COMMENT '状态 1启用 0禁用',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (code),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- 2. 权限表
CREATE TABLE IF NOT EXISTS permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(100) NOT NULL UNIQUE COMMENT '权限编码 module:action',
  name VARCHAR(100) NOT NULL COMMENT '权限名称',
  module VARCHAR(50) NOT NULL COMMENT '所属模块',
  type ENUM('menu', 'button', 'api', 'data') NOT NULL DEFAULT 'menu' COMMENT '权限类型',
  parent_id INT DEFAULT 0 COMMENT '父级权限ID（用于树形结构）',
  sort_order INT DEFAULT 0,
  icon VARCHAR(50) DEFAULT '' COMMENT '菜单图标',
  route_path VARCHAR(200) DEFAULT '' COMMENT '前端路由路径',
  status TINYINT DEFAULT 1 COMMENT '状态',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (code),
  INDEX idx_module (module),
  INDEX idx_type (type),
  INDEX idx_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表';

-- 3. 角色-权限关联表
CREATE TABLE IF NOT EXISTS role_permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_role_permission (role_id, permission_id),
  INDEX idx_role (role_id),
  INDEX idx_permission (permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色权限关联表';

-- 4. 用户-角色关联表
CREATE TABLE IF NOT EXISTS user_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_role (user_id, role_id),
  INDEX idx_user (user_id),
  INDEX idx_role (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色关联表';

-- 5. 操作日志表
CREATE TABLE IF NOT EXISTS operation_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT COMMENT '操作人ID',
  username VARCHAR(50) COMMENT '操作人用户名',
  module VARCHAR(50) COMMENT '操作模块',
  action VARCHAR(50) COMMENT '操作动作',
  target_type VARCHAR(50) COMMENT '操作对象类型',
  target_id VARCHAR(100) COMMENT '操作对象ID',
  detail JSON COMMENT '操作详情',
  ip VARCHAR(50) COMMENT 'IP地址',
  user_agent VARCHAR(500) COMMENT '浏览器UA',
  status TINYINT DEFAULT 1 COMMENT '操作状态 1成功 0失败',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user (user_id),
  INDEX idx_module (module),
  INDEX idx_action (action),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';

-- ================================================
-- 种子数据：初始化角色
-- ================================================
INSERT INTO roles (name, code, description, sort_order) VALUES
('超级管理员', 'super_admin', '拥有所有权限，不可删除', 1),
('管理员', 'admin', '后台管理权限', 2),
('运营', 'operator', '商品、订单管理权限', 3),
('客服', 'customer_service', '订单查看与处理权限', 4),
('普通用户', 'user', '前台浏览购买权限', 5)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- ================================================
-- 种子数据：初始化权限
-- ================================================

-- 模块：Dashboard（数据看板）
INSERT INTO permissions (code, name, module, type, parent_id, sort_order, icon, route_path) VALUES
('dashboard:view', '数据看板查看', 'dashboard', 'menu', 0, 1, 'DataAnalysis', '/admin/dashboard'),
('dashboard:stats', '统计数据查看', 'dashboard', 'api', 0, 1, '', '');

-- 模块：Product（商品管理）
INSERT INTO permissions (code, name, module, type, parent_id, sort_order, icon, route_path) VALUES
('product:view', '商品管理', 'product', 'menu', 0, 2, 'Goods', '/admin/products'),
('product:create', '新增商品', 'product', 'button', 0, 1, '', ''),
('product:edit', '编辑商品', 'product', 'button', 0, 2, '', ''),
('product:delete', '删除商品', 'product', 'button', 0, 3, '', ''),
('product:list', '商品列表', 'product', 'api', 0, 4, '', ''),
('product:detail', '商品详情', 'product', 'api', 0, 5, '', '');

-- 模块：Category（分类管理）
INSERT INTO permissions (code, name, module, type, parent_id, sort_order, icon, route_path) VALUES
('category:view', '分类管理', 'category', 'menu', 0, 3, 'Menu', '/admin/categories'),
('category:create', '新增分类', 'category', 'button', 0, 1, '', ''),
('category:edit', '编辑分类', 'category', 'button', 0, 2, '', ''),
('category:delete', '删除分类', 'category', 'button', 0, 3, '', ''),
('category:list', '分类列表', 'category', 'api', 0, 4, '', '');

-- 模块：Order（订单管理）
INSERT INTO permissions (code, name, module, type, parent_id, sort_order, icon, route_path) VALUES
('order:view', '订单管理', 'order', 'menu', 0, 4, 'Document', '/admin/orders'),
('order:detail', '订单详情', 'order', 'button', 0, 1, '', ''),
('order:ship', '订单发货', 'order', 'button', 0, 2, '', ''),
('order:cancel', '取消订单', 'order', 'button', 0, 3, '', ''),
('order:list', '订单列表', 'order', 'api', 0, 4, '', ''),
('order:status', '变更状态', 'order', 'api', 0, 5, '', '');

-- 模块：User（用户管理）
INSERT INTO permissions (code, name, module, type, parent_id, sort_order, icon, route_path) VALUES
('user:view', '用户管理', 'user', 'menu', 0, 5, 'User', '/admin/users'),
('user:edit', '编辑用户', 'user', 'button', 0, 1, '', ''),
('user:delete', '删除用户', 'user', 'button', 0, 2, '', ''),
('user:list', '用户列表', 'user', 'api', 0, 3, '', ''),
('user:role', '角色分配', 'user', 'api', 0, 4, '', '');

-- 模块：Role（角色权限管理）
INSERT INTO permissions (code, name, module, type, parent_id, sort_order, icon, route_path) VALUES
('role:view', '角色管理', 'role', 'menu', 0, 6, 'Setting', '/admin/roles'),
('role:create', '新增角色', 'role', 'button', 0, 1, '', ''),
('role:edit', '编辑角色', 'role', 'button', 0, 2, '', ''),
('role:delete', '删除角色', 'role', 'button', 0, 3, '', ''),
('role:list', '角色列表', 'role', 'api', 0, 4, '', ''),
('role:assign', '分配权限', 'role', 'api', 0, 5, '', '');

-- 模块：Upload（文件上传）
INSERT INTO permissions (code, name, module, type, parent_id, sort_order, icon, route_path) VALUES
('upload:image', '图片上传', 'upload', 'api', 0, 1, '', '');

-- 模块：Front（前台公共）
INSERT INTO permissions (code, name, module, type, parent_id, sort_order, icon, route_path) VALUES
('front:browse', '浏览商品', 'front', 'api', 0, 1, '', ''),
('front:cart', '购物车操作', 'front', 'api', 0, 2, '', ''),
('front:order', '下单购买', 'front', 'api', 0, 3, '', '');

-- ================================================
-- 种子数据：角色-权限关联
-- ================================================

-- 超级管理员拥有所有权限
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions;

-- 管理员角色：除了角色删除外的大部分权限
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT 2, id FROM permissions WHERE code NOT IN ('role:delete') AND module != 'front';

-- 运营角色：商品+分类+订单相关
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT 3, id FROM permissions WHERE module IN ('product', 'category', 'order', 'dashboard');

-- 客服角色：订单查看+用户查看
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT 4, id FROM permissions WHERE code IN (
  'order:view', 'order:detail', 'order:list', 'order:ship',
  'user:view', 'user:list', 'user:edit',
  'front:browse', 'front:cart', 'front:order'
);

-- 普通用户角色：前台权限
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT 5, id FROM permissions WHERE module = 'front';

-- 现有用户绑定默认角色
INSERT IGNORE INTO user_roles (user_id, role_id) VALUES
(1, 1), (1, 2),  -- admin 同时拥有超级管理员和管理员角色
(2, 5),          -- test 普通用户
(3, 5),          -- zhangsan 普通用户
(4, 5);          -- lisi 普通用户

-- 迁移旧 role 字段数据到新表（保留原 role 字段作为兼容）
