import { usePermissionStore } from '~/stores/permission'

export function usePermission() {
  const store = usePermissionStore()

  function check(code: string | string[], mode: 'all' | 'any' = 'any'): boolean {
    if (mode === 'any') return store.hasPermission(code)
    return store.hasAllPermissions(Array.isArray(code) ? code : [code])
  }

  function checkModule(moduleName: string): boolean {
    return store.hasModule(moduleName)
  }

  function checkRole(roleCode: string | string[]): boolean {
    return store.hasRole(roleCode)
  }

  return {
    hasPermission: store.hasPermission.bind(store),
    hasAllPermissions: store.hasAllPermissions.bind(store),
    hasModule: store.hasModule.bind(store),
    hasRole: store.hasRole.bind(store),
    check,
    checkModule,
    checkRole,
    isSuperAdmin: store.isSuperAdmin,
    codes: store.codes,
    modules: store.modules,
    menus: store.menus
  }
}
