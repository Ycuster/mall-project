<template>
  <div class="payment-panel">
    <div class="payment-panel__methods">
      <div
        v-for="method in methods"
        :key="method.value"
        :class="['payment-panel__method', { 'is-active': selected === method.value }]"
        @click="selectMethod(method.value)"
      >
        <span class="payment-panel__method-icon">{{ method.icon }}</span>
        <span class="payment-panel__method-label">{{ method.label }}</span>
        <DelayedRender>
          <el-icon v-if="selected === method.value" class="payment-panel__check">
            <CircleCheck />
          </el-icon>
        </DelayedRender>
      </div>
    </div>

    <div class="payment-panel__amount">
      <span>应付金额</span>
      <span class="payment-panel__price">¥{{ formattedAmount }}</span>
    </div>

    <div class="payment-panel__actions">
      <BaseButton variant="default" @click="handleCancel">取消</BaseButton>
      <BaseButton variant="primary" :loading="submitting" @click="handleConfirm">
        确认支付
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '../base/BaseButton.vue'

export interface PaymentMethod {
  value: string
  label: string
  icon: string
}

interface PaymentPanelProps {
  methods?: PaymentMethod[]
  defaultMethod?: string
  amount?: number
  submitting?: boolean
}

const props = withDefaults(defineProps<PaymentPanelProps>(), {
  methods: () => [
    { value: 'alipay', label: '支付宝', icon: '💰' },
    { value: 'wechat', label: '微信支付', icon: '💬' },
    { value: 'balance', label: '余额支付', icon: '💳' }
  ],
  defaultMethod: 'alipay',
  amount: 0,
  submitting: false
})

const emit = defineEmits<{
  (e: 'confirm', method: string): void
  (e: 'cancel'): void
}>()

const selected = ref<string>(props.defaultMethod)

const formattedAmount = computed(() => Number(props.amount).toFixed(2))

function selectMethod(method: string): void {
  selected.value = method
}

function handleConfirm(): void {
  emit('confirm', selected.value)
}

function handleCancel(): void {
  emit('cancel')
}
</script>

<style scoped>
.payment-panel {
  padding: var(--spacing-md);
}

.payment-panel__methods {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.payment-panel__method {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
}

.payment-panel__method:hover {
  border-color: var(--color-primary-light);
}

.payment-panel__method.is-active {
  border-color: var(--color-primary);
  background: var(--color-primary-light-9);
}

.payment-panel__method-icon {
  font-size: 1.5rem;
}

.payment-panel__method-label {
  font-weight: 500;
}

.payment-panel__check {
  position: absolute;
  top: 8px;
  right: 8px;
  color: var(--color-primary);
}

.payment-panel__amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-bg-grey);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.payment-panel__price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.payment-panel__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}
</style>