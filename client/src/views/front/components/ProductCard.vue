<template>
  <el-card shadow="hover" class="product-card" @click="router.push('/product/' + product.id)">
    <div class="card-cover">
      <img :src="product.cover || defaultImg" :alt="product.name" />
      <div v-if="product.is_hot" class="tag tag-hot">热销</div>
      <div v-if="product.is_new" class="tag tag-new">新品</div>
    </div>
    <div class="card-body">
      <div class="card-title" :title="product.name">{{ product.name }}</div>
      <div class="card-bottom">
        <div>
          <span class="text-price" style="font-size: 1.15rem">¥{{ Number(product.price).toFixed(2) }}</span>
          <span v-if="product.original_price > product.price" class="text-price-original">
            ¥{{ Number(product.original_price).toFixed(2) }}
          </span>
        </div>
        <span class="card-sales">已售{{ product.sales }}</span>
      </div>
      <el-button
        type="primary"
        size="small"
        style="width: 100%; margin-top: 10px"
        @click.stop="handleAdd"
      >
        <el-icon><ShoppingCart /></el-icon> 加入购物车
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '../../../stores/cart'
import { useUserStore } from '../../../stores/user'
import { ElMessage } from 'element-plus'
import type { Product } from '../../../types/product'

const defaultImg = 'https://picsum.photos/seed/default/400/400'
const props = defineProps<{ product: Product }>()
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

function handleAdd(): void {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }
  cartStore.add(props.product.id)
}
</script>

<style scoped>
.product-card {
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 12px;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.card-cover {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f5f5f5;
  border-radius: 8px;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.product-card:hover .card-cover img {
  transform: scale(1.06);
}

.tag {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 2px 10px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
}

.tag-hot { background: #f56c6c; }
.tag-new { background: #67c23a; }

.card-body {
  padding: 12px 0 0;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  height: 2.7em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.card-sales {
  font-size: 0.8rem;
  color: #909399;
}
</style>