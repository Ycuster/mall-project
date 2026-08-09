<template>
  <div>
    <section class="hero-banner">
      <div class="hero-content">
        <h1>发现你心仪的好物</h1>
        <p>精选全球好货，品质生活从这里开始</p>
        <NuxtLink to="/products">
          <el-button type="primary" size="large" round>
            立即选购
            <DelayedRender>
              <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </DelayedRender>
          </el-button>
        </NuxtLink>
      </div>
    </section>

    <div class="page-container">
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
            @click="handleCategoryClick(cat.id)"
          >
            <span class="cat-icon">{{ cat.icon || '📦' }}</span>
            <span>{{ cat.name }}</span>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" style="margin-bottom: 24px">
        <template #header>
          <div class="section-header">
            <span class="section-title">🔥 热销商品</span>
            <el-link type="primary" @click.prevent="navigateTo('/products?sort=sales')">
                查看更多
                <DelayedRender>
                  <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                </DelayedRender>
              </el-link>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col v-for="p in hotProducts" :key="p.id" :xs="12" :sm="8" :md="6" style="margin-bottom: 20px">
            <ProductCard
              :product="p"
              :show-description="false"
              @click="handleProductClick"
              @add-to-cart="handleAddToCart"
              @toggle-favorite="handleToggleFavorite"
            />
          </el-col>
        </el-row>
      </el-card>

      <el-card shadow="never">
        <template #header>
          <div class="section-header">
            <span class="section-title">🆕 新品上架</span>
            <el-link type="primary" @click.prevent="navigateTo('/products?sort=newest')">
                查看更多
                <DelayedRender>
                  <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                </DelayedRender>
              </el-link>
          </div>
        </template>
        <el-row :gutter="20">
          <el-col v-for="p in newProducts" :key="p.id" :xs="12" :sm="8" :md="6" style="margin-bottom: 20px">
            <ProductCard
              :product="p"
              :show-description="false"
              @click="handleProductClick"
              @add-to-cart="handleAddToCart"
              @toggle-favorite="handleToggleFavorite"
            />
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ProductCard } from '~/components/business'
import type { Category, Product } from '~/types/product'
import type { PageResult } from '~/types/api'

useSeoMeta({
  title: 'MallShop - 精选全球好货，品质生活',
  description: 'MallShop 商城首页 - 精选全球好货，品质生活从这里开始',
  keywords: '商城,购物,电商,MallShop,首页'
})

const { data: categories } = await useAsyncData<Category[]>('home-categories', async () => {
  try {
    const { $api } = useNuxtApp()
    const res = await $api.get<Category[]>('/categories')
    return res.data
  } catch {
    return []
  }
}, { default: () => [] })

const { data: hotProducts } = await useAsyncData<Product[]>('home-hot', async () => {
  try {
    const { $api } = useNuxtApp()
    const res = await $api.get<PageResult<Product>>('/products?sort=sales&pageSize=8')
    return res.data.list
  } catch {
    return []
  }
}, { default: () => [] })

const { data: newProducts } = await useAsyncData<Product[]>('home-new', async () => {
  try {
    const { $api } = useNuxtApp()
    const res = await $api.get<PageResult<Product>>('/products?sort=newest&pageSize=8')
    return res.data.list
  } catch {
    return []
  }
}, { default: () => [] })

function handleCategoryClick(id: number): void {
  navigateTo({ path: '/products', query: { category: id } })
}

function handleProductClick(product: Product): void {
  navigateTo(`/product/${product.id}`)
}

function handleAddToCart(product: Product): void {
  ElMessage.success(`已将「${product.name}」加入购物车`)
}

function handleToggleFavorite(product: Product, favorite: boolean): void {
  ElMessage.success(favorite ? `已收藏「${product.name}」` : `已取消收藏「${product.name}」`)
}
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