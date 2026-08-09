import { useUserStore } from '~/stores/user'
import { useCartStore } from '~/stores/cart'

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const cartStore = useCartStore()

  if (userStore.isLoggedIn) {
    try {
      await userStore.fetchProfile()
    } catch {}

    try {
      await cartStore.fetch()
    } catch {}
  }
})