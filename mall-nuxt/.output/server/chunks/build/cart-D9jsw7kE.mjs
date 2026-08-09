import { g as defineStore, u as useNuxtApp } from './server.mjs';
import { ref, computed } from 'vue';

const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  const loading = ref(false);
  const totalCount = computed(
    () => items.value.reduce((s, i) => s + i.quantity, 0)
  );
  const totalAmount = computed(
    () => items.value.reduce((s, i) => s + i.price * i.quantity, 0)
  );
  async function fetch() {
    loading.value = true;
    const { $api } = useNuxtApp();
    const res = await $api.get("/cart");
    if (res.code === 200) items.value = res.data;
    loading.value = false;
  }
  async function add(productId, quantity = 1) {
    const { $api } = useNuxtApp();
    const res = await $api.post("/cart", { product_id: Number(productId), quantity });
    if (res.code === 200) {
      await fetch();
      return true;
    }
    return false;
  }
  async function updateQuantity(id, quantity) {
    const { $api } = useNuxtApp();
    await $api.put(`/cart/${id}`, { quantity });
    await fetch();
  }
  async function remove(id) {
    const { $api } = useNuxtApp();
    await $api.delete(`/cart/${id}`);
    await fetch();
  }
  async function clear() {
    const { $api } = useNuxtApp();
    await $api.delete("/cart");
    items.value = [];
  }
  return { items, loading, totalCount, totalAmount, fetch, add, updateQuantity, remove, clear };
});

export { useCartStore as u };
//# sourceMappingURL=cart-D9jsw7kE.mjs.map
