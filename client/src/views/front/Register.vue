<template>
  <div class="login-page">
    <el-card class="login-card" shadow="always">
      <h2 style="text-align: center; margin-bottom: 32px">创建账号</h2>

      <el-form :model="form" :rules="rules" ref="formRef" @keydown.enter="handleRegister">
        <el-form-item prop="username">
          <el-input v-model="form.username" size="large" placeholder="用户名 (3-20位)" prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" size="large" placeholder="密码 (不少于6位)"
            prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.nickname" size="large" placeholder="昵称 (选填)" prefix-icon="UserFilled" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" style="width: 100%" :loading="loading" @click="handleRegister">
            注 册
          </el-button>
        </el-form-item>
      </el-form>

      <div style="text-align: center; font-size: 0.9rem; color: #606266">
        已有账号？
        <router-link to="/login" style="color: #c0392b; font-weight: 500">去登录</router-link>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import request from '../../utils/request'
import { ElMessage } from 'element-plus'

const router = useRouter()
const formRef = ref()
const loading = ref(false)

const form = reactive({ username: '', password: '', nickname: '' })
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不少于6位', trigger: 'blur' }
  ]
}

async function handleRegister() {
  await formRef.value.validate()
  loading.value = true
  const res = await request.post('/auth/register', form)
  if (res.code === 200) {
    ElMessage.success('注册成功，请登录')
    router.push('/login')
  } else {
    ElMessage.error(res.message || '注册失败')
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