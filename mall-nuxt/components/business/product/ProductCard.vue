<template>
  <div
    :class="['product-card', { 'product-card--clickable': clickable }]"
    @click="handleClick"
  >
    <div class="product-card__cover">
      <img :src="product.cover || defaultImg" :alt="product.name" />
      <div class="product-card__tags">
        <el-tag v-if="product.is_hot" type="danger" size="small" effect="dark">热销</el-tag>
        <el-tag v-if="product.is_new" type="success" size="small" effect="dark">新品</el-tag>
      </div>
      <div v-if="showFavorite" class="product-card__favorite" @click.stop="handleToggleFavorite">
        <DelayedRender>
          <el-icon :class="{ 'product-card__favorite--active': isFavorite }">
            <Heart />
          </el-icon>
        </DelayedRender>
      </div>
    </div>

    <div class="product-card__body">
      <div class="product-card__title" :title="product.name">
        {{ product.name }}
      </div>

      <div v-if="showDescription && product.description" class="product-card__desc">
        {{ product.description }}
      </div>

      <div class="product-card__price-row">
        <div class="product-card__price">
          <span class="product-card__price-current">¥{{ formatPrice(product.price) }}</span>
          <span v-if="hasDiscount" class="product-card__price-original">
            ¥{{ formatPrice(product.original_price) }}
          </span>
          <el-tag v-if="hasDiscount" type="warning" size="small" class="product-card__discount">
            -{{ discountPercent }}%
          </el-tag>
        </div>
        <span v-if="showSales" class="product-card__sales">已售{{ product.sales }}</span>
      </div>

      <div class="product-card__footer">
        <slot name="actions">
          <BaseButton
            v-if="showAddCart"
            variant="primary"
            size="small"
            block
            :disabled="product.stock <= 0"
            @click.stop="handleAddCart"
          >
            <DelayedRender>
              <el-icon><ShoppingCart /></el-icon>
            </DelayedRender>
            {{ product.stock <= 0 ? '已售罄' : '加入购物车' }}
          </BaseButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import type { Product } from '~/types/product'

interface ProductCardProps {
  product: Product
  clickable?: boolean
  showDescription?: boolean
  showSales?: boolean
  showAddCart?: boolean
  showFavorite?: boolean
  isFavorite?: boolean
  defaultImg?: string
}

const props = withDefaults(defineProps<ProductCardProps>(), {
  clickable: true,
  showDescription: false,
  showSales: true,
  showAddCart: true,
  showFavorite: false,
  isFavorite: false,
  defaultImg: 'https://picsum.photos/seed/default/400/400'
})

const emit = defineEmits<{
  (e: 'click', product: Product): void
  (e: 'add-to-cart', product: Product): void
  (e: 'toggle-favorite', product: Product, favorite: boolean): void
}>()

const hasDiscount = computed(() => props.product.original_price > props.product.price)

const discountPercent = computed(() => {
  if (!hasDiscount.value) return 0
  return Math.round((1 - props.product.price / props.product.original_price) * 100)
})

function formatPrice(price: number | string): string {
  return Number(price).toFixed(2)
}

function handleClick(): void {
  if (!props.clickable) return
  emit('click', props.product)
}

function handleAddCart(): void {
  emit('add-to-cart', props.product)
}

function handleToggleFavorite(): void {
  emit('toggle-favorite', props.product, !props.isFavorite)
}
</script>

<style scoped>
.product-card {
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
  border: 1px solid var(--color-border-light);
}

.product-card--clickable {
  cursor: pointer;
}

.product-card--clickable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.product-card__cover {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--color-bg-grey);
  border-radius: var(--radius-md);
}

.product-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.product-card:hover .product-card__cover img {
  transform: scale(1.05);
}

.product-card__tags {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  display: flex;
  gap: var(--spacing-xs);
}

.product-card__favorite {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.product-card__favorite:hover {
  background: var(--color-bg-white);
  transform: scale(1.1);
}

.product-card__favorite svg {
  font-size: 18px;
  color: var(--color-text-placeholder);
}

.product-card__favorite--active svg {
  color: var(--color-danger);
  fill: var(--color-danger);
}

.product-card__body {
  padding: var(--spacing-md);
}

.product-card__title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  line-height: 1.5;
  height: 2.7em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: var(--color-text-primary);
}

.product-card__desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
  height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-card__price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-sm);
}

.product-card__price {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.product-card__price-current {
  color: var(--color-primary);
  font-weight: 700;
  font-size: var(--font-size-lg);
}

.product-card__price-original {
  color: var(--color-text-placeholder);
  text-decoration: line-through;
  font-size: var(--font-size-xs);
}

.product-card__discount {
  font-size: var(--font-size-xs);
}

.product-card__sales {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.product-card__footer {
  margin-top: var(--spacing-md);
}
</style>