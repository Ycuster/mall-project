<template>
  <el-table
    ref="tableRef"
    :data="tableData"
    :loading="loading"
    :height="height"
    :max-height="maxHeight"
    :border="border"
    :stripe="stripe"
    class="base-table"
    v-bind="$attrs"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange"
    @current-change="handleCurrentChange"
  >
    <el-table-column v-if="selectable" type="selection" width="50" />
    <el-table-column v-if="showIndex" type="index" label="#" width="60" />

    <slot name="columns">
      <el-table-column
        v-for="col in columns"
        :key="col.key"
        :prop="col.key"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
        :sortable="col.sortable ? 'custom' : false"
        :filterable="col.filterable ? col.filters : false"
        :fixed="col.fixed"
        :align="col.align || 'left'"
      >
        <template #default="{ row }">
          <slot :name="`cell-${col.key}`" :row="row">
            {{ row[col.key] }}
          </slot>
        </template>
      </el-table-column>
    </slot>

    <el-table-column v-if="showActions" label="操作" :width="actionsWidth" fixed="right" align="center">
      <template #default="{ row }">
        <slot name="actions" :row="row">
          <BaseButton
            variant="primary"
            size="small"
            @click="emit('view', row)"
          >
            查看
          </BaseButton>
          <BaseButton
            variant="danger"
            size="small"
            @click="emit('delete', row)"
          >
            删除
          </BaseButton>
        </slot>
      </template>
    </el-table-column>

    <template #empty>
      <slot name="empty">
        <el-empty :description="emptyText">
          <BaseButton v-if="showEmptyAction" variant="primary" size="small" @click="emit('empty-action')">
            {{ emptyActionText }}
          </BaseButton>
        </el-empty>
      </slot>
    </template>
  </el-table>

  <div v-if="showPagination && total > 0" class="base-table__pagination">
    <el-pagination
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.pageSize"
      :total="total"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="handlePageSizeChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import BaseButton from './BaseButton.vue'

interface TableColumn {
  key: string
  label: string
  width?: number | string
  minWidth?: number | string
  sortable?: boolean
  filterable?: boolean
  filters?: Array<{ text: string; value: string }>
  fixed?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
}

interface BaseTableProps {
  columns: TableColumn[]
  data?: Record<string, unknown>[]
  loading?: boolean
  height?: string | number
  maxHeight?: string | number
  border?: boolean
  stripe?: boolean
  showIndex?: boolean
  showActions?: boolean
  actionsWidth?: number | string
  selectable?: boolean
  total?: number
  showPagination?: boolean
  pageSizes?: number[]
  emptyText?: string
  showEmptyAction?: boolean
  emptyActionText?: string
}

const props = withDefaults(defineProps<BaseTableProps>(), {
  data: () => [],
  loading: false,
  height: 'auto',
  maxHeight: 'auto',
  border: false,
  stripe: true,
  showIndex: false,
  showActions: false,
  actionsWidth: 160,
  selectable: false,
  total: 0,
  showPagination: true,
  pageSizes: () => [10, 20, 50, 100],
  emptyText: '暂无数据',
  showEmptyAction: false,
  emptyActionText: '去添加'
})

const emit = defineEmits<{
  (e: 'update:selection', rows: Record<string, unknown>[]): void
  (e: 'sort-change', prop: string, order: string): void
  (e: 'filter-change', filters: Record<string, unknown[]>): void
  (e: 'current-change', row: Record<string, unknown> | null): void
  (e: 'view', row: Record<string, unknown>): void
  (e: 'delete', row: Record<string, unknown>): void
  (e: 'empty-action'): void
  (e: 'page-change', page: number): void
  (e: 'page-size-change', pageSize: number): void
}>()

const tableRef = ref<any>()
const pagination = reactive({
  page: 1,
  pageSize: 10
})

const tableData = ref<Record<string, unknown>[]>([...(props.data ?? [])])

watch(() => props.data, (val) => {
  tableData.value = [...(val ?? [])]
}, { deep: true })

function handleSelectionChange(rows: Record<string, unknown>[]): void {
  emit('update:selection', rows)
}

function handleSortChange({ prop, order }: { prop: string; order: string }): void {
  emit('sort-change', prop, order)
}

function handleFilterChange(filters: Record<string, unknown[]>): void {
  emit('filter-change', filters)
}

function handleCurrentChange(row: Record<string, unknown> | null): void {
  emit('current-change', row)
}

function handlePageChange(page: number): void {
  emit('page-change', page)
}

function handlePageSizeChange(pageSize: number): void {
  emit('page-size-change', pageSize)
}

defineExpose({
  tableRef,
  clearSelection: () => tableRef.value?.clearSelection(),
  toggleRowSelection: (row: Record<string, unknown>, selected?: boolean) =>
    tableRef.value?.toggleRowSelection(row, selected)
})

export type { TableColumn }
</script>

<style scoped>
.base-table {
  width: 100%;
}

.base-table__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--spacing-md);
  padding: var(--spacing-sm) 0;
}
</style>