import { useUserStore } from '~/stores/user'

const PUBLIC_PATHS = ['/login', '/register', '/products', '/product/']

const ADMIN_PERMISSION_MAP: Record<string, { resource: string; action: string }> = {
  '/admin/dashboard': { resource: 'dashboard', action: 'read' },
  '/admin/products': { resource: 'product', action: 'read' },
  '/admin/categories': { resource: 'category', action: 'read' },
  '/admin/orders': { resource: 'order', action: 'read' },
  '/admin/users': { resource: 'user', action: 'read' },
  '/admin/roles': { resource: 'role', action: 'manage' }
}

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

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
    for (const [pathPrefix, perm] of Object.entries(ADMIN_PERMISSION_MAP)) {
      if (to.path.startsWith(pathPrefix)) {
        if (!userStore.hasPermission(perm.resource, perm.action)) {
          return navigateTo('/admin/dashboard')
        }
        break
      }
    }
  }
})