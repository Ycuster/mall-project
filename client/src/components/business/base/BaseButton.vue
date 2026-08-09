<template>
  <el-button
    :class="['base-button', `base-button--${variant}`, { 'base-button--block': block }]"
    :type="elType"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :round="round"
    @click="handleClick"
    v-bind="$attrs"
  >
    <template #icon>
      <slot name="icon">
        <el-icon v-if="icon" class="base-button__icon">
          <component :is="icon" />
        </el-icon>
      </slot>
    </template>
    <slot>
      <span class="base-button__content">
        {{ loading ? loadingText : $slots.default ? '' : text }}
      </span>
    </slot>
  </el-button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

type BaseButtonVariant = 'primary' | 'default' | 'danger' | 'text' | 'success' | 'warning'

interface BaseButtonProps {
  variant?: BaseButtonVariant
  size?: 'small' | 'default' | 'large'
  loading?: boolean
  loadingText?: string
  disabled?: boolean
  block?: boolean
  round?: boolean
  icon?: Component | string
  text?: string
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'default',
  size: 'default',
  loading: false,
  loadingText: '加载中...',
  disabled: false,
  block: false,
  round: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const elType = computed((): 'primary' | 'default' | 'danger' | 'text' | 'success' | 'warning' => {
  const map: Record<string, 'primary' | 'default' | 'danger' | 'text' | 'success' | 'warning'> = {
    primary: 'primary',
    danger: 'danger',
    success: 'success',
    warning: 'warning',
    text: 'text',
    default: 'default'
  }
  return map[props.variant] || 'default'
})

function handleClick(event: MouseEvent): void {
  if (props.loading || props.disabled) return
  emit('click', event)
}

export type { BaseButtonProps }
</script>

<style scoped>
.base-button {
  font-weight: 500;
  transition: all var(--transition-base);
}

.base-button--block {
  width: 100%;
}

.base-button__icon {
  margin-right: var(--spacing-xs);
}

.base-button--loading {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>