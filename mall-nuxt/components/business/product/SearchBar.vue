<template>
  <div class="search-bar">
    <el-input
      v-model="keyword"
      :placeholder="placeholder"
      :clearable="clearable"
      class="search-bar__input"
      @input="handleInput"
      @keyup.enter="handleSearch"
      @clear="handleClear"
    >
      <template #prefix>
        <DelayedRender><el-icon><Search /></el-icon></DelayedRender>
      </template>
      <template #append v-if="showSearchButton">
        <BaseButton
          variant="primary"
          :loading="loading"
          @click="handleSearch"
        >
          搜索
        </BaseButton>
      </template>
    </el-input>

    <div v-if="showFilters" class="search-bar__filters">
      <el-select
        v-model="filters.category_id"
        :placeholder="categoryPlaceholder"
        clearable
        @change="handleFilterChange"
      >
        <el-option
          v-for="cat in categories"
          :key="cat.id"
          :label="cat.name"
          :value="cat.id"
        />
      </el-select>

      <el-select
        v-model="filters.sort"
        :placeholder="sortPlaceholder"
        @change="handleSortChange"
      >
        <el-option
          v-for="opt in sortOptions"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>
    </div>

    <div v-if="showResultCount" class="search-bar__count">
      共 <span class="search-bar__count-num">{{ total }}</span> 件商品
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import type { Category } from '~/types/product'

export interface SortOption {
  label: string
  value: string
}

interface SearchBarProps {
  modelValue?: string
  categoryId?: number | ''
  sortBy?: string
  placeholder?: string
  clearable?: boolean
  loading?: boolean
  showSearchButton?: boolean
  showFilters?: boolean
  showResultCount?: boolean
  total?: number
  categories?: Category[]
  sortOptions?: SortOption[]
  categoryPlaceholder?: string
  sortPlaceholder?: string
}

const props = withDefaults(defineProps<SearchBarProps>(), {
  modelValue: '',
  categoryId: '',
  sortBy: 'newest',
  placeholder: '搜索商品...',
  clearable: true,
  loading: false,
  showSearchButton: true,
  showFilters: false,
  showResultCount: false,
  total: 0,
  categories: () => [],
  sortOptions: () => [
    { label: '最新上架', value: 'newest' },
    { label: '销量优先', value: 'sales' },
    { label: '价格↑', value: 'price_asc' },
    { label: '价格↓', value: 'price_desc' }
  ],
  categoryPlaceholder: '全部分类',
  sortPlaceholder: '排序方式'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:categoryId', value: number | ''): void
  (e: 'update:sortBy', value: string): void
  (e: 'search', keyword: string): void
  (e: 'clear'): void
  (e: 'filter-change', filters: { category_id: number | ''; sort: string }): void
}>()

const keyword = ref(props.modelValue)
const filters = reactive({
  category_id: props.categoryId as number | '',
  sort: props.sortBy
})

watch(() => props.modelValue, (val) => {
  keyword.value = val
})

watch(() => props.categoryId, (val) => {
  filters.category_id = val
})

watch(() => props.sortBy, (val) => {
  filters.sort = val
})

watch(keyword, (val) => {
  emit('update:modelValue', val)
})

const debounceTime = 300
let searchTimer: ReturnType<typeof setTimeout> | null = null

function handleInput(): void {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    emit('search', keyword.value)
  }, debounceTime)
}

function handleSearch(): void {
  if (searchTimer) clearTimeout(searchTimer)
  emit('search', keyword.value)
}

function handleClear(): void {
  emit('clear')
}

function handleFilterChange(): void {
  emit('update:categoryId', filters.category_id)
  emit('filter-change', { ...filters })
}

function handleSortChange(): void {
  emit('update:sortBy', filters.sort)
  emit('filter-change', { ...filters })
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  flex-wrap: wrap;
}

.search-bar__input {
  flex: 1;
  min-width: 280px;
}

.search-bar__filters {
  display: flex;
  gap: var(--spacing-sm);
}

.search-bar__filters .el-select {
  width: 140px;
}

.search-bar__count {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.search-bar__count-num {
  color: var(--color-primary);
  font-weight: 700;
  font-size: var(--font-size-base);
}
</style>