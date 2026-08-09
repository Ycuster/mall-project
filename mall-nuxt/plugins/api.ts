import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '~/types/api'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const tokenCookie = useCookie('mall_token')
  const userCookie = useCookie('mall_user')

  const service = axios.create({
    baseURL: import.meta.server
      ? (config.apiBase || 'http://localhost:3001/api')
      : 'http://localhost:3001/api',
    timeout: 15000
  })

  service.interceptors.request.use(
    (reqConfig) => {
      const token = tokenCookie.value
      if (token) {
        reqConfig.headers.Authorization = `Bearer ${token}`
      }
      return reqConfig
    },
    (error) => Promise.reject(error)
  )

  service.interceptors.response.use(
    (response) => {
      const res = response.data
      if (res.code === 401) {
        if (import.meta.client) {
          tokenCookie.value = ''
          userCookie.value = ''
          ElMessage.error('登录已过期，请重新登录')
          const userStore = useUserStore()
          userStore.logout()
          if (!['/login', '/'].includes(useRoute().path)) {
            navigateTo('/login')
          }
        }
        return Promise.reject(new Error('未授权'))
      }
      return res
    },
    (error) => {
      if (import.meta.client && error.response?.data?.message) {
        ElMessage.error(error.response.data.message)
      } else if (import.meta.client) {
        ElMessage.error(error.message || '网络错误')
      }
      return Promise.reject(error)
    }
  )

  const api = {
    get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
      return service.get(url, { params }) as Promise<ApiResponse<T>>
    },
    post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
      return service.post(url, data) as Promise<ApiResponse<T>>
    },
    put<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
      return service.put(url, data) as Promise<ApiResponse<T>>
    },
    delete<T = unknown>(url: string): Promise<ApiResponse<T>> {
      return service.delete(url) as Promise<ApiResponse<T>>
    }
  }

  nuxtApp.provide('api', api)
})