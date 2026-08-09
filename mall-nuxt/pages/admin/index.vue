<template>
  <div class="admin-redirect">
    <ClientOnly><el-icon class="spinning"><Loading /></el-icon></ClientOnly>
    <span>正在跳转...</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { ElMessage } from 'element-plus'

definePageMeta({ layout: 'admin' })

const userStore = useUserStore()

onMounted(() => {
  if (!userStore.isLoggedIn) {
    navigateTo('/login?redirect=/admin')
    return
  }
  if (!userStore.isAdmin) {
    ElMessage.error('无权限访问管理后台')
    navigateTo('/')
    return
  }
  navigateTo('/admin/dashboard')
})
</script>

<style scoped>
.admin-redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 16px;
  color: #909399;
  font-size: 0.9rem;
}

.spinning {
  font-size: 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>