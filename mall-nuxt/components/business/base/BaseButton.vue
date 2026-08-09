<template>
  <el-button
    :type="elType"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :block="block"
    :icon="icon"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type BaseButtonVariant = 'primary' | 'default' | 'danger' | 'text' | 'success' | 'warning'

interface BaseButtonProps {
  variant?: BaseButtonVariant
  size?: 'small' | 'default' | 'large'
  loading?: boolean
  disabled?: boolean
  block?: boolean
  icon?: string
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'default',
  size: 'default',
  loading: false,
  disabled: false,
  block: false,
  icon: ''
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