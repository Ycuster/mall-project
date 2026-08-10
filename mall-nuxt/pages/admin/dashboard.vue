<template>
  <div v-loading="loading">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="6" v-for="(item, i) in statCards" :key="i">
        <el-card shadow="hover" class="stat-card" :style="{ borderTop: `3px solid ${item.color}` }">
          <div class="stat-icon" :style="{ background: item.bg, color: item.color }">
            <ClientOnly><el-icon :size="24"><component :is="item.icon" /></el-icon></ClientOnly>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ item.value }}</div>
            <div class="stat-label">{{ item.label }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="16">
        <el-card shadow="never">
          <template #header><span style="font-weight: 600">近7天营收趋势</span></template>
          <div ref="revenueChartRef" style="height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header><span style="font-weight: 600">订单状态分布</span></template>
          <div ref="statusChartRef" style="height: 300px"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never">
          <template #header><span style="font-weight: 600">热销商品 TOP10</span></template>
          <el-table :data="topProducts" size="small">
            <el-table-column label="商品" prop="name" show-overflow-tooltip />
            <el-table-column label="价格" width="100" align="center">
              <template #default="{ row }">¥{{ Number(row.price).toFixed(2) }}</template>
            </el-table-column>
            <el-table-column label="销量" prop="sales" width="80" align="center" sortable />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <template #header><span style="font-weight: 600">最近订单</span></template>
          <el-table :data="recentOrders" size="small">
            <el-table-column label="订单号" prop="order_no" width="160" show-overflow-tooltip />
            <el-table-column label="用户">
              <template #default="{ row }">{{ row.nickname || row.username }}</template>
            </el-table-column>
            <el-table-column label="金额" width="100" align="center">
              <template #default="{ row }">¥{{ Number(row.total_amount).toFixed(2) }}</template>
            </el-table-column>
            <el-table-column label="状态" width="80" align="center">
              <template #default="{ row }">
                <el-tag :type="statusType[row.status]" size="small">{{ statusMap[row.status] }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import * as echarts from 'echarts'
import type { OrderStatus } from '~/types/order'

definePageMeta({ layout: 'admin' })

const statusMap: Record<OrderStatus, string> = {
  pending: '待付款', paid: '已付款', shipped: '已发货', completed: '已完成', cancelled: '已取消'
}
const statusType: Record<OrderStatus, string> = {
  pending: 'warning', paid: 'primary', shipped: 'success', completed: 'success', cancelled: 'info'
}

const loading = ref<boolean>(true)
const stats = ref<Record<string, unknown>>({})
const topProducts = ref<Array<{ id: number; name: string; sales: number; price: number }>>([])
const recentOrders = ref<Array<{ id: number; order_no: string; total_amount: number; status: string; created_at: string; nickname: string; username: string }>>([])
const revenueChartRef = ref<HTMLElement | null>(null)
const statusChartRef = ref<HTMLElement | null>(null)

const statCards = computed(() => [
  { label: '总营收', value: '¥' + Number(stats.value.totalRevenue as number || 0).toLocaleString(), icon: 'Coin', color: '#f59e0b', bg: '#fffbeb' },
  { label: '总订单', value: String(stats.value.totalOrders || 0), icon: 'Document', color: '#3b82f6', bg: '#eff6ff' },
  { label: '注册用户', value: String(stats.value.totalUsers || 0), icon: 'User', color: '#10b981', bg: '#ecfdf5' },
  { label: '商品数量', value: String(stats.value.totalProducts || 0), icon: 'Goods', color: '#ef4444', bg: '#fef2f2' }
])

onMounted(async () => {
  try {
    const { $api } = useNuxtApp()
    const [s, rev, st, top, recent] = await Promise.all([
      $api.get<Record<string, unknown>>('/dashboard/stats'),
      $api.get<Array<{ date: string; revenue: number }>>('/dashboard/chart/revenue'),
      $api.get<Array<{ status: string; count: number }>>('/dashboard/chart/status'),
      $api.get<Array<{ id: number; name: string; sales: number; price: number }>>('/dashboard/top-products'),
      $api.get<Array<{ id: number; order_no: string; total_amount: number; status: string; created_at: string; nickname: string; username: string }>>('/dashboard/recent-orders')
    ])

    if (s.code === 200) stats.value = s.data
    if (top.code === 200) topProducts.value = top.data
    if (recent.code === 200) recentOrders.value = recent.data

  await nextTick()

  if (rev.code === 200 && revenueChartRef.value) {
    const chart = echarts.init(revenueChartRef.value)
    const labels: string[] = []
    const data: number[] = []
    const today = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate() - i)
      const ds = d.toISOString().split('T')[0]
      labels.push(ds.slice(5))
      const found = rev.data.find(r => {
        const rDate = (r.date as unknown as Date) instanceof Date ? (r.date as unknown as Date).toISOString().split('T')[0] : r.date
        return rDate === ds
      })
      data.push(found ? found.revenue : 0)
    }
    chart.setOption({
      tooltip: { trigger: 'axis', formatter: '{b}<br/>营收: ¥{c}' },
      xAxis: { type: 'category', data: labels },
      yAxis: { type: 'value', axisLabel: { formatter: '¥{value}' } },
      series: [{
        type: 'line', data, smooth: true,
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(192,57,43,0.3)' }, { offset: 1, color: 'rgba(192,57,43,0.02)' }
        ])},
        lineStyle: { color: '#c0392b', width: 3 },
        itemStyle: { color: '#c0392b' }
      }],
      grid: { left: 60, right: 20, top: 20, bottom: 30 }
    })
  }

  if (st.code === 200 && statusChartRef.value) {
    const chart = echarts.init(statusChartRef.value)
    const colorMap: Record<string, string> = { pending: '#f59e0b', paid: '#3b82f6', shipped: '#10b981', completed: '#6366f1', cancelled: '#ef4444' }
    chart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie', radius: ['40%', '70%'], center: ['50%', '55%'],
        data: (st.data as Array<{ status: string; count: number }>).map(r => ({
          name: statusMap[r.status as OrderStatus] || r.status,
          value: r.count,
          itemStyle: { color: colorMap[r.status] || '#ccc' }
        })),
        label: { fontSize: 12 },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.2)' } }
      }]
    })
  }
  } catch {} finally { loading.value = false }
})
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 10px;
}

.stat-card :deep(.el-card__body) {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-value {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.85rem;
  color: #909399;
}
</style>