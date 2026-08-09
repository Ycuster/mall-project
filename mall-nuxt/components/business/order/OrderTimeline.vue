<template>
  <div class="order-timeline">
    <el-timeline :space="space" :active-position="activePosition">
      <el-timeline-item
        v-for="(step, index) in steps"
        :key="step.key"
        :timestamp="step.timestamp"
        :color="getStepColor(step.key)"
        :hollow="isHollow(step.key)"
        placement="top"
      >
        <div class="order-timeline__item">
          <div class="order-timeline__label">{{ step.label }}</div>
          <div v-if="step.description" class="order-timeline__desc">
            {{ step.description }}
          </div>
          <div v-if="step.content" class="order-timeline__content">
            <slot :name="`step-${step.key}`" :step="step" :index="index">
              {{ step.content }}
            </slot>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { OrderStatus } from '~/types/order'

type TimelineStepKey = 'created' | 'paid' | 'shipped' | 'completed' | 'cancelled'

interface TimelineStep {
  key: TimelineStepKey
  label: string
  timestamp?: string
  description?: string
  content?: string
  icon?: string
}

interface OrderTimelineProps {
  status: OrderStatus
  createdAt?: string
  paidAt?: string
  shippedAt?: string
  completedAt?: string
  cancelledAt?: string
  space?: string | number
  activePosition?: 'top' | 'bottom'
}

const props = withDefaults(defineProps<OrderTimelineProps>(), {
  createdAt: '',
  paidAt: '',
  shippedAt: '',
  completedAt: '',
  cancelledAt: '',
  space: 80,
  activePosition: 'top'
})

const statusOrder: TimelineStepKey[] = ['created', 'paid', 'shipped', 'completed']

const steps = computed<TimelineStep[]>(() => {
  const allSteps: TimelineStep[] = [
    {
      key: 'created',
      label: '下单时间',
      timestamp: props.createdAt,
      icon: 'ShoppingCart'
    },
    {
      key: 'paid',
      label: '支付完成',
      timestamp: props.paidAt,
      icon: 'Wallet'
    },
    {
      key: 'shipped',
      label: '商品出库',
      timestamp: props.shippedAt,
      icon: 'Van'
    },
    {
      key: 'completed',
      label: '交易完成',
      timestamp: props.completedAt,
      icon: 'CircleCheck'
    }
  ]

  if (props.status === 'cancelled') {
    allSteps.splice(1, 0, {
      key: 'cancelled',
      label: '订单已取消',
      timestamp: props.cancelledAt || props.createdAt,
      icon: 'CircleClose'
    })
  }

  return allSteps
})

const currentStepIndex = computed((): number => {
  if (props.status === 'cancelled') return 1
  const idx = statusOrder.indexOf(props.status as TimelineStepKey)
  return idx >= 0 ? idx : 0
})

function getStepColor(key: TimelineStepKey): string {
  const idx = steps.value.findIndex(s => s.key === key)
  if (idx <= currentStepIndex.value) return 'var(--color-primary)'
  return 'var(--color-text-placeholder)'
}

function isHollow(key: TimelineStepKey): boolean {
  const idx = steps.value.findIndex(s => s.key === key)
  return idx > currentStepIndex.value
}
</script>

<style scoped>
.order-timeline {
  padding: var(--spacing-md) 0;
}

.order-timeline__item {
  min-height: 40px;
}

.order-timeline__label {
  font-weight: 500;
  color: var(--color-text-primary);
}

.order-timeline__desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}

.order-timeline__content {
  margin-top: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-grey);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.order-timeline .el-timeline-item__node {
  background-color: var(--color-primary);
}

.order-timeline .el-timeline-item__tail {
  border-left-color: var(--color-border-light);
}
</style>