<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-weight: 600">用户管理</span>
        <el-input
          v-model="keyword"
          placeholder="搜索用户名/邮箱/手机..."
          clearable
          style="width: 240px"
          @keydown.enter="load(1)"
          @clear="load(1)"
        />
      </div>
    </template>

    <el-table :data="list" v-loading="loading" stripe>
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="用户名" prop="username" width="140" />
      <el-table-column label="昵称" prop="nickname" width="140" />
      <el-table-column label="邮箱" prop="email" min-width="180" show-overflow-tooltip />
      <el-table-column label="手机" prop="phone" width="130" />
      <el-table-column label="角色" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="row.role === 'admin' ? 'danger' : ''" size="small">
            {{ row.role === 'admin' ? '管理员' : '普通用户' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @change="(val: number) => toggleStatus(row.id, val)"
          />
        </template>
      </el-table-column>
      <el-table-column label="注册时间" prop="created_at" width="170" />
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" text size="small" @click="openDialog(row)">编辑</el-button>
          <el-popconfirm title="确定删除？" @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button type="danger" text size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="display: flex; justify-content: center; margin-top: 20px">
      <el-pagination
        v-model:current-page="page"
        :page-size="10"
        :total="total"
        layout="total, prev, pager, next"
        @current-change="load"
      />
    </div>

    <el-dialog v-model="dialogVisible" title="编辑用户" width="480px" destroy-on-close>
      <el-form :model="form" label-width="80px" :rules="formRules" ref="formRef">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" style="width: 100%">
            <el-option label="普通用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { User, UserRole } from '~/types/user'
import type { PageResult } from '~/types/api'

definePageMeta({ layout: 'admin' })

interface UserForm {
  username: string
  nickname: string
  email: string
  phone: string
  role: UserRole
  status: number
}

const list = ref<User[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const keyword = ref<string>('')
const loading = ref<boolean>(false)
const dialogVisible = ref<boolean>(false)
const editId = ref<number | null>(null)
const saving = ref<boolean>(false)
const formRef = ref()

const form = reactive<UserForm>({
  username: '', nickname: '', email: '', phone: '', role: 'user', status: 1
})

const formRules = {
  nickname: [{ max: 50, message: '昵称不能超过50个字符', trigger: 'blur' }],
  email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }]
}

async function load(p?: number): Promise<void> {
  if (p) page.value = p
  loading.value = true
  const { $api } = useNuxtApp()
  const params: Record<string, unknown> = { page: page.value, pageSize: 10, _admin: 1 }
  if (keyword.value) params.keyword = keyword.value
  const res = await $api.get<PageResult<User>>('/users', { params })
  if (res.code === 200) {
    list.value = res.data.list
    total.value = res.data.total
  }
  loading.value = false
}

function openDialog(row: User): void {
  editId.value = row.id
  form.username = row.username
  form.nickname = row.nickname
  form.email = row.email
  form.phone = row.phone
  form.role = row.role
  form.status = row.status
  dialogVisible.value = true
}

async function handleSave(): Promise<void> {
  await formRef.value?.validate()
  saving.value = true
  const { $api } = useNuxtApp()
  const res = await $api.put(`/users/${editId.value}`, {
    nickname: form.nickname,
    email: form.email,
    phone: form.phone,
    role: form.role,
    status: form.status
  })
  if (res.code === 200) {
    ElMessage.success('保存成功')
    dialogVisible.value = false
    await load()
  } else {
    ElMessage.error(res.message || '保存失败')
  }
  saving.value = false
}

async function handleDelete(id: number): Promise<void> {
  const { $api } = useNuxtApp()
  const res = await $api.delete(`/users/${id}`)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    await load()
  } else {
    ElMessage.error(res.message || '删除失败')
  }
}

async function toggleStatus(id: number, status: number): Promise<void> {
  const { $api } = useNuxtApp()
  const res = await $api.put(`/users/${id}`, { status })
  if (res.code !== 200) {
    ElMessage.error(res.message || '更新失败')
  }
}

onMounted(() => load())
</script>