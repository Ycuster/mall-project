<template>
  <div class="error-page">
    <el-result icon="warning" title="403" sub-title="抱歉，您没有权限访问此页面">
      <template #extra>
        <el-button type="primary" @click="navigateTo('/')">返回首页</el-button>
        <el-button v-if="userStore.isLoggedIn" @click="navigateTo('/login')">重新登录</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

definePageMeta({ layout: 'default' })

const userStore = useUserStore()

useSeoMeta({
  title: '无权限访问 - MallShop',
  description: '您没有权限访问此页面'
})
</script>

<style scoped>
.error-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
