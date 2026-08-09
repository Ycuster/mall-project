import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
import type { ApiResponse } from '../types/api'

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 15000
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('mall_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: unknown) => Promise.reject(error)
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.code === 401) {
      localStorage.removeItem('mall_token')
      localStorage.removeItem('mall_user')
      ElMessage.error('登录已过期，请重新登录')
      router.push('/login')
      return Promise.reject(new Error('未授权'))
    }
    return res
  },
  (error: Error) => {
    ElMessage.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

const request = {
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

export default request