<template>
  <div class="page-container">
    <el-card shadow="never">
      <template #header><span style="font-size: 1.2rem; font-weight: 600">我的订单</span></template>

      <div v-loading="loading">
        <el-empty v-if="!orders.length && !loading" description="暂无订单">
          <router-link to="/products"><el-button type="primary">去选购</el-button></router-link>
        </el-empty>

        <div v-for="order in orders" :key="order.id" class="order-item">
          <div class="order-header">
            <span>订单号: {{ order.order_no }}</span>
            <span>{{ new Date(order.created_at).toLocaleString() }}</span>
          </div>
          <div class="order-body">
            <div style="display: flex; justify-content: space-between; align-items: center">
              <el-tag :type="statusType[order.status]" effect="dark" round>
                {{ statusMap[order.status] }}
              </el-tag>
              <span class="text-price" style="font-size: 1.2rem">
                ¥{{ Number(order.total_amount).toFixed(2) }}
              </span>
            </div>
            <el-text type="info" size="small">
              收货人: {{ order.receiver_name }} · {{ order.receiver_phone }} · {{ order.receiver_address }}
            </el-text>
          </div>
          <div v-if="order.status === 'pending'" class="order-footer">
            <el-popconfirm title="确定取消该订单？库存将恢复" @confirm="cancelOrder(order.id)">
              <template #reference>
                <el-button size="small" type="danger" plain>取消订单</el-button>
              </template>
            </el-popconfirm>
            <el-button size="small" type="primary">去支付</el-button>
          </div>
        </div>
      </div>

      <div v-if="total > pageSize" style="display: flex; justify-content: center; margin-top: 20px">
        <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total"
          layout="prev, pager, next" @current-change="load" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '../../utils/request'
import { ElMessage } from 'element-plus'

const statusMap = { pending: '待付款', paid: '已付款', shipped: '已发货', completed: '已完成', cancelled: '已取消' }
const statusType = { pending: 'warning', paid: 'primary', shipped: 'success', completed: '', cancelled: 'info' }

const orders = ref([])
const loading = ref(true)
const page = ref(1)
const pageSize = 10
const total = ref(0)

async function load(p) {
  if (p) page.value = p
  loading.value = true
  const res = await request.get('/orders', { params: { page: page.value, pageSize } })
  if (res.code === 200) { orders.value = res.data.list; total.value = res.data.total }
  loading.value = false
}

async function cancelOrder(id) {
  const res = await request.put(`/orders/${id}/status`, { status: 'cancelled' })
  if (res.code === 200) { ElMessage.success('订单已取消'); load() }
  else ElMessage.error(res.message || '操作失败')
}

onMounted(load)
</script>

<style scoped>
.order-item {
  border: 1px solid #ebeef5;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 16px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #fafafa;
  font-size: 0.85rem;
  color: #909399;
}

.order-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 12px 16px;
  background: #fafafa;
  border-top: 1px solid #ebeef5;
}
</style>