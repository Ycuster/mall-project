<template>
  <div class="payment-panel">
    <div class="payment-panel__methods">
      <div class="payment-panel__title">选择支付方式</div>
      <div class="payment-panel__list">
        <div
          v-for="method in paymentMethods"
          :key="method.value"
          :class="['payment-panel__method', { 'is-active': selectedMethod === method.value }]"
          @click="handleSelectMethod(method.value)"
        >
          <div class="payment-panel__method-icon" :style="{ background: method.bg }">
            <el-icon :size="24">
              <component :is="method.icon" />
            </el-icon>
          </div>
          <div class="payment-panel__method-info">
            <div class="payment-panel__method-name">{{ method.label }}</div>
            <div v-if="method.desc" class="payment-panel__method-desc">
              {{ method.desc }}
            </div>
          </div>
          <el-icon v-if="selectedMethod === method.value" class="payment-panel__check">
            <CircleCheckFilled />
          </el-icon>
        </div>
      </div>
    </div>

    <div class="payment-panel__detail" v-if="selectedMethod === 'wechat' || selectedMethod === 'alipay'">
      <div v-if="qrCodeUrl" class="payment-panel__qr">
        <div class="payment-panel__qr-placeholder" :style="{ width: qrSize + 'px', height: qrSize + 'px' }">
          <el-icon :size="qrSize * 0.6"><Connection /></el-icon>
          <span class="payment-panel__qr-label">扫码支付</span>
        </div>
      </div>
      <div class="payment-panel__qr-tip">
        <el-icon><InfoFilled /></el-icon>
        请使用{{ selectedMethod === 'wechat' ? '微信' : '支付宝' }}扫描二维码支付
      </div>
      <div class="payment-panel__qr-amount">
        支付金额：<span class="payment-panel__amount-value">¥{{ amount.toFixed(2) }}</span>
      </div>
    </div>

    <div class="payment-panel__detail" v-else-if="selectedMethod === 'balance'">
      <div class="payment-panel__balance">
        <div class="payment-panel__balance-info">
          <span>当前余额：</span>
          <span class="payment-panel__balance-amount">¥{{ balance.toFixed(2) }}</span>
        </div>
        <div class="payment-panel__balance-check">
          <el-checkbox v-model="useBalance">使用余额支付</el-checkbox>
        </div>
      </div>
    </div>

    <div class="payment-panel__summary">
      <div class="payment-panel__amount">
        <span>应付金额：</span>
        <span class="payment-panel__amount-value">¥{{ finalAmount.toFixed(2) }}</span>
      </div>
      <BaseButton
        variant="primary"
        size="large"
        :loading="loading"
        :disabled="!canPay"
        block
        @click="handlePay"
      >
        {{ loading ? '支付处理中...' : '确认支付' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import BaseButton from '../base/BaseButton.vue'

interface PaymentMethod {
  value: string
  label: string
  icon: string
  bg: string
  desc?: string
}

interface PaymentPanelProps {
  amount: number
  balance?: number
  defaultMethod?: string
  qrCodeUrl?: string
  qrSize?: number
  loading?: boolean
}

const props = withDefaults(defineProps<PaymentPanelProps>(), {
  balance: 0,
  defaultMethod: 'wechat',
  qrCodeUrl: '',
  qrSize: 160,
  loading: false
})

const emit = defineEmits<{
  (e: 'pay', payload: { method: string; amount: number }): void
  (e: 'method-change', method: string): void
}>()

const paymentMethods: PaymentMethod[] = [
  {
    value: 'wechat',
    label: '微信支付',
    icon: 'ChatDotRound',
    bg: '#07C160',
    desc: '推荐使用'
  },
  {
    value: 'alipay',
    label: '支付宝',
    icon: 'Money',
    bg: '#1677FF'
  },
  {
    value: 'balance',
    label: '余额支付',
    icon: 'Wallet',
    bg: '#E6A23C',
    desc: `可用余额 ¥${props.balance.toFixed(2)}`
  }
]

const selectedMethod = ref(props.defaultMethod)
const useBalance = ref(false)

const finalAmount = computed((): number => {
  if (selectedMethod.value === 'balance' && useBalance.value) {
    return props.amount
  }
  return props.amount
})

const canPay = computed((): boolean => {
  if (selectedMethod.value === 'balance' && useBalance.value) {
    return props.balance >= props.amount
  }
  return props.amount > 0
})

function handleSelectMethod(method: string): void {
  selectedMethod.value = method
  emit('method-change', method)
}

function handlePay(): void {
  if (!canPay.value) {
    ElMessage.warning(selectedMethod.value === 'balance' ? '余额不足' : '金额异常')
    return
  }
  emit('pay', {
    method: selectedMethod.value,
    amount: finalAmount.value
  })
}

export type { PaymentMethod }
</script>

<style scoped>
.payment-panel {
  padding: var(--spacing-lg);
}

.payment-panel__title {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.payment-panel__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.payment-panel__method {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border: 2px solid var(--color-border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.payment-panel__method:hover {
  border-color: var(--color-primary-light);
}

.payment-panel__method.is-active {
  border-color: var(--color-primary);
  background: var(--color-primary-light-9);
}

.payment-panel__method-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.payment-panel__method-info {
  flex: 1;
}

.payment-panel__method-name {
  font-weight: 500;
  color: var(--color-text-primary);
}

.payment-panel__method-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}

.payment-panel__check {
  font-size: 24px;
  color: var(--color-primary);
}

.payment-panel__detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--color-bg-grey);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.payment-panel__qr {
  margin-bottom: var(--spacing-md);
}

.payment-panel__qr-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-white);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  gap: var(--spacing-xs);
}

.payment-panel__qr-label {
  font-size: var(--font-size-sm);
}

.payment-panel__qr-tip {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.payment-panel__qr-amount {
  font-size: var(--font-size-sm);
  color: var(--color-text-regular);
}

.payment-panel__amount-value {
  color: var(--color-primary);
  font-weight: 700;
  font-size: var(--font-size-lg);
}

.payment-panel__balance {
  width: 100%;
}

.payment-panel__balance-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.payment-panel__balance-amount {
  color: var(--color-primary);
  font-weight: 600;
  font-size: var(--font-size-lg);
}

.payment-panel__summary {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

.payment-panel__amount {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-base);
  color: var(--color-text-regular);
}
</style>