<template>
  <div class="page-container">
    <el-card shadow="never">
      <template #header>
        <span style="font-size: 1.2rem; font-weight: 600">购物车 ({{ cartStore.totalCount }} 件商品)</span>
      </template>

      <el-empty v-if="!cartStore.items.length" description="购物车是空的">
        <router-link to="/products"><el-button type="primary">去选购</el-button></router-link>
      </el-empty>

      <template v-else>
        <el-table :data="cartStore.items" style="width: 100%">
          <el-table-column label="商品" min-width="300">
            <template #default="{ row }">
              <div style="display: flex; align-items: center; gap: 12px">
                <el-image
                  :src="row.cover || defaultImg"
                  style="width: 80px; height: 80px; border-radius: 8px; flex-shrink: 0"
                  fit="cover"
                />
                <div>
                  <router-link :to="'/product/' + row.product_id" style="font-weight: 500">
                    {{ row.name }}
                  </router-link>
                  <div v-if="!row.product_status" style="color: #f56c6c; font-size: 0.8rem">商品已下架</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单价" width="120" align="center">
            <template #default="{ row }">
              <span class="text-price">¥{{ Number(row.price).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="160" align="center">
            <template #default="{ row }">
              <el-input-number
                :model-value="row.quantity"
                :min="1"
                :max="row.stock"
                size="small"
                @change="(val) => handleQtyChange(row.id, val)"
              />
            </template>
          </el-table-column>
          <el-table-column label="小计" width="120" align="center">
            <template #default="{ row }">
              <span class="text-price">¥{{ (row.price * row.quantity).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template #default="{ row }">
              <el-popconfirm title="确定移除该商品？" @confirm="cartStore.remove(row.id)">
                <template #reference>
                  <el-button type="danger" text><el-icon><Delete /></el-icon></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <div class="cart-footer">
          <div>
            <el-button text @click="handleClear">清空购物车</el-button>
          </div>
          <div class="cart-total">
            <span>合计: </span>
            <span class="text-price" style="font-size: 1.6rem">¥{{ cartStore.totalAmount.toFixed(2) }}</span>
            <router-link to="/checkout">
              <el-button type="primary" size="large" style="margin-left: 20px; padding: 12px 40px">
                去结算 ({{ cartStore.totalCount }})
              </el-button>
            </router-link>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '../../stores/cart'
import { ElMessage } from 'element-plus'

const defaultImg = 'https://picsum.photos/seed/default/400/400'
const cartStore = useCartStore()

onMounted(() => cartStore.fetch())

function handleQtyChange(id, qty) {
  if (qty < 1) return
  cartStore.updateQuantity(id, qty)
}

async function handleClear() {
  await cartStore.clear()
  ElMessage.success('购物车已清空')
}
</script>

<style scoped>
.cart-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding: 20px 24px;
  background: #fafafa;
  border-radius: 10px;
}

.cart-total {
  display: flex;
  align-items: center;
}
</style>