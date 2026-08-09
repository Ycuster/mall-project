<template>
  <div class="page-container" style="max-width: 800px">
    <el-card shadow="never">
      <template #header><span style="font-size: 1.2rem; font-weight: 600">确认订单</span></template>

      <!-- 商品概览 -->
      <el-descriptions title="商品明细" :column="1" border style="margin-bottom: 24px">
        <el-descriptions-item v-for="item in cartStore.items" :key="item.id" :label="item.name">
          <div style="display: flex; justify-content: space-between; width: 100%">
            <span>x {{ item.quantity }}</span>
            <span class="text-price">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </el-descriptions-item>
      </el-descriptions>

      <div style="text-align: right; margin-bottom: 24px; font-size: 1.1rem">
        总计: <span class="text-price" style="font-size: 1.6rem">¥{{ cartStore.totalAmount.toFixed(2) }}</span>
      </div>

      <el-divider />

      <!-- 收货信息 -->
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="收货人" prop="receiver_name">
          <el-input v-model="form.receiver_name" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="receiver_phone">
          <el-input v-model="form.receiver_phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="地址" prop="receiver_address">
          <el-input v-model="form.receiver_address" type="textarea" :rows="2" placeholder="请输入详细收货地址" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="选填" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" :loading="submitting" style="width: 200px" @click="handleSubmit">
            提交订单
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'
import request from '../../utils/request'
import { ElMessage } from 'element-plus'

const router = useRouter()
const cartStore = useCartStore()
const formRef = ref()
const submitting = ref<boolean>(false)

const form = reactive({
  receiver_name: '',
  receiver_phone: '',
  receiver_address: '',
  remark: ''
})

const rules = {
  receiver_name: [{ required: true, message: '请输入收货人', trigger: 'blur' }],
  receiver_phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  receiver_address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
}

async function handleSubmit(): Promise<void> {
  await formRef.value.validate()
  submitting.value = true
  const res = await request.post<null>('/orders', {
    items: cartStore.items.map(i => ({ product_id: i.product_id, quantity: i.quantity })),
    ...form
  })
  if (res.code === 200) {
    ElMessage.success('下单成功！')
    await cartStore.fetch()
    router.push('/orders')
  } else {
    ElMessage.error(res.message || '下单失败')
  }
  submitting.value = false
}
</script>