<template>
  <div class="page-container">
    <!-- 搜索 & 筛选 -->
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

    <!-- 商品列表 -->
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

    <!-- 分页 -->
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
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import request from '../../utils/request'
import { ProductCard, SearchBar } from '../../components/business'
import type { Category, Product, ProductQueryParams } from '../../types/product'
import type { PageResult } from '../../types/api'
import type { SortOption } from '../../components/business/product/SearchBar.vue'

const route = useRoute()
const router = useRouter()
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(false)

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

async function load(page?: number): Promise<void> {
  if (page) filters.page = page
  loading.value = true
  const params: Record<string, unknown> = { ...filters }
  Object.keys(params).forEach(k => { if (params[k] === '' || params[k] === null) delete params[k] })
  const res = await request.get<PageResult<Product>>('/products', { params })
  if (res.code === 200) {
    products.value = res.data.list
    total.value = res.data.total
  }
  loading.value = false
}

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
  router.push(`/product/${product.id}`)
}

function handleAddToCart(product: Product): void {
  ElMessage.success(`已将「${product.name}」加入购物车`)
}

watch(() => route.query, (q) => {
  filters.keyword = (q.keyword as string) || ''
  filters.category_id = q.category ? Number(q.category) : ''
  load(1)
})

onMounted(async () => {
  const catRes = await request.get<Category[]>('/categories')
  if (catRes.code === 200) categories.value = catRes.data
  load(1)
})
</script>