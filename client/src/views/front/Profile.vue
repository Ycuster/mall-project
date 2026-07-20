<template>
  <div class="page-container" style="max-width: 600px">
    <el-card shadow="never">
      <template #header><span style="font-size: 1.2rem; font-weight: 600">个人中心</span></template>

      <div style="text-align: center; margin-bottom: 24px">
        <el-avatar :size="80" style="background: #c0392b; font-size: 2rem; margin-bottom: 12px">
          {{ userStore.user?.nickname?.[0] || 'U' }}
        </el-avatar>
        <h3>{{ userStore.user?.nickname || userStore.user?.username }}</h3>
        <el-tag :type="userStore.isAdmin ? 'danger' : 'primary'" size="small">
          {{ userStore.isAdmin ? '管理员' : '普通用户' }}
        </el-tag>
      </div>

      <el-form :model="form" label-width="60px">
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useUserStore } from '../../stores/user'
import request from '../../utils/request'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const form = reactive({ nickname: '', email: '', phone: '' })

onMounted(async () => {
  const res = await userStore.fetchProfile()
  if (res.code === 200) {
    form.nickname = res.data.nickname || ''
    form.email = res.data.email || ''
    form.phone = res.data.phone || ''
  }
})

async function handleSave() {
  const res = await request.put('/auth/profile', form)
  if (res.code === 200) {
    ElMessage.success('保存成功')
    await userStore.fetchProfile()
  } else {
    ElMessage.error('保存失败')
  }
}
</script>