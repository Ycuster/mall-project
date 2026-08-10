import { useUserStore } from '~/stores/user'
import { useCartStore } from '~/stores/cart'

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const cartStore = useCartStore()

  if (userStore.isLoggedIn) {
    try {
      await userStore.fetchProfile()
      const userCookie = useCookie('mall_user')
      if (userStore.user) {
        userCookie.value = JSON.stringify(userStore.user)
      }
    } catch {}

    try {
      await cartStore.fetch()
    } catch {}
  }
})