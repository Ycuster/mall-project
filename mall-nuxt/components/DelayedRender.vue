<template>
  <div v-if="mounted" style="display: contents">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>