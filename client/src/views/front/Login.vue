<template>
  <div class="login-page">
    <el-card class="login-card" shadow="always">
      <h2 style="text-align: center; margin-bottom: 8px">欢迎回来</h2>
      <p style="text-align: center; color: #909399; margin-bottom: 32px">MallShop 商城系统</p>

      <el-form :model="form" :rules="rules" ref="formRef" @keydown.enter="handleLogin">
        <el-form-item prop="username">
          <el-input v-model="form.username" size="large" placeholder="用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" size="large" placeholder="密码"
            prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" style="width: 100%" :loading="loading" @click="handleLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>

      <div style="text-align: center; font-size: 0.9rem; color: #606266">
        还没有账号？
        <router-link to="/register" style="color: #c0392b; font-weight: 500">立即注册</router-link>
      </div>

      <el-divider />
      <div style="text-align: center; font-size: 0.8rem; color: #c0c4cc">
        管理员: admin / admin123 &nbsp;|&nbsp; 用户: test / test123
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { useCartStore } from '../../stores/cart'
import request from '../../utils/request'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const cartStore = useCartStore()
const formRef = ref()
const loading = ref(false)

const form = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

async function handleLogin() {
  await formRef.value.validate()
  loading.value = true
  const res = await request.post('/auth/login', form)
  if (res.code === 200) {
    userStore.setAuth(res.data.token, res.data.user)
    ElMessage.success('登录成功')
    await cartStore.fetch()
    const redirect = route.query.redirect || (res.data.user.role === 'admin' ? '/admin' : '/')
    router.push(redirect)
  } else {
    ElMessage.error(res.message || '登录失败')
  }
  loading.value = false
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 420px;
  border-radius: 16px;
  padding: 20px;
}
</style>