DROP DATABASE IF EXISTS mall_db;
CREATE DATABASE mall_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mall_db;

-- 用户表
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nickname VARCHAR(50) DEFAULT '',
  email VARCHAR(100) DEFAULT '',
  phone VARCHAR(20) DEFAULT '',
  avatar VARCHAR(500) DEFAULT '',
  role ENUM('user','admin') DEFAULT 'user',
  status TINYINT DEFAULT 1 COMMENT '0-禁用 1-正常',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 分类表
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  icon VARCHAR(100) DEFAULT '',
  sort_order INT DEFAULT 0,
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 商品表
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  detail TEXT COMMENT '富文本详情',
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) DEFAULT 0,
  stock INT DEFAULT 0,
  category_id INT,
  cover VARCHAR(500) DEFAULT '',
  images TEXT COMMENT 'JSON数组',
  status TINYINT DEFAULT 1 COMMENT '0-下架 1-上架',
  sales INT DEFAULT 0,
  is_hot TINYINT DEFAULT 0,
  is_new TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 购物车表
CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY uk_user_product (user_id, product_id)
) ENGINE=InnoDB;

-- 订单表
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_no VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  status ENUM('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
  receiver_name VARCHAR(50) DEFAULT '',
  receiver_phone VARCHAR(20) DEFAULT '',
  receiver_address VARCHAR(500) DEFAULT '',
  remark VARCHAR(500) DEFAULT '',
  pay_time DATETIME DEFAULT NULL,
  ship_time DATETIME DEFAULT NULL,
  complete_time DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 订单明细表
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(200),
  product_cover VARCHAR(500),
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 索引
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);