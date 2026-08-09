<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-weight: 600">分类管理</span>
        <el-button type="primary" @click="openDialog()"><el-icon><Plus /></el-icon> 添加分类</el-button>
      </div>
    </template>

    <el-table :data="list" v-loading="loading" stripe>
      <el-table-column label="图标" width="80" align="center">
        <template #default="{ row }">
          <span style="font-size: 1.5rem">{{ row.icon || '📦' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" />
      <el-table-column label="排序" prop="sort_order" width="80" align="center" sortable />
      <el-table-column label="状态" width="80" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" size="small">{{ row.status ? '启用' : '禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <el-button type="primary" text size="small" @click="openDialog(row)">编辑</el-button>
          <el-popconfirm title="确定删除？" @confirm="handleDelete(row.id)">
            <template #reference><el-button type="danger" text size="small">删除</el-button></template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑分类' : '添加分类'" width="480px" destroy-on-close>
      <el-form :model="form" label-width="60px">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="图标"><el-input v-model="form.icon" placeholder="如 📱 💻 🏠" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort_order" :min="0" /></el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-text="启用" inactive-text="禁用" />
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
import request from '../../utils/request'
import { ElMessage } from 'element-plus'
import type { Category } from '../../types/product'

const list = ref<Category[]>([])
const loading = ref<boolean>(false)
const dialogVisible = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const editId = ref<number | null>(null)
const saving = ref<boolean>(false)

interface CategoryForm {
  name: string
  icon: string
  sort_order: number
  status: number
}

const form = reactive<CategoryForm>({ name: '', icon: '', sort_order: 0, status: 1 })

async function load(): Promise<void> {
  loading.value = true
  const res = await request.get<Category[]>('/categories/all')
  if (res.code === 200) list.value = res.data
  loading.value = false
}

function openDialog(row?: Category): void {
  if (row) {
    isEdit.value = true; editId.value = row.id
    Object.assign(form, row)
  } else {
    isEdit.value = false; editId.value = null
    Object.assign(form, { name: '', icon: '', sort_order: 0, status: 1 })
  }
  dialogVisible.value = true
}

async function handleSave(): Promise<void> {
  if (!form.name) { ElMessage.warning('请输入名称'); return }
  saving.value = true
  const fn = isEdit.value
    ? request.put<null>('/categories/' + editId.value, form)
    : request.post<null>('/categories', form)
  const res = await fn
  if (res.code === 200) { ElMessage.success('保存成功'); dialogVisible.value = false; load() }
  else ElMessage.error(res.message || '操作失败')
  saving.value = false
}

async function handleDelete(id: number): Promise<void> {
  const res = await request.delete<null>('/categories/' + id)
  if (res.code === 200) { ElMessage.success('已删除'); load() }
  else ElMessage.error(res.message || '删除失败')
}

onMounted(load)
</script>