import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, AuthResponse, LoginForm } from '~/types/user'
import type { ApiResponse } from '~/types/api'
import { usePermissionStore } from './permission'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const user = ref<User | null>(null)

  const isLoggedIn = computed<boolean>(() => !!token.value)
  const isAdmin = computed<boolean>(() => user.value?.role === 'admin')

  function setAuth(t: string, u: User | null): void {
    token.value = t
    user.value = u
  }

  function logout(): void {
    token.value = ''
    user.value = null
    useCookie('mall_token').value = ''
    useCookie('mall_user').value = ''
    usePermissionStore().clear()
  }

  async function fetchProfile(): Promise<ApiResponse<User>> {
    const { $api } = useNuxtApp()
    const res = await $api.get<any>('/auth/profile')
    if (res.code === 200 && res.data) {
      const { permissions, ...userData } = res.data
      user.value = userData
      if (permissions) {
        usePermissionStore().setFromLogin(permissions)
      }
    }
    return res
  }

  async function login(form: LoginForm): Promise<ApiResponse<AuthResponse>> {
    const { $api } = useNuxtApp()
    const res = await $api.post<any>('/auth/login', form)
    if (res.code === 200) {
      setAuth(res.data.token, res.data.user)
      if (res.data.permissions) {
        usePermissionStore().setFromLogin(res.data.permissions)
      }
    }
    return res
  }

  return { token, user, isLoggedIn, isAdmin, setAuth, logout, fetchProfile, login }
})
