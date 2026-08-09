<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :top="top"
    :modal="modal"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :before-close="handleBeforeClose"
    class="base-modal"
    v-bind="$attrs"
    @open="emit('open')"
    @opened="emit('opened')"
    @close="handleClose"
    @closed="emit('closed')"
  >
    <div v-if="loading" class="base-modal__loading">
      <el-loading />
    </div>
    
    <div :style="{ visibility: loading ? 'hidden' : 'visible' }">
      <slot />
    </div>

    <template #footer>
      <slot name="footer">
        <BaseButton
          variant="default"
          :disabled="loading"
          @click="handleCancel"
        >
          {{ cancelText }}
        </BaseButton>
        <BaseButton
          variant="primary"
          :loading="loading"
          :disabled="confirmDisabled"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </BaseButton>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseButton from './BaseButton.vue'

interface BaseModalProps {
  modelValue?: boolean
  title?: string
  width?: string | number
  top?: string | number
  modal?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  loading?: boolean
  confirmText?: string
  cancelText?: string
  confirmDisabled?: boolean
}

const props = withDefaults(defineProps<BaseModalProps>(), {
  modelValue: false,
  title: '提示',
  width: '50%',
  top: '15vh',
  modal: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  loading: false,
  confirmText: '确定',
  cancelText: '取消',
  confirmDisabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'close'): void
  (e: 'closed'): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'before-close', done: () => void): void
}>()

const visible = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  visible.value = val
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

function handleClose(): void {
  visible.value = false
}

function handleConfirm(): void {
  emit('confirm')
  if (props.confirmText.toLowerCase() === '确定') {
    visible.value = false
  }
}

function handleCancel(): void {
  emit('cancel')
  visible.value = false
}

function handleBeforeClose(done: () => void): void {
  emit('before-close', done)
}

defineExpose({
  open: () => { visible.value = true },
  close: () => { visible.value = false }
})
</script>

<style scoped>
.base-modal {
  max-width: 100vw;
}

.base-modal__loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>