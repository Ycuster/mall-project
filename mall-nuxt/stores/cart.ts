import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { CartItem } from '~/types/cart'
import type { ApiResponse } from '~/types/api'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const loading = ref<boolean>(false)

  const totalCount = computed<number>(() =>
    items.value.reduce((s: number, i: CartItem) => s + i.quantity, 0)
  )
  const totalAmount = computed<number>(() =>
    items.value.reduce((s: number, i: CartItem) => s + i.price * i.quantity, 0)
  )

  const selectedItems = ref<CartItem[]>([])
  const selectedAmount = computed<number>(() =>
    selectedItems.value.reduce((s: number, i: CartItem) => s + i.price * i.quantity, 0)
  )

  async function fetch(): Promise<void> {
    loading.value = true
    const { $api } = useNuxtApp()
    const res = await $api.get<CartItem[]>('/cart')
    if (res.code === 200) items.value = res.data
    loading.value = false
  }

  async function add(productId: number | string, quantity: number = 1): Promise<boolean> {
    const { $api } = useNuxtApp()
    const res = await $api.post<null>('/cart', { product_id: Number(productId), quantity })
    if (res.code === 200) {
      ElMessage.success(res.message || '已加入购物车')
      await fetch()
      return true
    } else {
      ElMessage.error(res.message || '操作失败')
      return false
    }
  }

  async function updateQuantity(id: number, quantity: number): Promise<void> {
    const { $api } = useNuxtApp()
    await $api.put<null>(`/cart/${id}`, { quantity })
    await fetch()
  }

  async function remove(id: number): Promise<void> {
    const { $api } = useNuxtApp()
    await $api.delete<null>(`/cart/${id}`)
    await fetch()
  }

  async function clear(): Promise<void> {
    const { $api } = useNuxtApp()
    await $api.delete<null>('/cart')
    items.value = []
  }

  return { items, loading, totalCount, totalAmount, selectedItems, selectedAmount, fetch, add, updateQuantity, remove, clear }
})