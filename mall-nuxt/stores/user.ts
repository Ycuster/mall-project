import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, AuthResponse, LoginForm, Permission } from '~/types/user'
import type { ApiResponse } from '~/types/api'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const user = ref<User | null>(null)

  const isLoggedIn = computed<boolean>(() => !!token.value)
  const isAdmin = computed<boolean>(() => {
    if (user.value?.role === 'admin') return true
    if (user.value?.role_id) return true
    return false
  })

  const ADMIN_RESOURCES = ['dashboard', 'product', 'category', 'order', 'user', 'role']

  function hasPermission(resource: string, action: string): boolean {
    if (user.value?.role === 'admin' && !user.value?.role_id) return true
    return user.value?.permissions?.some(p => p.resource === resource && p.action === action) ?? false
  }

  function hasAnyPermission(resource: string): boolean {
    if (user.value?.role === 'admin' && !user.value?.role_id) return true
    return user.value?.permissions?.some(p => p.resource === resource) ?? false
  }

  function hasAdminAccess(): boolean {
    if (user.value?.role === 'admin' || user.value?.role_id) return true
    return ADMIN_RESOURCES.some(r => hasAnyPermission(r))
  }

  function setAuth(t: string, u: User | null): void {
    token.value = t
    user.value = u
  }

  function logout(): void {
    token.value = ''
    user.value = null
    useCookie('mall_token').value = ''
    useCookie('mall_user').value = ''
  }

  async function fetchProfile(): Promise<ApiResponse<User>> {
    const { $api } = useNuxtApp()
    const res = await $api.get<User>('/auth/profile')
    if (res.code === 200) {
      user.value = res.data
    }
    return res
  }

  async function login(form: LoginForm): Promise<ApiResponse<AuthResponse>> {
    const { $api } = useNuxtApp()
    const res = await $api.post<AuthResponse>('/auth/login', form)
    if (res.code === 200) {
      setAuth(res.data.token, res.data.user)
    }
    return res
  }

  return { token, user, isLoggedIn, isAdmin, hasPermission, hasAnyPermission, hasAdminAccess, setAuth, logout, fetchProfile, login }
})