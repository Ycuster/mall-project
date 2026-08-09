<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :inline="inline"
    class="base-form"
    v-bind="$attrs"
    @submit.prevent="handleSubmit"
  >
    <slot />
    <div v-if="showActions" class="base-form__actions">
      <slot name="actions">
        <BaseButton
          v-if="showCancel"
          variant="default"
          :disabled="submitting"
          @click="handleCancel"
        >
          {{ cancelText }}
        </BaseButton>
        <BaseButton
          variant="primary"
          :loading="submitting"
          :disabled="submitDisabled"
          @click="handleSubmit"
        >
          {{ submitText }}
        </BaseButton>
      </slot>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import BaseButton from './BaseButton.vue'

interface BaseFormProps {
  modelValue?: Record<string, unknown>
  rules?: FormRules
  labelWidth?: string | number
  labelPosition?: 'left' | 'right' | 'top'
  inline?: boolean
  showActions?: boolean
  showCancel?: boolean
  submitText?: string
  cancelText?: string
  submitDisabled?: boolean
}

const props = withDefaults(defineProps<BaseFormProps>(), {
  modelValue: () => ({}),
  rules: () => ({}),
  labelWidth: '100px',
  labelPosition: 'right',
  inline: false,
  showActions: true,
  showCancel: false,
  submitText: '提交',
  cancelText: '取消',
  submitDisabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, unknown>): void
  (e: 'submit', formData: Record<string, unknown>): void
  (e: 'cancel'): void
  (e: 'validate', valid: boolean, invalidFields: Record<string, unknown> | null): void
}>()

const formRef = ref<FormInstance>()
const submitting = ref(false)
const formData = reactive<Record<string, unknown>>({ ...props.modelValue })

watch(() => props.modelValue, (val) => {
  Object.assign(formData, val)
}, { deep: true })

watch(formData, (val) => {
  emit('update:modelValue', { ...val })
}, { deep: true })

async function validate(): Promise<boolean> {
  if (!formRef.value) return false
  try {
    await formRef.value.validate()
    emit('validate', true, null)
    return true
  } catch (err) {
    emit('validate', false, err as Record<string, unknown>)
    return false
  }
}

async function handleSubmit(): Promise<void> {
  const valid = await validate()
  if (!valid) return
  submitting.value = true
  try {
    emit('submit', { ...formData })
  } finally {
    submitting.value = false
  }
}

function handleCancel(): void {
  formRef.value?.resetFields()
  emit('cancel')
}

defineExpose({
  validate,
  resetFields: () => formRef.value?.resetFields(),
  clearValidate: () => formRef.value?.clearValidate(),
  formRef
})
</script>

<style scoped>
.base-form {
  width: 100%;
}

.base-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
}
</style>