<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-weight: 600">角色管理</span>
        <div style="display: flex; gap: 10px">
          <el-input v-model="keyword" placeholder="搜索角色..." clearable style="width: 200px"
            @keydown.enter="load(1)" @clear="load(1)" />
          <el-button type="primary" @click="openDialog()">
            <ClientOnly><el-icon><Plus /></el-icon></ClientOnly> 新增角色
          </el-button>
        </div>
      </div>
    </template>

    <el-table :data="list" v-loading="loading" stripe>
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="角色名称" prop="name" width="150" />
      <el-table-column label="角色编码" prop="code" width="180" />
      <el-table-column label="描述" prop="description" min-width="200" show-overflow-tooltip />
      <el-table-column label="权限数" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small">{{ row.permissions?.length || 0 }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0"
            :disabled="row.code === 'super_admin'"
            @change="(val: number) => toggleStatus(row.id, val)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" text size="small" @click="openDialog(row)">编辑</el-button>
          <el-button type="warning" text size="small" @click="openPermissionDialog(row)">
            分配权限
          </el-button>
          <el-popconfirm
            v-if="row.code !== 'super_admin'"
            title="确定删除？删除后相关角色权限关联也会移除"
            @confirm="handleDelete(row.id)"
          >
            <template #reference>
              <el-button type="danger" text size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="display: flex; justify-content: center; margin-top: 20px">
      <el-pagination v-model:current-page="page" :page-size="20" :total="total"
        layout="total, prev, pager, next" @current-change="load" />
    </div>

    <!-- 角色编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑角色' : '新增角色'" width="520px" destroy-on-close>
      <el-form :model="form" label-width="80px" :rules="formRules" ref="formRef">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code" :disabled="isEdit" placeholder="英文，如 operator" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" :rows="2" />
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

    <!-- 权限分配弹窗 -->
    <el-dialog v-model="permDialogVisible" :title="`为「${currentRole?.name}」分配权限`" width="720px" destroy-on-close>
      <div v-loading="permLoading">
        <div v-for="(group, gKey) in permissionGroups" :key="gKey" class="perm-group">
          <div class="perm-group__header">
            <el-checkbox
              :model-value="isGroupAllChecked(group)"
              :indeterminate="isGroupIndeterminate(group)"
              @change="toggleGroup(group, $event)"
            >
              <strong>{{ groupLabelMap[gKey] || gKey }}</strong>
            </el-checkbox>
          </div>
          <div class="perm-group__items">
            <el-checkbox
              v-for="p in group"
              :key="p.id"
              :model-value="selectedPermissionIds.includes(p.id)"
              @change="togglePermission(p.id)"
              :disabled="p.type === 'api'"
            >
              {{ p.name }}
              <el-tag v-if="p.type === 'menu'" size="small" type="info" style="margin-left: 4px">菜单</el-tag>
              <el-tag v-else-if="p.type === 'button'" size="small" type="warning" style="margin-left: 4px">按钮</el-tag>
              <el-tag v-else size="small" style="margin-left: 4px">接口</el-tag>
            </el-checkbox>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="permDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="permSaving" @click="handleSavePermissions">保存权限</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { usePermissionStore } from '~/stores/permission'

definePageMeta({ layout: 'admin' })

const permissionStore = usePermissionStore()

interface Role {
  id: number
  name: string
  code: string
  description: string
  status: number
  permissions?: { id: number; code: string }[]
}

interface PermissionItem {
  id: number
  code: string
  name: string
  module: string
  type: string
}

const list = ref<Role[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const keyword = ref<string>('')
const loading = ref<boolean>(false)
const saving = ref<boolean>(false)
const formRef = ref()

const dialogVisible = ref<boolean>(false)
const isEdit = ref<boolean>(false)
const editId = ref<number | null>(null)

const form = reactive({ name: '', code: '', description: '', status: 1 })

const formRules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }]
}

// 权限分配
const permDialogVisible = ref<boolean>(false)
const permLoading = ref<boolean>(false)
const permSaving = ref<boolean>(false)
const currentRole = ref<Role | null>(null)
const selectedPermissionIds = ref<number[]>([])
const allPermissions = ref<PermissionItem[]>([])

const groupLabelMap: Record<string, string> = {
  dashboard: '数据看板',
  product: '商品管理',
  category: '分类管理',
  order: '订单管理',
  user: '用户管理',
  role: '角色管理',
  upload: '文件上传',
  front: '前台功能'
}

const permissionGroups = computed<Record<string, PermissionItem[]>>(() => {
  const groups: Record<string, PermissionItem[]> = {}
  for (const p of allPermissions.value) {
    if (!groups[p.module]) groups[p.module] = []
    groups[p.module].push(p)
  }
  return groups
})

function isGroupAllChecked(group: PermissionItem[]): boolean {
  return group.every(p => selectedPermissionIds.value.includes(p.id))
}

function isGroupIndeterminate(group: PermissionItem[]): boolean {
  const checked = group.filter(p => selectedPermissionIds.value.includes(p.id)).length
  return checked > 0 && checked < group.length
}

function toggleGroup(group: PermissionItem[], checked: boolean): void {
  const ids = group.map(p => p.id)
  if (checked) {
    selectedPermissionIds.value = [...new Set([...selectedPermissionIds.value, ...ids])]
  } else {
    selectedPermissionIds.value = selectedPermissionIds.value.filter(id => !ids.includes(id))
  }
}

function togglePermission(id: number): void {
  const idx = selectedPermissionIds.value.indexOf(id)
  if (idx > -1) {
    selectedPermissionIds.value.splice(idx, 1)
  } else {
    selectedPermissionIds.value.push(id)
  }
}

async function load(p?: number): Promise<void> {
  if (p) page.value = p
  loading.value = true
  const { $api } = useNuxtApp()
  const params: Record<string, unknown> = { page: page.value, pageSize: 20, _admin: 1 }
  if (keyword.value) params.keyword = keyword.value
  const res = await $api.get<any>('/rbac/roles', { params })
  if (res.code === 200) {
    list.value = res.data.list
    total.value = res.data.total
  }
  loading.value = false
}

function openDialog(row?: Role): void {
  isEdit.value = !!row
  editId.value = row?.id || null
  if (row) {
    form.name = row.name
    form.code = row.code
    form.description = row.description || ''
    form.status = row.status
  } else {
    form.name = ''
    form.code = ''
    form.description = ''
    form.status = 1
  }
  dialogVisible.value = true
}

async function handleSave(): Promise<void> {
  await formRef.value?.validate()
  saving.value = true
  const { $api } = useNuxtApp()
  const fn = isEdit.value
    ? $api.put(`/rbac/roles/${editId.value}`, { ...form })
    : $api.post('/rbac/roles', { ...form })
  const res = await fn
  if (res.code === 200) {
    ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
    dialogVisible.value = false
    load()
  } else {
    ElMessage.error(res.message || '操作失败')
  }
  saving.value = false
}

async function handleDelete(id: number): Promise<void> {
  const { $api } = useNuxtApp()
  const res = await $api.delete(`/rbac/roles/${id}`)
  if (res.code === 200) { ElMessage.success('删除成功'); load() }
  else ElMessage.error(res.message || '删除失败')
}

async function toggleStatus(id: number, status: number): Promise<void> {
  const { $api } = useNuxtApp()
  const res = await $api.put(`/rbac/roles/${id}`, { status })
  if (res.code !== 200) ElMessage.error(res.message || '更新失败')
}

async function openPermissionDialog(row: Role): Promise<void> {
  currentRole.value = row
  selectedPermissionIds.value = row.permissions?.map(p => p.id) || []
  permLoading.value = true

  const { $api } = useNuxtApp()
  const res = await $api.get<any>('/rbac/permissions')
  if (res.code === 200) {
    allPermissions.value = res.data.list
  }

  // 如果列表中没有权限详情，单独获取
  if (!row.permissions || row.permissions.length === 0) {
    const detailRes = await $api.get<any>(`/rbac/roles/${row.id}`)
    if (detailRes.code === 200 && detailRes.data.permissions) {
      selectedPermissionIds.value = detailRes.data.permissions.map((p: { id: number }) => p.id)
    }
  }

  permLoading.value = false
  permDialogVisible.value = true
}

async function handleSavePermissions(): Promise<void> {
  if (!currentRole.value) return
  permSaving.value = true
  const { $api } = useNuxtApp()
  const res = await $api.put(`/rbac/roles/${currentRole.value.id}`, {
    permission_ids: selectedPermissionIds.value
  })
  if (res.code === 200) {
    ElMessage.success('权限分配成功')
    permDialogVisible.value = false
    load()
  } else {
    ElMessage.error(res.message || '操作失败')
  }
  permSaving.value = false
}

onMounted(load)
</script>

<style scoped>
.perm-group {
  margin-bottom: 16px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
}
.perm-group__header {
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}
.perm-group__items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}
</style>
