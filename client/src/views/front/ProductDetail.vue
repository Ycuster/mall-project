<template>
  <div class="page-container" v-loading="loading">
    <template v-if="product">
      <el-card shadow="never">
        <el-row :gutter="40">
          <el-col :md="10" :sm="24">
            <div class="detail-cover">
              <img :src="product.cover || defaultImg" :alt="product.name" />
            </div>
          </el-col>
          <el-col :md="14" :sm="24">
            <h1 style="font-size: 1.6rem; font-weight: 600; margin-bottom: 16px; line-height: 1.4">
              {{ product.name }}
            </h1>
            <p style="color: #606266; line-height: 1.8; margin-bottom: 20px">
              {{ product.description || '暂无描述' }}
            </p>

            <div class="price-box">
              <div>
                <span class="text-price" style="font-size: 2rem">
                  ¥{{ Number(product.price).toFixed(2) }}
                </span>
                <span v-if="product.original_price > product.price" class="text-price-original" style="font-size: 1.1rem">
                  ¥{{ Number(product.original_price).toFixed(2) }}
                </span>
              </div>
              <el-text type="info" size="small">
                销量 {{ product.sales }} · 库存 {{ product.stock }} · {{ product.category_name || '未分类' }}
              </el-text>
            </div>

            <el-divider />

            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px">
              <span style="color: #606266; font-size: 0.9rem">数量</span>
              <el-input-number
                v-model="qty"
                :min="1"
                :max="product.stock"
                size="large"
              />
            </div>

            <el-button type="primary" size="large" style="width: 240px; height: 48px; font-size: 1rem" @click="handleAdd">
              <el-icon :size="20"><ShoppingCart /></el-icon> 加入购物车
            </el-button>

            <div style="margin-top: 20px; display: flex; gap: 24px">
              <el-text type="info"><el-icon><Shield /></el-icon> 正品保证</el-text>
              <el-text type="info"><el-icon><Van /></el-icon> 全场包邮</el-text>
              <el-text type="info"><el-icon><RefreshRight /></el-icon> 7天退换</el-text>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <!-- 商品详情 -->
      <el-card v-if="product.detail" shadow="never" style="margin-top: 20px">
        <template #header><span style="font-weight: 600">商品详情</span></template>
        <div class="detail-content" v-html="product.detail"></div>
      </el-card>
    </template>

    <el-empty v-else-if="!loading" description="商品不存在">
      <router-link to="/products"><el-button type="primary">返回商品列表</el-button></router-link>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import request from '../../utils/request'
import { useCartStore } from '../../stores/cart'
import { useUserStore } from '../../stores/user'
import { ElMessage } from 'element-plus'
import type { Product } from '../../types/product'

const defaultImg = 'https://picsum.photos/seed/default/400/400'
const route = useRoute()
const cartStore = useCartStore()
const userStore = useUserStore()

const product = ref<Product | null>(null)
const loading = ref<boolean>(true)
const qty = ref<number>(1)

onMounted(async () => {
  const res = await request.get<Product>('/products/' + route.params.id)
  if (res.code === 200) product.value = res.data
  loading.value = false
})

function handleAdd(): void {
  if (!userStore.isLoggedIn) { ElMessage.warning('请先登录'); return }
  if (product.value) {
    cartStore.add(product.value.id, qty.value)
  }
}
</script>

<style scoped>
.detail-cover {
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
}

.detail-cover img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.price-box {
  background: #fef2f2;
  padding: 16px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>