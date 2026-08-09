import { useUserStore } from '~/stores/user'

const PUBLIC_PATHS = ['/login', '/register', '/products', '/product/']

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

  if (requiresAdmin && !userStore.isAdmin) {
    return navigateTo('/')
  }
})