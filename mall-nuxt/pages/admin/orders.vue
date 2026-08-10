<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-weight: 600">订单管理</span>
        <div style="display: flex; gap: 10px">
          <el-input
            v-model="keyword"
            placeholder="搜索订单号/用户..."
            clearable
            style="width: 220px"
            @keydown.enter="load(1)"
            @clear="load(1)"
          />
          <el-select v-model="statusFilter" placeholder="状态" clearable style="width: 140px" @change="load(1)">
            <el-option label="待付款" value="pending" />
            <el-option label="已付款" value="paid" />
            <el-option label="已发货" value="shipped" />
            <el-option label="已完成" value="completed" />
            <el-option label="已取消" value="cancelled" />
          </el-select>
        </div>
      </div>
    </template>

    <el-table :data="list" v-loading="loading" stripe>
      <el-table-column label="订单号" prop="order_no" width="180" show-overflow-tooltip />
      <el-table-column label="用户">
        <template #default="{ row }">{{ row.nickname || row.username }}</template>
      </el-table-column>
      <el-table-column label="收件人" prop="receiver_name" width="100" />
      <el-table-column label="收件电话" prop="receiver_phone" width="130" />
      <el-table-column label="地址" prop="receiver_address" min-width="200" show-overflow-tooltip />
      <el-table-column label="金额" width="100" align="center">
        <template #default="{ row }">
          <span class="text-price">¥{{ Number(row.total_amount).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="statusType[row.status]" size="small">{{ statusMap[row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" prop="created_at" width="170" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" text size="small" @click="viewDetail(row)">详情</el-button>
          <el-button
            v-permission="'order:ship'"
            v-if="row.status === 'paid'"
            type="success"
            text
            size="small"
            @click="shipOrder(row.id)"
          >
            发货
          </el-button>
          <el-popconfirm v-if="row.status === 'pending' || row.status === 'paid'" title="确定取消订单？" @confirm="cancelOrder(row.id)">
            <template #reference>
              <el-button v-permission="'order:cancel'" type="danger" text size="small">取消</el-button>
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

    <el-drawer v-model="detailVisible" title="订单详情" size="560px">
      <template v-if="currentOrder">
        <el-descriptions :column="2" border size="small" style="margin-bottom: 20px">
          <el-descriptions-item label="订单号">{{ currentOrder.order_no }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="statusType[currentOrder.status]" size="small">{{ statusMap[currentOrder.status] }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="收件人">{{ currentOrder.receiver_name }}</el-descriptions-item>
          <el-descriptions-item label="电话">{{ currentOrder.receiver_phone }}</el-descriptions-item>
          <el-descriptions-item label="地址" :span="2">{{ currentOrder.receiver_address }}</el-descriptions-item>
          <el-descriptions-item label="备注" :span="2">{{ currentOrder.remark || '-' }}</el-descriptions-item>
          <el-descriptions-item label="下单时间" :span="2">{{ currentOrder.created_at }}</el-descriptions-item>
        </el-descriptions>

        <h4 style="margin-bottom: 12px">商品清单</h4>
        <el-table :data="currentOrder.items || []" size="small" border>
          <el-table-column label="商品" prop="product_name" />
          <el-table-column label="单价" width="100" align="center">
            <template #default="{ row }">¥{{ Number(row.price).toFixed(2) }}</template>
          </el-table-column>
          <el-table-column label="数量" prop="quantity" width="80" align="center" />
          <el-table-column label="小计" width="100" align="center">
            <template #default="{ row }">¥{{ (Number(row.price) * row.quantity).toFixed(2) }}</template>
          </el-table-column>
        </el-table>

        <div style="text-align: right; margin-top: 16px">
          <span style="font-size: 1rem">合计：</span>
          <span class="text-price" style="font-size: 1.3rem">¥{{ Number(currentOrder.total_amount).toFixed(2) }}</span>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Order, OrderStatus } from '~/types/order'
import type { PageResult } from '~/types/api'

definePageMeta({ layout: 'admin' })

const statusMap: Record<OrderStatus, string> = {
  pending: '待付款', paid: '已付款', shipped: '已发货', completed: '已完成', cancelled: '已取消'
}
const statusType: Record<OrderStatus, string> = {
  pending: 'warning', paid: 'primary', shipped: 'success', completed: '', cancelled: 'info'
}

const list = ref<Order[]>([])
const total = ref<number>(0)
const page = ref<number>(1)
const keyword = ref<string>('')
const statusFilter = ref<string>('')
const loading = ref<boolean>(false)
const detailVisible = ref<boolean>(false)
const currentOrder = ref<Order | null>(null)

async function load(p?: number): Promise<void> {
  if (p) page.value = p
  loading.value = true
  const { $api } = useNuxtApp()
  const params: Record<string, unknown> = { page: page.value, pageSize: 10, _admin: 1 }
  if (keyword.value) params.keyword = keyword.value
  if (statusFilter.value) params.status = statusFilter.value
  const res = await $api.get<PageResult<Order>>('/orders', { params })
  if (res.code === 200) {
    list.value = res.data.list
    total.value = res.data.total
  }
  loading.value = false
}

async function viewDetail(row: Order): Promise<void> {
  const { $api } = useNuxtApp()
  const res = await $api.get<Order>(`/orders/${row.id}`)
  if (res.code === 200) {
    currentOrder.value = res.data
    detailVisible.value = true
  }
}

async function shipOrder(id: number): Promise<void> {
  await ElMessageBox.confirm('确定要将此订单标记为已发货？', '发货确认')
  const { $api } = useNuxtApp()
  const res = await $api.put(`/orders/${id}/ship`)
  if (res.code === 200) {
    ElMessage.success('发货成功')
    await load()
  } else {
    ElMessage.error(res.message || '操作失败')
  }
}

async function cancelOrder(id: number): Promise<void> {
  const { $api } = useNuxtApp()
  const res = await $api.put(`/orders/${id}/cancel`)
  if (res.code === 200) {
    ElMessage.success('订单已取消')
    await load()
  } else {
    ElMessage.error(res.message || '操作失败')
  }
}

onMounted(() => load())
</script>

<style scoped>
.text-price {
  color: var(--color-primary, #c0392b);
  font-weight: 600;
}
</style>