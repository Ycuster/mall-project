<template>
  <div class="front-layout">
    <!-- 顶部导航 -->
    <header class="front-header">
      <div class="header-inner">
        <router-link to="/" class="logo">
          <el-icon :size="24"><Shop /></el-icon>
          <span>MallShop</span>
        </router-link>

        <div class="search-wrap">
          <el-input
            v-model="keyword"
            placeholder="搜索你想要的好物..."
            size="large"
            clearable
            @keydown.enter="doSearch"
          >
            <template #append>
              <el-button @click="doSearch">
                <el-icon><Search /></el-icon>
              </el-button>
            </template>
          </el-input>
        </div>

        <div class="header-actions">
          <router-link to="/" class="action-link">首页</router-link>
          <router-link to="/products" class="action-link">商品</router-link>

          <router-link to="/cart" class="action-link cart-link">
            <el-badge :value="cartStore.totalCount" :hidden="!cartStore.totalCount" :max="99">
              <el-icon :size="22"><ShoppingCart /></el-icon>
            </el-badge>
          </router-link>

          <el-dropdown v-if="userStore.isLoggedIn" trigger="click" @command="handleCommand">
            <span class="user-trigger">
              <el-avatar :size="32" style="background: #c0392b">
                {{ userStore.user?.nickname?.[0] || userStore.user?.username?.[0] || 'U' }}
              </el-avatar>
              <span class="user-name">{{ userStore.user?.nickname || userStore.user?.username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="orders">
                  <el-icon><Document /></el-icon> 我的订单
                </el-dropdown-item>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon> 个人中心
                </el-dropdown-item>
                <el-dropdown-item v-if="userStore.isAdmin" command="admin" divided>
                  <el-icon><Setting /></el-icon> 后台管理
                </el-dropdown-item>
                <el-dropdown-item command="logout" divided>
                  <el-icon><SwitchButton /></el-icon> 退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <template v-else>
            <router-link to="/login">
              <el-button type="primary" round>登录</el-button>
            </router-link>
          </template>
        </div>
      </div>
    </header>

    <!-- 主内容 -->
    <main class="front-main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 底部 -->
    <footer class="front-footer">
      <p>© 2026 MallShop · Vue 3 + Element Plus + Express + MySQL 全栈商城</p>
      
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()
const keyword = ref('')

function doSearch() {
  if (keyword.value.trim()) {
    router.push({ path: '/products', query: { keyword: keyword.value.trim() } })
  }
}

function handleCommand(cmd) {
  if (cmd === 'logout') {
    userStore.logout()
    cartStore.items = []
    router.push('/')
  } else if (cmd === 'admin') {
    router.push('/admin')
  } else {
    router.push('/' + cmd)
  }
}
</script>

<style scoped>
.front-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.front-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #c0392b;
  white-space: nowrap;
  flex-shrink: 0;
}

.search-wrap {
  flex: 1;
  max-width: 480px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
  white-space: nowrap;
}

.action-link {
  font-size: 0.9rem;
  color: #606266;
  transition: color 0.2s;
}

.action-link:hover {
  color: #c0392b;
}

.cart-link {
  font-size: 1.1rem;
  position: relative;
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.user-name {
  font-size: 0.9rem;
  color: #303133;
}

.front-main {
  flex: 1;
}

.front-footer {
  background: #1a1a2e;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding: 32px 24px;
  margin-top: 40px;
  font-size: 0.85rem;
}
</style>