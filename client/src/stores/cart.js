import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '../utils/request'
import { ElMessage } from 'element-plus'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const loading = ref(false)

  const totalCount = computed(() => items.value.reduce((s, i) => s + i.quantity, 0))
  const totalAmount = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0))
  const selectedItems = ref([])
  const selectedAmount = computed(() => selectedItems.value.reduce((s, i) => s + i.price * i.quantity, 0))

  async function fetch() {
    loading.value = true
    const res = await request.get('/cart')
    if (res.code === 200) items.value = res.data
    loading.value = false
  }

  async function add(productId, quantity = 1) {
    const res = await request.post('/cart', { product_id: +productId, quantity })
    if (res.code === 200) {
      ElMessage.success(res.message || '已加入购物车')
      await fetch()
      return true
    } else {
      ElMessage.error(res.message || '操作失败')
      return false
    }
  }

  async function updateQuantity(id, quantity) {
    await request.put(`/cart/${id}`, { quantity })
    await fetch()
  }

  async function remove(id) {
    await request.delete(`/cart/${id}`)
    await fetch()
  }

  async function clear() {
    await request.delete('/cart')
    items.value = []
  }

  return { items, loading, totalCount, totalAmount, selectedItems, selectedAmount, fetch, add, updateQuantity, remove, clear }
})