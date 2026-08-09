<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from './stores/cart'
import { useUserStore } from './stores/user'

const userStore = useUserStore()
const cartStore = useCartStore()

onMounted(() => {
  if (userStore.isLoggedIn) cartStore.fetch()
})
</script>