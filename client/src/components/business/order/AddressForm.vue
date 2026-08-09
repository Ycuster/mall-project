<template>
  <div class="address-form">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-width="labelWidth"
    >
      <el-form-item label="收货人" prop="receiver_name">
        <el-input
          v-model="formData.receiver_name"
          placeholder="请输入收货人姓名"
          maxlength="20"
        />
      </el-form-item>

      <el-form-item label="联系电话" prop="receiver_phone">
        <el-input
          v-model="formData.receiver_phone"
          placeholder="请输入联系电话"
          maxlength="11"
        />
      </el-form-item>

      <el-form-item label="所在地区" prop="region">
        <el-cascader
          v-model="formData.region"
          :options="regionOptions"
          :props="{ checkStrictly: true }"
          placeholder="请选择省/市/区"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="详细地址" prop="receiver_address">
        <el-input
          v-model="formData.receiver_address"
          type="textarea"
          :rows="3"
          placeholder="请输入详细地址，如街道、门牌号等"
          maxlength="200"
        />
      </el-form-item>

      <el-form-item label="邮政编码">
        <el-input
          v-model="formData.postal_code"
          placeholder="选填"
          maxlength="6"
        />
      </el-form-item>

      <el-form-item label="备注">
        <el-input
          v-model="formData.remark"
          type="textarea"
          placeholder="选填，如有特殊要求请说明"
          maxlength="100"
        />
      </el-form-item>

      <div class="address-form__actions">
        <BaseButton variant="default" @click="handleCancel">
          {{ cancelText }}
        </BaseButton>
        <BaseButton variant="primary" :loading="submitting" @click="handleSubmit">
          {{ submitText }}
        </BaseButton>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import BaseButton from '../base/BaseButton.vue'

interface AddressFormData {
  receiver_name: string
  receiver_phone: string
  region: string[]
  receiver_address: string
  postal_code: string
  remark: string
}

interface AddressFormProps {
  modelValue?: Partial<AddressFormData>
  submitText?: string
  cancelText?: string
  labelWidth?: string | number
  regionOptions?: Array<{
    value: string
    label: string
    children?: Array<{ value: string; label: string; children?: Array<{ value: string; label: string }> }>
  }>
}

const props = withDefaults(defineProps<AddressFormProps>(), {
  modelValue: () => ({}),
  submitText: '保存',
  cancelText: '取消',
  labelWidth: '100px',
  regionOptions: () => []
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: AddressFormData): void
  (e: 'submit', data: AddressFormData): void
  (e: 'cancel'): void
}>()

const formRef = ref<FormInstance>()
const submitting = ref(false)

const formData = reactive<AddressFormData>({
  receiver_name: props.modelValue.receiver_name || '',
  receiver_phone: props.modelValue.receiver_phone || '',
  region: props.modelValue.region || [],
  receiver_address: props.modelValue.receiver_address || '',
  postal_code: props.modelValue.postal_code || '',
  remark: props.modelValue.remark || ''
})

const rules = computed<FormRules>(() => ({
  receiver_name: [
    { required: true, message: '请输入收货人姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  receiver_phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择所在地区', trigger: 'change' }
  ],
  receiver_address: [
    { required: true, message: '请输入详细地址', trigger: 'blur' },
    { min: 5, message: '地址至少 5 个字符', trigger: 'blur' }
  ]
}))

async function handleSubmit(): Promise<void> {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    submitting.value = true
    emit('submit', { ...formData })
  } catch {
    // validation failed
  } finally {
    submitting.value = false
  }
}

function handleCancel(): void {
  formRef.value?.resetFields()
  emit('cancel')
}

defineExpose({
  validate: () => formRef.value?.validate(),
  resetFields: () => formRef.value?.resetFields()
})

export type { AddressFormData }
</script>

<style scoped>
.address-form {
  max-width: 600px;
}

.address-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
}
</style>