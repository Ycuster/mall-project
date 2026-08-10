<template>
  <el-container class="admin-layout">
    <el-aside :width="isCollapse ? '64px' : '220px'" class="admin-aside">
      <div class="aside-logo" :class="{ collapsed: isCollapse }">
        <ClientOnly><el-icon :size="24"><Shop /></el-icon></ClientOnly>
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
        <!-- 动态菜单：基于权限渲染 -->
        <template v-for="menu in visibleMenus" :key="menu.module">
          <el-menu-item :index="menu.menus[0]?.route_path || ''">
            <ClientOnly><el-icon><component :is="getModuleIcon(menu.module)" /></el-icon></ClientOnly>
            <template #title>{{ getModuleLabel(menu.module) }}</template>
          </el-menu-item>
        </template>

        <!-- 角色管理菜单（仅超级管理员可见） -->
        <el-menu-item v-if="permissionStore.hasPermission('role:view')" index="/admin/roles">
          <ClientOnly><el-icon><Lock /></el-icon></ClientOnly>
          <template #title>角色权限</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="admin-header">
        <div style="display: flex; align-items: center; gap: 16px">
          <ClientOnly><el-icon
            :size="20"
            style="cursor: pointer; color: #606266"
            @click="isCollapse = !isCollapse"
          >
            <component :is="isCollapse ? 'Expand' : 'Fold'" />
          </el-icon></ClientOnly>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="display: flex; align-items: center; gap: 16px">
          <NuxtLink to="/" style="color: #606266; font-size: 0.85rem">
            <ClientOnly><el-icon><HomeFilled /></el-icon></ClientOnly> 回到前台
          </NuxtLink>
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
                  <ClientOnly><el-icon><SwitchButton /></el-icon></ClientOnly> 退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="admin-main">
        <NuxtPage />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from '#app'
import { useUserStore } from '~/stores/user'
import { usePermissionStore } from '~/stores/permission'

const route = useRoute()
const userStore = useUserStore()
const permissionStore = usePermissionStore()
const isCollapse = ref<boolean>(false)

// 菜单图标映射
const iconMap: Record<string, string> = {
  dashboard: 'DataAnalysis',
  product: 'Goods',
  category: 'Menu',
  order: 'Document',
  user: 'User',
  role: 'Lock'
}

// 菜单名称映射
const labelMap: Record<string, string> = {
  dashboard: '数据看板',
  product: '商品管理',
  category: '分类管理',
  order: '订单管理',
  user: '用户管理',
  role: '角色权限'
}

const getModuleIcon = (module: string): string => iconMap[module] || 'Circle'
const getModuleLabel = (module: string): string => labelMap[module] || module

// 根据权限过滤可见菜单
const visibleMenus = computed(() => {
  return permissionStore.menus.filter(m => {
    // 超级管理员看所有菜单
    if (permissionStore.isSuperAdmin) return true
    // 至少有一个菜单权限才显示
    return m.menus.some(menu => permissionStore.codes.includes(menu.code))
  })
})

const titleMap: Record<string, string> = {
  '/admin/dashboard': '数据看板',
  '/admin/products': '商品管理',
  '/admin/categories': '分类管理',
  '/admin/orders': '订单管理',
  '/admin/users': '用户管理',
  '/admin/roles': '角色权限'
}

const currentTitle = computed<string>(() => titleMap[route.path] || '')

function handleCommand(cmd: string): void {
  if (cmd === 'logout') {
    userStore.logout()
    navigateTo('/login')
  }
}

onMounted(async () => {
  if (userStore.isLoggedIn && !permissionStore.loaded) {
    try {
      await permissionStore.fetchPermissions()
    } catch {}
  }
})
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
