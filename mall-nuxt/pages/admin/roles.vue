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
      <el-table-column label="描述" prop="description" min-width="160" show-overflow-tooltip />
      <el-table-column label="权限数" width="80" align="center">
        <template #default="{ row }">
          <el-tag :type="row.permissions?.length ? 'success' : 'info'" size="small">
            {{ row.permissions?.length || 0 }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="权限概览" min-width="320">
        <template #default="{ row }">
          <template v-for="(perms, resource) in groupPermissions(row.permissions || [])" :key="resource">
            <el-tag size="small" style="margin: 2px 4px 2px 0; font-weight: 600">
              {{ resourceLabel(resource as string) }}
            </el-tag>
            <el-tag
              v-for="p in perms"
              :key="p.id"
              size="small"
              type="info"
              style="margin: 2px"
            >
              {{ actionLabel(p.action) }}
            </el-tag>
          </template>
          <el-tag v-if="!row.permissions?.length" size="small" type="warning">无权限</el-tag>
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

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑角色' : '添加角色'" width="720px" destroy-on-close @opened="onDialogOpened">
      <el-form :model="form" label-width="100px" :rules="formRules" ref="formRef">
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
          <div class="perm-assign-tip">
            为此角色勾选允许执行的操作，未勾选的操作该角色下的用户将无法访问
          </div>
          <div v-loading="permLoading" class="perm-tree-wrapper">
            <el-tree
              v-if="permissionTree.length"
              ref="treeRef"
              :data="permissionTree"
              show-checkbox
              check-strictly
              node-key="id"
              :default-expand-all="true"
              :props="{ label: 'label', children: 'children' }"
              @check="handleCheckChange"
            />
            <div v-else class="perm-empty">
              <ClientOnly><el-icon :size="32" color="#c0c4cc"><WarningFilled /></el-icon></ClientOnly>
              <p>暂无可分配的权限</p>
              <p class="perm-empty-hint">请确认后端已初始化权限数据（重启服务可自动生成种子数据）</p>
            </div>
          </div>
          <div class="perm-assign-summary">
            已选 <span class="perm-count">{{ form.permission_ids.length }}</span> 项权限
            <span v-if="!form.permission_ids.length && permissionTree.length" class="perm-warning">（该角色将无法访问任何后台功能）</span>
          </div>
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
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { WarningFilled } from '@element-plus/icons-vue'
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
const pendingCheckedKeys = ref<number[]>([])
const permLoading = ref<boolean>(false)

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

function groupPermissions(perms: Permission[]): Record<string, Permission[]> {
  const groups: Record<string, Permission[]> = {}
  for (const p of perms) {
    if (!groups[p.resource]) groups[p.resource] = []
    groups[p.resource].push(p)
  }
  return groups
}

function resourceLabel(r: string): string {
  const map: Record<string, string> = {
    dashboard: '数据看板', product: '商品管理', category: '分类管理',
    order: '订单管理', user: '用户管理', role: '角色权限'
  }
  return map[r] || r
}

function actionLabel(a: string): string {
  const map: Record<string, string> = {
    read: '查看', write: '编辑', delete: '删除',
    ship: '发货', cancel: '取消', manage: '管理'
  }
  return map[a] || a
}

const permissionTree = computed(() => {
  const groups: Record<string, { id: string; label: string; children: Array<{ id: number; label: string }> }> = {}
  for (const p of allPermissions.value) {
    if (!groups[p.resource]) {
      groups[p.resource] = { id: `__${p.resource}`, label: resourceLabel(p.resource), children: [] }
    }
    groups[p.resource].children.push({
      id: p.id,
      label: `${actionLabel(p.action)} — ${p.display_name}`
    })
  }
  return Object.values(groups)
})

async function load(): Promise<void> {
  loading.value = true
  permLoading.value = true
  const { $api } = useNuxtApp()
  try {
    const [roleRes, permRes] = await Promise.all([
      $api.get<Role[]>('/roles'),
      $api.get<Permission[]>('/roles/permissions')
    ])
    if (roleRes.code === 200) list.value = roleRes.data
    if (permRes.code === 200) allPermissions.value = permRes.data
  } catch (e) {
    console.error('加载角色/权限数据失败:', e)
  }
  loading.value = false
  permLoading.value = false
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
  pendingCheckedKeys.value = [...form.permission_ids]
  dialogVisible.value = true
}

function onDialogOpened(): void {
  nextTick(() => {
    if (treeRef.value && pendingCheckedKeys.value.length) {
      treeRef.value.setCheckedKeys(pendingCheckedKeys.value)
    }
  })
}

function handleCheckChange(): void {
  const checked = treeRef.value?.getCheckedKeys() || []
  form.permission_ids = checked.filter((k: number | string) => typeof k === 'number' && k > 0)
}

async function handleSave(): Promise<void> {
  await formRef.value.validate()

  if (!form.permission_ids.length) {
    try {
      await ElMessageBox.confirm(
        '该角色未分配任何权限，保存后该角色下的用户将无法访问任何后台功能。确定继续？',
        '权限分配提醒',
        { confirmButtonText: '确定保存', cancelButtonText: '返回修改', type: 'warning' }
      )
    } catch {
      return
    }
  }

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

<style scoped>
.perm-assign-tip {
  font-size: 0.85rem;
  color: #909399;
  margin-bottom: 8px;
  line-height: 1.5;
}

.perm-tree-wrapper {
  min-height: 180px;
  max-height: 320px;
  overflow-y: auto;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 12px;
  background: #fafafa;
}

.perm-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  color: #909399;
}

.perm-empty p {
  margin: 8px 0 0;
  font-size: 0.95rem;
}

.perm-empty-hint {
  font-size: 0.8rem !important;
  color: #c0c4cc !important;
}

.perm-assign-summary {
  margin-top: 8px;
  font-size: 0.85rem;
  color: #606266;
}

.perm-count {
  color: #c0392b;
  font-weight: 700;
  font-size: 1rem;
}

.perm-warning {
  color: #e6a23c;
  margin-left: 8px;
}
</style>