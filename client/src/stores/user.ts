import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '../utils/request'
import type { User, AuthResponse, LoginForm } from '../types/user'
import type { ApiResponse } from '../types/api'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('mall_token') || '')
  const user = ref<User | null>(JSON.parse(localStorage.getItem('mall_user') || 'null'))

  const isLoggedIn = computed<boolean>(() => !!token.value)
  const isAdmin = computed<boolean>(() => user.value?.role === 'admin')

  function setAuth(t: string, u: User): void {
    token.value = t
    user.value = u
    localStorage.setItem('mall_token', t)
    localStorage.setItem('mall_user', JSON.stringify(u))
  }

  function logout(): void {
    token.value = ''
    user.value = null
    localStorage.removeItem('mall_token')
    localStorage.removeItem('mall_user')
  }

  async function fetchProfile(): Promise<ApiResponse<User>> {
    const res = await request.get<User>('/auth/profile')
    if (res.code === 200) {
      user.value = res.data
      localStorage.setItem('mall_user', JSON.stringify(res.data))
    }
    return res
  }

  async function login(form: LoginForm): Promise<ApiResponse<AuthResponse>> {
    const res = await request.post<AuthResponse>('/auth/login', form)
    if (res.code === 200) {
      setAuth(res.data.token, res.data.user)
    }
    return res
  }

  return { token, user, isLoggedIn, isAdmin, setAuth, logout, fetchProfile, login }
})