<template>
  <div class="page-container">
    <!-- 搜索 & 筛选 -->
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-row :gutter="16" align="middle">
        <el-col :span="6">
          <el-select v-model="filters.category_id" placeholder="全部分类" clearable @change="load(1)">
            <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="filters.sort" @change="load(1)">
            <el-option label="最新上架" value="newest" />
            <el-option label="销量优先" value="sales" />
            <el-option label="价格↑" value="price_asc" />
            <el-option label="价格↓" value="price_desc" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="filters.keyword" placeholder="搜索商品..." clearable @keydown.enter="load(1)">
            <template #append>
              <el-button @click="load(1)"><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="8" style="text-align: right; color: #909399; font-size: 0.85rem">
          共 <span style="color: #c0392b; font-weight: 700">{{ total }}</span> 件商品
        </el-col>
      </el-row>
    </el-card>

    <!-- 商品列表 -->
    <div v-loading="loading">
      <el-row v-if="products.length" :gutter="20">
        <el-col v-for="p in products" :key="p.id" :xs="12" :sm="8" :md="6" style="margin-bottom: 20px">
          <ProductCard :product="p" />
        </el-col>
      </el-row>
      <el-empty v-else description="暂无商品" />
    </div>

    <!-- 分页 -->
    <div v-if="total > filters.pageSize" style="display: flex; justify-content: center; margin-top: 24px">
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

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import request from '../../utils/request'
import ProductCard from './components/ProductCard.vue'

const route = useRoute()
const products = ref([])
const categories = ref([])
const total = ref(0)
const loading = ref(false)

const filters = reactive({
  keyword: route.query.keyword || '',
  category_id: route.query.category ? +route.query.category : '',
  sort: route.query.sort || 'newest',
  page: 1,
  pageSize: 12
})

async function load(page) {
  if (page) filters.page = page
  loading.value = true
  const params = { ...filters }
  Object.keys(params).forEach(k => { if (params[k] === '' || params[k] === null) delete params[k] })
  const res = await request.get('/products', { params })
  if (res.code === 200) {
    products.value = res.data.list
    total.value = res.data.total
  }
  loading.value = false
}

watch(() => route.query, (q) => {
  filters.keyword = q.keyword || ''
  filters.category_id = q.category ? +q.category : ''
  load(1)
})

onMounted(async () => {
  const catRes = await request.get('/categories')
  if (catRes.code === 200) categories.value = catRes.data
  load(1)
})
</script>