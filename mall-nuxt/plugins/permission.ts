import { usePermissionStore } from '~/stores/permission'

type PermissionValue = string | string[]

export default defineNuxtPlugin((nuxtApp) => {
  const directive = {
    mounted(el: HTMLElement, binding: { value: PermissionValue; modifiers: { any?: boolean } }) {
      checkPermission(el, binding.value, binding.modifiers)
    },
    updated(el: HTMLElement, binding: { value: PermissionValue; modifiers: { any?: boolean } }) {
      checkPermission(el, binding.value, binding.modifiers)
    }
  }

  function checkPermission(el: HTMLElement, value: PermissionValue, modifiers: { any?: boolean }) {
    const store = usePermissionStore()
    if (!value) return

    const has = modifiers.any
      ? store.hasPermission(value as string[])
      : store.hasAllPermissions(Array.isArray(value) ? value : [value])

    if (!has && !store.isSuperAdmin) {
      el.parentNode?.removeChild(el)
    }
  }

  nuxtApp.vueApp.directive('permission', directive)
})
