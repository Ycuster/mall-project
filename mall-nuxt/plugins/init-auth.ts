import { useUserStore } from '~/stores/user'
import { useCartStore } from '~/stores/cart'
import { usePermissionStore } from '~/stores/permission'

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const cartStore = useCartStore()
  const permissionStore = usePermissionStore()

  if (userStore.isLoggedIn) {
    try {
      const { $api } = useNuxtApp()
      const res = await $api.get<any>('/auth/profile')
      if (res.code === 200 && res.data) {
        userStore.setAuth(userStore.token, res.data)
        if (res.data.permissions) {
          permissionStore.setFromLogin(res.data.permissions)
        }
      }
    } catch {
      // Token 过期，清除状态
      userStore.logout()
      return
    }

    try {
      await cartStore.fetch()
    } catch {}
  }
})
