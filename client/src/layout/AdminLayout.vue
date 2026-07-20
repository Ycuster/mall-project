<template>
  <el-container class="admin-layout">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '220px'" class="admin-aside">
      <div class="aside-logo" :class="{ collapsed: isCollapse }">
        <el-icon :size="24"><Shop /></el-icon>
        <span v-show="!isCollapse">MallShop</span>
      </div>

      <el-menu
        :default-active="route.path"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        class="aside-menu"
        background-color="#001529"
        text-color="rgba(255,255,255,0.65)"
        active-text-color="#fff"
      >
        <el-menu-item index="/admin/dashboard">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>数据看板</template>
        </el-menu-item>
        <el-menu-item index="/admin/products">
          <el-icon><Goods /></el-icon>
          <template #title>商品管理</template>
        </el-menu-item>
        <el-menu-item index="/admin/categories">
          <el-icon><Menu /></el-icon>
          <template #title>分类管理</template>
        </el-menu-item>
        <el-menu-item index="/admin/orders">
          <el-icon><Document /></el-icon>
          <template #title>订单管理</template>
        </el-menu-item>
        <el-menu-item index="/admin/users">
          <el-icon><User /></el-icon>
          <template #title>用户管理</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧 -->
    <el-container>
      <el-header class="admin-header">
        <div style="display: flex; align-items: center; gap: 16px">
          <el-icon
            :size="20"
            style="cursor: pointer; color: #606266"
            @click="isCollapse = !isCollapse"
          >
            <component :is="isCollapse ? 'Expand' : 'Fold'" />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="display: flex; align-items: center; gap: 16px">
          <router-link to="/" style="color: #606266; font-size: 0.85rem">
            <el-icon><HomeFilled /></el-icon> 回到前台
          </router-link>
          <el-dropdown trigger="click" @command="handleCommand">
            <span style="display: flex; align-items: center; gap: 8px; cursor: pointer">
              <el-avatar :size="32" style="background: #c0392b">
                {{ userStore.user?.username?.[0]?.toUpperCase() || 'A' }}
              </el-avatar>
              <span style="font-size: 0.9rem">{{ userStore.user?.username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">
                  <el-icon><SwitchButton /></el-icon> 退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="admin-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isCollapse = ref(false)

const titleMap = {
  '/admin/dashboard': '数据看板',
  '/admin/products': '商品管理',
  '/admin/categories': '分类管理',
  '/admin/orders': '订单管理',
  '/admin/users': '用户管理'
}

const currentTitle = computed(() => titleMap[route.path] || '')

function handleCommand(cmd) {
  if (cmd === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.admin-layout {
  height: 100vh;
}

.admin-aside {
  background: #001529;
  transition: width 0.3s;
  overflow: hidden;
}

.aside-logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.aside-logo.collapsed span {
  display: none;
}

.aside-menu {
  border-right: none;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.aside-menu .el-menu-item.is-active {
  background: #c0392b !important;
}

.aside-menu .el-menu-item:hover {
  background: rgba(255, 255, 255, 0.08) !important;
}

.admin-header {
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
}

.admin-main {
  background: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}
</style>