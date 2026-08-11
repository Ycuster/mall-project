<template>
  <div class="front-layout">
    <header class="front-header">
      <div class="header-inner">
        <NuxtLink to="/" class="logo">
          <DelayedRender>
            <el-icon :size="24"><Shop /></el-icon>
          </DelayedRender>
          <span>{{ config.public.appName }}</span>
        </NuxtLink>

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
                <DelayedRender>
                  <el-icon><Search /></el-icon>
                </DelayedRender>
              </el-button>
            </template>
          </el-input>
        </div>

        <div class="header-actions">
          <NuxtLink to="/" class="action-link">首页</NuxtLink>
          <NuxtLink to="/products" class="action-link">商品</NuxtLink>

          <NuxtLink to="/cart" class="action-link cart-link">
            <el-badge :value="cartStore.totalCount" :hidden="!cartStore.totalCount" :max="99">
              <DelayedRender>
                <el-icon :size="22"><ShoppingCart /></el-icon>
              </DelayedRender>
            </el-badge>
          </NuxtLink>

          <template v-if="userStore.isLoggedIn">
            <ClientOnly>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="user-trigger">
                  <el-avatar :size="32" style="background: #c0392b">
                    {{ userStore.user?.nickname?.[0] || userStore.user?.username?.[0] || 'U' }}
                  </el-avatar>
                  <span class="user-name">{{ userStore.user?.nickname || userStore.user?.username }}</span>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="orders">
                      <DelayedRender><el-icon><Document /></el-icon></DelayedRender> 我的订单
                    </el-dropdown-item>
                    <el-dropdown-item command="profile">
                      <DelayedRender><el-icon><User /></el-icon></DelayedRender> 个人中心
                    </el-dropdown-item>
                    <el-dropdown-item v-if="userStore.hasAdminAccess()" command="admin" divided>
                      <DelayedRender><el-icon><Setting /></el-icon></DelayedRender> 后台管理
                    </el-dropdown-item>
                    <el-dropdown-item command="logout" divided>
                      <DelayedRender><el-icon><SwitchButton /></el-icon></DelayedRender> 退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </ClientOnly>
          </template>
          <template v-else>
            <NuxtLink to="/login">
              <el-button type="primary" round>登录</el-button>
            </NuxtLink>
          </template>
        </div>
      </div>
    </header>

    <main class="front-main">
      <NuxtPage />
    </main>

    <footer class="front-footer">
      <p>© 2026 MallShop · Vue 3 + Element Plus + Express + MySQL 全栈商城</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useUserStore } from '~/stores/user'
import { useCartStore } from '~/stores/cart'

const config = useRuntimeConfig()
const userStore = useUserStore()
const cartStore = useCartStore()
const keyword = ref<string>('')

onMounted(async () => {
  if (userStore.isLoggedIn) {
    try { await cartStore.fetch() } catch {}
  }
})

function doSearch(): void {
  if (keyword.value.trim()) {
    navigateTo({ path: '/products', query: { keyword: keyword.value.trim() } })
  }
}

function handleCommand(cmd: string): void {
  if (cmd === 'logout') {
    userStore.logout()
    cartStore.clear()
    navigateTo('/')
  } else if (cmd === 'admin') {
    navigateTo('/admin')
  } else {
    navigateTo('/' + cmd)
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