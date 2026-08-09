import type { ApiResponse } from '~/types/api'

declare module '#app' {
  interface NuxtApp {
    $api: {
      get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>>
      post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>
      put<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>
      delete<T = unknown>(url: string): Promise<ApiResponse<T>>
    }
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: {
      get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>>
      post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>
      put<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>
      delete<T = unknown>(url: string): Promise<ApiResponse<T>>
    }
  }
}

export {}