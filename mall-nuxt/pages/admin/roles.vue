<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-weight: 600">角色权限管理</span>
        <el-button type="primary" @click="openDialog()">
          <ClientOnly><el-icon><Plus /></el-icon></ClientOnly> 添加角色
        </el-button>
      </div>
    </template>

    <el-table :data="list" v-loading="loading" stripe>
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="角色标识" prop="name" width="160" />
      <el-table-column label="显示名称" prop="display_name" width="140" />
      <el-table-column label="描述" prop="description" min-width="200" show-overflow-tooltip />
      <el-table-column label="权限数" width="80" align="center">
        <template #default="{ row }">{{ row.permissions?.length || 0 }}</template>
      </el-table-column>
      <el-table-column label="权限概览" min-width="300">
        <template #default="{ row }">
          <el-tag
            v-for="p in (row.permissions || []).slice(0, 5)"
            :key="p.id"
            size="small"
            style="margin: 2px"
          >
            {{ p.name }}
          </el-tag>
          <el-tag v-if="(row.permissions || []).length > 5" size="small" type="info" style="margin: 2px">
            +{{ row.permissions.length - 5 }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" text size="small" @click="openDialog(row)">编辑</el-button>
          <el-popconfirm title="确定删除此角色？" @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button type="danger" text size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑角色' : '添加角色'" width="680px" destroy-on-close>
      <el-form :model="form" label-width="90px" :rules="formRules" ref="formRef">
        <el-form-item label="角色标识" prop="name">
          <el-input v-model="form.name" :disabled="isEdit" placeholder="如 product_manager" />
        </el-form-item>
        <el-form-item label="显示名称" prop="display_name">
          <el-input v-model="form.display_name" placeholder="如 商品管理员" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="权限分配" prop="permission_ids">
          <el-tree
            ref="treeRef"
            :data="permissionTree"
            show-checkbox
            node-key="id"
            :default-checked-keys="form.permission_ids"
            :props="{ label: 'label', children: 'children' }"
            @check="handleCheckChange"
          />
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
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { Role, Permission } from '~/types/user'
import type { ApiResponse } from '~/types/api'

definePageMeta({ layout: 'admin' })

const list = ref<Role[]>([])
const allPermissions = ref<Permission[]>([])
const loading = ref<boolean>(false)
const dialogVisible = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const editId = ref<number | null>(null)
const saving = ref<boolean>(false)
const formRef = ref()
const treeRef = ref()

interface RoleForm {
  name: string
  display_name: string
  description: string
  permission_ids: number[]
}

const form = reactive<RoleForm>({
  name: '', display_name: '', description: '', permission_ids: []
})

const formRules = {
  name: [{ required: true, message: '请输入角色标识', trigger: 'blur' }],
  display_name: [{ required: true, message: '请输入显示名称', trigger: 'blur' }]
}

const permissionTree = computed(() => {
  const groups: Record<string, { id: number; label: string; children: Array<{ id: number; label: string }> }> = {}
  for (const p of allPermissions.value) {
    if (!groups[p.resource]) {
      groups[p.resource] = { id: -Math.abs(hashCode(p.resource)), label: resourceLabel(p.resource), children: [] }
    }
    groups[p.resource].children.push({ id: p.id, label: `${p.action} (${p.display_name})` })
  }
  return Object.values(groups)
})

function hashCode(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0
  return h
}

function resourceLabel(r: string): string {
  const map: Record<string, string> = {
    dashboard: '数据看板', product: '商品管理', category: '分类管理',
    order: '订单管理', user: '用户管理', role: '角色权限'
  }
  return map[r] || r
}

async function load(): Promise<void> {
  loading.value = true
  const { $api } = useNuxtApp()
  const [roleRes, permRes] = await Promise.all([
    $api.get<Role[]>('/roles'),
    $api.get<Permission[]>('/roles/permissions')
  ])
  if (roleRes.code === 200) list.value = roleRes.data
  if (permRes.code === 200) allPermissions.value = permRes.data
  loading.value = false
}

function openDialog(row?: Role): void {
  if (row) {
    isEdit.value = true
    editId.value = row.id
    form.name = row.name
    form.display_name = row.display_name
    form.description = row.description || ''
    form.permission_ids = row.permissions?.map(p => p.id) || []
  } else {
    isEdit.value = false
    editId.value = null
    form.name = ''
    form.display_name = ''
    form.description = ''
    form.permission_ids = []
  }
  dialogVisible.value = true
}

function handleCheckChange(): void {
  const checked = treeRef.value?.getCheckedKeys(false) || []
  form.permission_ids = checked.filter((k: number) => k > 0)
}

async function handleSave(): Promise<void> {
  await formRef.value.validate()
  saving.value = true
  const { $api } = useNuxtApp()
  let res: ApiResponse<unknown>
  if (isEdit.value && editId.value) {
    res = await $api.put(`/roles/${editId.value}`, {
      display_name: form.display_name,
      description: form.description,
      permission_ids: form.permission_ids
    })
  } else {
    res = await $api.post('/roles', {
      name: form.name,
      display_name: form.display_name,
      description: form.description,
      permission_ids: form.permission_ids
    })
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
  const res = await $api.delete(`/roles/${id}`)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    await load()
  } else {
    ElMessage.error(res.message || '删除失败')
  }
}

onMounted(() => load())
</script>