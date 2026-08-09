<template>
  <div class="product-selector">
    <el-dialog
      v-model="visible"
      :title="title"
      :width="width"
      :close-on-click-modal="false"
      append-to-body
    >
      <SearchBar
        v-model="searchKeyword"
        v-model:category-id="filterCategoryId"
        placeholder="搜索商品名称..."
        :show-filters="true"
        :categories="categories"
        @search="handleSearch"
        @filter-change="handleFilterChange"
      />

      <div class="product-selector__list">
        <el-table
          :data="filteredProducts"
          :loading="loading"
          height="400"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column prop="id" label="ID" width="60" />
          <el-table-column label="商品" min-width="200">
            <template #default="{ row }">
              <div class="product-selector__item">
                <img :src="row.cover" :alt="row.name" />
                <span>{{ row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" width="100">
            <template #default="{ row }">
              <span class="product-selector__price">¥{{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="库存" width="80" />
        </el-table>
      </div>

      <template #footer>
        <div class="product-selector__footer">
          <span>已选择 {{ selectedProducts.length }} 件商品</span>
          <div>
            <BaseButton variant="default" @click="handleCancel">取消</BaseButton>
            <BaseButton variant="primary" @click="handleConfirm">
              确认选择
            </BaseButton>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import SearchBar from './SearchBar.vue'
import type { Product, Category } from '~/types/product'

interface ProductSelectorProps {
  modelValue?: boolean
  products?: Product[]
  categories?: Category[]
  title?: string
  width?: string | number
  multiple?: boolean
}

const props = withDefaults(defineProps<ProductSelectorProps>(), {
  modelValue: false,
  products: () => [],
  categories: () => [],
  title: '选择商品',
  width: '70%',
  multiple: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', products: Product | Product[] | null): void
  (e: 'cancel'): void
}>()

const visible = ref(props.modelValue)
const searchKeyword = ref('')
const filterCategoryId = ref<number | ''>('')
const loading = ref(false)
const selectedProducts = ref<Product[]>([])

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const filteredProducts = computed(() => {
  let list = [...props.products]
  if (searchKeyword.value) {
    list = list.filter(p => p.name.toLowerCase().includes(searchKeyword.value.toLowerCase()))
  }
  if (filterCategoryId.value) {
    list = list.filter(p => p.category_id === filterCategoryId.value)
  }
  return list
})

function handleSearch(val: string): void {
  searchKeyword.value = val
}

function handleFilterChange(filters: { category_id: number | '' }): void {
  filterCategoryId.value = filters.category_id
}

function handleSelectionChange(rows: Product[]): void {
  if (!props.multiple && rows.length > 1) {
    selectedProducts.value = [rows[rows.length - 1]]
  } else {
    selectedProducts.value = rows
  }
}

function handleConfirm(): void {
  if (props.multiple) {
    emit('confirm', selectedProducts.value)
  } else {
    const product = selectedProducts.value[0]
    emit('confirm', (product ?? null) as Product | null)
  }
  visible.value = false
}

function handleCancel(): void {
  emit('cancel')
  visible.value = false
}
</script>

<style scoped>
.product-selector__list {
  margin: var(--spacing-md) 0;
}

.product-selector__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.product-selector__item img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.product-selector__price {
  color: var(--color-primary);
  font-weight: 600;
}

.product-selector__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>