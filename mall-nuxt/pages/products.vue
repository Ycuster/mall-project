<template>
  <div class="page-container">
    <el-card shadow="never" style="margin-bottom: 20px">
      <SearchBar
        v-model="filters.keyword"
        v-model:category-id="filters.category_id"
        v-model:sort-by="filters.sort"
        :categories="categories"
        :sort-options="sortOptions"
        :show-filters="true"
        :show-result-count="true"
        :total="total"
        @search="handleSearch"
        @filter-change="handleFilterChange"
      />
    </el-card>

    <div v-loading="loading">
      <el-row v-if="products.length" :gutter="20">
        <el-col v-for="p in products" :key="p.id" :xs="12" :sm="8" :md="6" style="margin-bottom: 20px">
          <ProductCard
            :product="p"
            @click="handleProductClick"
            @add-to-cart="handleAddToCart"
          />
        </el-col>
      </el-row>
      <el-empty v-else description="暂无商品" />
    </div>

    <div v-if="total > (filters.pageSize ?? 0)" style="display: flex; justify-content: center; margin-top: 24px">
      <el-pagination
        v-model:current-page="filters.page"
        :page-size="filters.pageSize"
        :total="total"
        layout="prev, pager, next, jumper"
        @current-change="load"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRoute } from '#app'
import { ElMessage } from 'element-plus'
import { ProductCard, SearchBar } from '~/components/business'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import type { SortOption } from '~/components/business'
import type { Category, Product, ProductQueryParams } from '~/types/product'
import type { PageResult } from '~/types/api'

const route = useRoute()
const cartStore = useCartStore()
const userStore = useUserStore()

useSeoMeta({
  title: '商品列表 - MallShop',
  description: '浏览 MallShop 所有商品，按分类、价格、销量筛选',
  keywords: '商品,购物,MallShop,商城'
})

const sortOptions: SortOption[] = [
  { label: '最新上架', value: 'newest' },
  { label: '销量优先', value: 'sales' },
  { label: '价格升序', value: 'price_asc' },
  { label: '价格降序', value: 'price_desc' }
]

const filters = reactive<ProductQueryParams>({
  keyword: (route.query.keyword as string) || '',
  category_id: route.query.category ? Number(route.query.category) : '',
  sort: (route.query.sort as string) || 'newest',
  page: 1,
  pageSize: 12
})

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(false)

async function load(page?: number): Promise<void> {
  if (page) filters.page = page
  loading.value = true
  try {
    const { $api } = useNuxtApp()
    const params: Record<string, unknown> = { ...filters }
    Object.keys(params).forEach(k => { if (params[k] === '' || params[k] === null) delete params[k] })
    const res = await $api.get<PageResult<Product>>('/products', params)
    if (res.code === 200) {
      products.value = res.data.list
      total.value = res.data.total
    }
  } catch {}
  loading.value = false
}

async function loadCategories(): Promise<void> {
  try {
    const { $api } = useNuxtApp()
    const res = await $api.get<Category[]>('/categories')
    if (res.code === 200) categories.value = res.data
  } catch {}
}

watch(() => route.query, async (q) => {
  filters.keyword = (q.keyword as string) || ''
  filters.category_id = q.category ? Number(q.category) : ''
  filters.sort = (q.sort as string) || 'newest'
  filters.page = 1
  await load(1)
})

await loadCategories()
await load(1)

function handleSearch(keyword: string): void {
  filters.keyword = keyword
  load(1)
}

function handleFilterChange(newFilters: { category_id: number | ''; sort: string }): void {
  filters.category_id = newFilters.category_id
  filters.sort = newFilters.sort
  load(1)
}

function handleProductClick(product: Product): void {
  navigateTo(`/product/${product.id}`)
}

async function handleAddToCart(product: Product): Promise<void> {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    await navigateTo(`/login?redirect=${encodeURIComponent(useRoute().fullPath)}`)
    return
  }
  await cartStore.add(product.id, 1)
}
</script>