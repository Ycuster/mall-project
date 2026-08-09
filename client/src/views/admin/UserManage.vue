<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-weight: 600">用户管理</span>
        <el-input v-model="keyword" placeholder="搜索用户名/昵称/邮箱/手机" clearable style="width: 280px"
          @keydown.enter="load(1)" @clear="load(1)" />
      </div>
    </template>

    <el-table :data="list" v-loading="loading" stripe>
      <el-table-column label="用户" min-width="160">
        <template #default="{ row }">
          <div style="display: flex; align-items: center; gap: 10px">
            <el-avatar :size="36" style="background: #c0392b; flex-shrink: 0">
              {{ (row.nickname || row.username)[0].toUpperCase() }}
            </el-avatar>
            <div>
              <div style="font-weight: 500">{{ row.username }}</div>
              <div style="font-size: 0.8rem; color: #909399">{{ row.nickname }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" width="180">
        <template #default="{ row }">{{ row.email || '-' }}</template>
      </el-table-column>
      <el-table-column label="手机" prop="phone" width="140">
        <template #default="{ row }">{{ row.phone || '-' }}</template>
      </el-table-column>
      <el-table-column label="角色" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="row.role === 'admin' ? 'danger' : 'primary'" size="small">
            {{ row.role === 'admin' ? '管理员' : '用户' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" size="small">
            {{ row.status ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="170">
        <template #default="{ row }">{{ new Date(row.created_at).toLocaleString() }}</template>
      </el-table-column>
      <el-table-column label="操作" width="140" fixed="right">
        <template #default="{ row }">
          <el-switch
            :model-value="row.status"
            :active-value="1"
            :inactive-value="0"
            active-text="正常"
            inactive-text="禁用"
            inline-prompt
            style="margin-right: 8px"
            @change="(val) => toggleStatus(row.id, val)"
          />
          <el-select :model-value="row.role" size="small" style="width: 80px" @change="(val) => changeRole(row.id, val)">
            <el-option label="用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </template>
      </el-table-column>
    </el-table>

    <div style="display: flex; justify-content: center; margin-top: 20px">
      <el-pagination v-model:current-page="page" :page-size="10" :total="total"
        layout="total, prev, pager, next" @current-change="load" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '../../utils/request'
import { ElMessage } from 'element-plus'
import type { User, UserRole } from '../../types/user'
import type { PageResult } from '../../types/api'

const list = ref<User[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const keyword = ref<string>('')
const loading = ref<boolean>(false)

async function load(p?: number): Promise<void> {
  if (p) page.value = p
  loading.value = true
  const res = await request.get<PageResult<User>>('/users', {
    params: { page: page.value, pageSize: 10, keyword: keyword.value }
  })
  if (res.code === 200) { list.value = res.data.list; total.value = res.data.total }
  loading.value = false
}

async function toggleStatus(id: number, status: number): Promise<void> {
  const res = await request.put<null>(`/users/${id}/status`, { status })
  if (res.code === 200) { ElMessage.success('已更新'); load() }
  else ElMessage.error(res.message || '操作失败')
}

async function changeRole(id: number, role: UserRole): Promise<void> {
  const res = await request.put<null>(`/users/${id}/role`, { role })
  if (res.code === 200) { ElMessage.success('已更新'); load() }
  else ElMessage.error(res.message || '操作失败')
}

onMounted(load)
</script>