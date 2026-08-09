<template>
  <div>
    <!-- Banner -->
    <section class="hero-banner">
      <div class="hero-content">
        <h1>发现你心仪的好物</h1>
        <p>精选全球好货，品质生活从这里开始</p>
        <router-link to="/products">
          <el-button type="primary" size="large" round>
            立即选购 <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </router-link>
      </div>
    </section>

    <div class="page-container">
      <!-- 分类 -->
      <el-card shadow="never" style="margin-bottom: 24px">
        <template #header>
          <div class="section-header">
            <span class="section-title">商品分类</span>
          </div>
        </template>
        <div class="category-grid">
          <div
            v-for="cat in categories"
            :key="cat.id"
            class="category-item"
            @click="$router.push({ path: '/products', query: { category: cat.id } })"
          >
            <span class="cat-icon">{{ cat.icon || '📦' }}</span>
            <span>{{ cat.name }}</span>
          </div>
        </div>
      </el-card>

      <!-- 热销商品 -->
      <el-card shadow="never" style="margin-bottom: 24px">
        <template #header>
          <div class="section-header">
            <span class="section-title">🔥 热销商品</span>
            <router-link to="/products?sort=sales">
              <el-link type="primary">查看更多 <el-icon><ArrowRight /></el-icon></el-link>
            </router-link>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col v-for="p in hotProducts" :key="p.id" :xs="12" :sm="8" :md="6" style="margin-bottom: 20px">
            <ProductCard :product="p" />
          </el-col>
        </el-row>
      </el-card>

      <!-- 新品 -->
      <el-card shadow="never">
        <template #header>
          <div class="section-header">
            <span class="section-title">🆕 新品上架</span>
            <router-link to="/products?sort=newest">
              <el-link type="primary">查看更多 <el-icon><ArrowRight /></el-icon></el-link>
            </router-link>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col v-for="p in newProducts" :key="p.id" :xs="12" :sm="8" :md="6" style="margin-bottom: 20px">
            <ProductCard :product="p" />
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '../../utils/request'
import ProductCard from './components/ProductCard.vue'
import type { Category, Product } from '../../types/product'
import type { PageResult } from '../../types/api'

const categories = ref<Category[]>([])
const hotProducts = ref<Product[]>([])
const newProducts = ref<Product[]>([])

onMounted(async () => {
  const [catRes, hotRes, newRes] = await Promise.all([
    request.get<Category[]>('/categories'),
    request.get<PageResult<Product>>('/products?sort=sales&pageSize=8'),
    request.get<PageResult<Product>>('/products?sort=newest&pageSize=8')
  ])
  if (catRes.code === 200) categories.value = catRes.data
  if (hotRes.code === 200) hotProducts.value = hotRes.data.list
  if (newRes.code === 200) newProducts.value = newRes.data.list
})
</script>

<style scoped>
.hero-banner {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 80px 24px;
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.hero-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23fff' opacity='.08'/%3E%3C/svg%3E");
}

.hero-content {
  position: relative;
}

.hero-content h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.hero-content p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 28px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.category-grid {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 0;
}

.category-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 28px;
  border-radius: 12px;
  background: #f5f7fa;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 100px;
}

.category-item:hover {
  background: #fef2f2;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(192, 57, 43, 0.1);
}

.cat-icon {
  font-size: 2rem;
}
</style>