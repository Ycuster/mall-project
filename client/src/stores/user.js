import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '../utils/request'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('mall_token') || '')
  const user = ref(JSON.parse(localStorage.getItem('mall_user') || 'null'))

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function setAuth(t, u) {
    token.value = t
    user.value = u
    localStorage.setItem('mall_token', t)
    localStorage.setItem('mall_user', JSON.stringify(u))
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('mall_token')
    localStorage.removeItem('mall_user')
  }

  async function fetchProfile() {
    const res = await request.get('/auth/profile')
    if (res.code === 200) {
      user.value = res.data
      localStorage.setItem('mall_user', JSON.stringify(res.data))
    }
    return res
  }

  return { token, user, isLoggedIn, isAdmin, setAuth, logout, fetchProfile }
})