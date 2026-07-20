<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-weight: 600">订单管理</span>
        <el-select v-model="statusFilter" placeholder="全部状态" clearable style="width: 160px" @change="load(1)">
          <el-option v-for="(v, k) in statusMap" :key="k" :label="v" :value="k" />
        </el-select>
      </div>
    </template>

    <el-table :data="list" v-loading="loading" stripe>
      <el-table-column label="订单号" width="180" show-overflow-tooltip>
        <template #default="{ row }">
          <el-text style="font-family: monospace">{{ row.order_no }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="用户" width="120">
        <template #default="{ row }">{{ row.nickname || row.username }}</template>
      </el-table-column>
      <el-table-column label="金额" width="110" align="center">
        <template #default="{ row }">
          <span class="text-price">¥{{ Number(row.total_amount).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收货人" min-width="160">
        <template #default="{ row }">
          {{ row.receiver_name }} · {{ row.receiver_phone }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="statusType[row.status]" size="small">{{ statusMap[row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="170">
        <template #default="{ row }">{{ new Date(row.created_at).toLocaleString() }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" text size="small" @click="viewDetail(row)">详情</el-button>
          <el-select
            v-if="!['completed','cancelled'].includes(row.status)"
            :model-value="row.status"
            size="small"
            style="width: 110px"
            @change="(val) => updateStatus(row.id, val)"
          >
            <el-option v-for="s in getNextStatuses(row.status)" :key="s" :label="'→ ' + statusMap[s]" :value="s" />
          </el-select>
        </template>
      </el-table-column>
    </el-table>

    <div style="display: flex; justify-content: center; margin-top: 20px">
      <el-pagination v-model:current-page="page" :page-size="10" :total="total"
        layout="total, prev, pager, next" @current-change="load" />
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" title="订单详情" width="640px">
      <template v-if="detail">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="订单号" :span="2">{{ detail.order_no }}</el-descriptions-item>
          <el-descriptions-item label="用户">{{ detail.nickname || detail.username }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="statusType[detail.status]">{{ statusMap[detail.status] }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="收货人">{{ detail.receiver_name }}</el-descriptions-item>
          <el-descriptions-item label="电话">{{ detail.receiver_phone }}</el-descriptions-item>
          <el-descriptions-item label="地址" :span="2">{{ detail.receiver_address }}</el-descriptions-item>
          <el-descriptions-item v-if="detail.remark" label="备注" :span="2">{{ detail.remark }}</el-descriptions-item>
        </el-descriptions>

        <h4 style="margin: 20px 0 12px">商品明细</h4>
        <el-table :data="detail.items" size="small" border>
          <el-table-column label="商品" prop="product_name" />
          <el-table-column label="单价" width="100" align="center">
            <template #default="{ row }">¥{{ Number(row.price).toFixed(2) }}</template>
          </el-table-column>
          <el-table-column label="数量" prop="quantity" width="80" align="center" />
          <el-table-column label="小计" width="100" align="center">
            <template #default="{ row }">¥{{ (row.price * row.quantity).toFixed(2) }}</template>
          </el-table-column>
        </el-table>

        <div style="text-align: right; margin-top: 16px; font-size: 1.1rem">
          总计: <span class="text-price" style="font-size: 1.4rem">¥{{ Number(detail.total_amount).toFixed(2) }}</span>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '../../utils/request'
import { ElMessage } from 'element-plus'

const statusMap = { pending: '待付款', paid: '已付款', shipped: '已发货', completed: '已完成', cancelled: '已取消' }
const statusType = { pending: 'warning', paid: 'primary', shipped: 'success', completed: '', cancelled: 'info' }

const list = ref([])
const total = ref(0)
const page = ref(1)
const loading = ref(false)
const statusFilter = ref('')
const detailVisible = ref(false)
const detail = ref(null)

function getNextStatuses(current) {
  const map = { pending: ['paid', 'cancelled'], paid: ['shipped', 'cancelled'], shipped: ['completed'] }
  return map[current] || []
}

async function load(p) {
  if (p) page.value = p
  loading.value = true
  const params = { page: page.value, pageSize: 10 }
  if (statusFilter.value) params.status = statusFilter.value
  const res = await request.get('/orders', { params })
  if (res.code === 200) { list.value = res.data.list; total.value = res.data.total }
  loading.value = false
}

async function updateStatus(id, status) {
  const res = await request.put(`/orders/${id}/status`, { status })
  if (res.code === 200) { ElMessage.success('状态已更新'); load() }
  else ElMessage.error(res.message || '操作失败')
}

async function viewDetail(row) {
  const res = await request.get('/orders/' + row.id)
  if (res.code === 200) { detail.value = res.data; detailVisible.value = true }
}

onMounted(load)
</script>