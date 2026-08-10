import { useUserStore } from '~/stores/user'
import { usePermissionStore } from '~/stores/permission'

const PUBLIC_PATHS = ['/login', '/register', '/products', '/product/']

// 路由级权限映射（页面 -> 所需权限码）
const ROUTE_PERMISSION_MAP: Record<string, string | string[]> = {
  '/admin/dashboard': 'dashboard:view',
  '/admin/products': 'product:view',
  '/admin/categories': 'category:view',
  '/admin/orders': 'order:view',
  '/admin/users': 'user:view',
  '/admin/roles': 'role:view'
}

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  const isPublic = to.path === '/' || PUBLIC_PATHS.some(p => to.path.startsWith(p))
  if (isPublic) return

  const requiresAuth = to.path.startsWith('/cart') ||
    to.path.startsWith('/checkout') ||
    to.path.startsWith('/orders') ||
    to.path.startsWith('/profile')

  const requiresAdmin = to.path.startsWith('/admin')

  if (requiresAuth || requiresAdmin) {
    if (!userStore.isLoggedIn) {
      return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
  }

  if (requiresAdmin) {
    // 超级管理员直接放行
    if (permissionStore.isSuperAdmin) return

    // 检查路由级权限
    const requiredPerm = ROUTE_PERMISSION_MAP[to.path]
    if (requiredPerm) {
      if (Array.isArray(requiredPerm)) {
        if (!requiredPerm.some(p => permissionStore.codes.includes(p))) {
          return navigateTo('/403')
        }
      } else if (!permissionStore.codes.includes(requiredPerm)) {
        return navigateTo('/403')
      }
    } else {
      // 默认管理后台路由需要 admin 角色
      if (!userStore.isAdmin) {
        return navigateTo('/')
      }
    }
  }
})
