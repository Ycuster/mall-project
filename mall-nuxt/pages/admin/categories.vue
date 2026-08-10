<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-weight: 600">分类管理</span>
        <el-button v-if="userStore.hasPermission('category', 'write')" type="primary" @click="openDialog()">
          <ClientOnly><el-icon><Plus /></el-icon></ClientOnly> 添加分类
        </el-button>
      </div>
    </template>

    <el-table :data="list" v-loading="loading" row-key="id" default-expand-all>
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="分类名称" prop="name" min-width="140" />
      <el-table-column label="图标" width="120">
        <template #default="{ row }">
          <span style="font-size: 1.4rem">{{ row.icon || '📦' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort_order" width="80" align="center" />
      <el-table-column label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0"
            @change="(val: number) => toggleStatus(row.id, val)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button v-if="userStore.hasPermission('category', 'write')" type="primary" text size="small" @click="openDialog(row)">编辑</el-button>
          <el-button v-if="userStore.hasPermission('category', 'write')" type="success" text size="small" @click="openDialog(row, true)">添加子分类</el-button>
          <el-popconfirm v-if="userStore.hasPermission('category', 'delete')" title="确定删除？" @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button type="danger" text size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑分类' : '添加分类'" width="480px" destroy-on-close>
      <el-form :model="form" label-width="80px" :rules="formRules" ref="formRef">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" placeholder="emoji 或图标字符" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort_order" :min="0" :max="999" />
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
import { useUserStore } from '~/stores/user'
import type { Category } from '~/types/product'
import type { ApiResponse } from '~/types/api'

definePageMeta({ layout: 'admin' })

const userStore = useUserStore()

interface CategoryForm {
  name: string
  icon: string
  sort_order: number
  status: number
  parent_id: number | null
}

const list = ref<Category[]>([])
const loading = ref<boolean>(false)
const dialogVisible = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const editId = ref<number | null>(null)
const saving = ref<boolean>(false)
const formRef = ref()

const form = reactive<CategoryForm>({
  name: '', icon: '', sort_order: 0, status: 1, parent_id: null
})

const formRules = {
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
}

async function load(): Promise<void> {
  loading.value = true
  try {
    const { $api } = useNuxtApp()
    const res = await $api.get<Category[]>('/categories', { _admin: 1 })
    if (res.code === 200) list.value = res.data
  } catch {}
  loading.value = false
}

function openDialog(row?: Category, asChild = false): void {
  isEdit.value = !!row && !asChild
  editId.value = row && !asChild ? row.id : null
  form.name = row && !asChild ? row.name : ''
  form.icon = row && !asChild ? row.icon : ''
  form.sort_order = row && !asChild ? row.sort_order : 0
  form.status = row && !asChild ? row.status : 1
  form.parent_id = asChild && row ? row.id : null
  dialogVisible.value = true
}

async function handleSave(): Promise<void> {
  await formRef.value.validate()
  saving.value = true
  const { $api } = useNuxtApp()
  let res: ApiResponse<unknown>
  if (isEdit.value && editId.value) {
    res = await $api.put(`/categories/${editId.value}`, form)
  } else {
    res = await $api.post('/categories', form)
  }
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
  const res = await $api.delete(`/categories/${id}`)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    await load()
  } else {
    ElMessage.error(res.message || '删除失败')
  }
}

async function toggleStatus(id: number, status: number): Promise<void> {
  const { $api } = useNuxtApp()
  const res = await $api.put(`/categories/${id}`, { status })
  if (res.code !== 200) {
    ElMessage.error(res.message || '更新失败')
  }
}

onMounted(() => load())
</script>