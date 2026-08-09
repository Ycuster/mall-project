import { useUserStore } from '~/stores/user'

export default defineNuxtPlugin(() => {
  const userStore = useUserStore()

  const token = useCookie('mall_token').value as string
  const userStr = useCookie('mall_user').value as string

  if (token) {
    let userData: any = null
    if (userStr) {
      try {
        userData = JSON.parse(userStr)
      } catch {}
    }
    userStore.setAuth(token, userData)
  }
})