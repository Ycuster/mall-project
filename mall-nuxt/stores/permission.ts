import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ApiResponse } from '~/types/api'

export interface PermissionRoles {
  id: number
  code: string
  name: string
}

export interface PermissionData {
  codes: string[]
  modules: string[]
  types: Record<string, string[]>
}

export interface PermissionMenu {
  module: string
  menus: {
    id: number
    code: string
    name: string
    type: string
    route_path: string
    icon: string
  }[]
}

export interface PermissionTreeResponse {
  menus: PermissionMenu[]
  codes: string[]
  modules: string[]
  roles: PermissionRoles[]
}

export const usePermissionStore = defineStore('permission', () => {
  const codes = ref<string[]>([])
  const modules = ref<string[]>([])
  const types = ref<Record<string, string[]>>({})
  const menus = ref<PermissionMenu[]>([])
  const userRoles = ref<PermissionRoles[]>([])
  const loaded = ref<boolean>(false)

  const isSuperAdmin = computed<boolean>(() =>
    userRoles.value.some(r => r.code === 'super_admin')
  )

  function setPermissions(data: Partial<PermissionTreeResponse>): void {
    if (data.codes) codes.value = data.codes
    if (data.modules) modules.value = data.modules
    if ((data as any).types) types.value = (data as any).types
    if (data.menus) menus.value = data.menus
    if (data.roles) userRoles.value = data.roles
    loaded.value = true
  }

  function setFromLogin(data: {
    codes: string[]
    modules: string[]
    types: Record<string, string[]>
  }): void {
    codes.value = data.codes
    modules.value = data.modules
    types.value = data.types
    loaded.value = true
  }

  function hasPermission(code: string | string[]): boolean {
    if (isSuperAdmin.value) return true
    if (Array.isArray(code)) {
      return code.some(c => codes.value.includes(c))
    }
    return codes.value.includes(code)
  }

  function hasAllPermissions(codesList: string[]): boolean {
    if (isSuperAdmin.value) return true
    return codesList.every(c => codes.value.includes(c))
  }

  function hasModule(moduleName: string): boolean {
    if (isSuperAdmin.value) return true
    return modules.value.includes(moduleName)
  }

  function hasRole(roleCode: string | string[]): boolean {
    if (Array.isArray(roleCode)) {
      return roleCode.some(c => userRoles.value.some(r => r.code === c))
    }
    return userRoles.value.some(r => r.code === roleCode)
  }

  async function fetchPermissions(): Promise<void> {
    const { $api } = useNuxtApp()
    const res = await $api.get<PermissionTreeResponse>('/rbac/tree')
    if (res.code === 200) {
      setPermissions(res.data)
    }
  }

  function clear(): void {
    codes.value = []
    modules.value = []
    types.value = {}
    menus.value = []
    userRoles.value = []
    loaded.value = false
  }

  return {
    codes,
    modules,
    types,
    menus,
    userRoles,
    loaded,
    isSuperAdmin,
    setPermissions,
    setFromLogin,
    hasPermission,
    hasAllPermissions,
    hasModule,
    hasRole,
    fetchPermissions,
    clear
  }
})
