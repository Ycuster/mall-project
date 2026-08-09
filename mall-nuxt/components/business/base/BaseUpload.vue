<template>
  <div class="base-upload">
    <el-upload
      ref="uploadRef"
      :action="action"
      :headers="uploadHeaders"
      :multiple="multiple"
      :limit="limit"
      :accept="accept"
      :max-size="maxSize"
      :file-list="fileList"
      :auto-upload="autoUpload"
      :show-file-list="showFileList"
      :drag="drag"
      list-type="picture-card"
      v-bind="$attrs"
      @exceed="handleExceed"
      @before-upload="handleBeforeUpload"
      @upload-progress="handleUploadProgress"
      @upload-success="handleUploadSuccess"
      @upload-error="handleUploadError"
      @file-change="handleFileChange"
      @file-remove="handleFileRemove"
    >
      <template v-if="!drag">
        <DelayedRender><el-icon><Plus /></el-icon></DelayedRender>
        <span class="base-upload__text">{{ uploadText }}</span>
      </template>
      <template v-else>
        <DelayedRender><el-icon class="base-upload__drag-icon"><UploadFilled /></el-icon></DelayedRender>
        <div class="base-upload__drag-text">{{ dragText }}</div>
        <div class="base-upload__drag-tip">
          支持 {{ accept }}，单个文件不超过 {{ maxSize }}MB
        </div>
      </template>
    </el-upload>

    <div v-if="previewUrl" class="base-upload__preview">
      <el-dialog v-model="previewVisible" :title="previewTitle" width="800px">
        <img :src="previewUrl" class="base-upload__preview-img" />
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UploadInstance, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'

interface BaseUploadProps {
  action?: string
  headers?: Record<string, string>
  multiple?: boolean
  limit?: number
  accept?: string
  maxSize?: number
  modelValue?: UploadUserFile[]
  autoUpload?: boolean
  showFileList?: boolean
  drag?: boolean
  uploadText?: string
  dragText?: string
}

const props = withDefaults(defineProps<BaseUploadProps>(), {
  action: '/api/upload',
  headers: () => ({}),
  multiple: false,
  limit: 5,
  accept: 'image/*',
  maxSize: 5,
  modelValue: () => [],
  autoUpload: true,
  showFileList: true,
  drag: false,
  uploadText: '点击上传',
  dragText: '将文件拖到此处，或点击上传'
})

const emit = defineEmits<{
  (e: 'update:modelValue', fileList: UploadUserFile[]): void
  (e: 'before-upload', file: File): boolean | Promise<boolean>
  (e: 'progress', event: { file: UploadUserFile; percent: number }): void
  (e: 'success', response: unknown, uploadFile: UploadUserFile): void
  (e: 'error', error: Error, uploadFile: UploadUserFile): void
  (e: 'change', file: UploadUserFile, fileList: UploadUserFile[]): void
  (e: 'remove', file: UploadUserFile, fileList: UploadUserFile[]): void
  (e: 'exceed', file: UploadUserFile, fileList: UploadUserFile[]): void
}>()

const uploadRef = ref<UploadInstance>()
const fileList = ref<any[]>([...props.modelValue])
const previewUrl = ref('')
const previewVisible = ref(false)
const previewTitle = ref('')

const uploadHeaders = computed(() => {
  const token = useCookie('mall_token').value
  return {
    Authorization: token ? `Bearer ${token}` : '',
    ...props.headers
  }
})

function handleExceed(file: UploadUserFile, fileList: UploadUserFile[]): void {
  ElMessage.warning(`最多上传 ${props.limit} 个文件`)
  emit('exceed', file, fileList)
}

function handleBeforeUpload(file: File): boolean {
  if (file.size > props.maxSize * 1024 * 1024) {
    ElMessage.error(`文件大小不能超过 ${props.maxSize}MB`)
    return false
  }
  if (!file.type.startsWith(props.accept.split('/')[0])) {
    ElMessage.error(`只能上传 ${props.accept} 格式的文件`)
    return false
  }
  const result = emit('before-upload', file)
  return result as boolean
}

function handleUploadProgress(event: { file: UploadUserFile; percent: number }): void {
  emit('progress', event)
}

function handleUploadSuccess(response: unknown, uploadFile: UploadUserFile): void {
  emit('success', response, uploadFile)
  emit('update:modelValue', [...fileList.value])
}

function handleUploadError(error: Error, uploadFile: UploadUserFile): void {
  ElMessage.error('上传失败')
  emit('error', error, uploadFile)
}

function handleFileChange(file: UploadUserFile, list: UploadUserFile[]): void {
  fileList.value = list
  emit('change', file, list)
  emit('update:modelValue', list)
}

function handleFileRemove(file: UploadUserFile, list: UploadUserFile[]): void {
  fileList.value = list
  emit('remove', file, list)
  emit('update:modelValue', list)
}

defineExpose({
  uploadRef,
  clearFiles: () => uploadRef.value?.clearFiles(),
  abort: () => uploadRef.value?.abort()
})
</script>

<style scoped>
.base-upload {
  width: 100%;
}

.base-upload__text {
  margin-left: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-regular);
}

.base-upload__drag-icon {
  font-size: 48px;
  color: var(--color-text-placeholder);
}

.base-upload__drag-text {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin: var(--spacing-sm) 0;
}

.base-upload__drag-tip {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.base-upload__preview-img {
  width: 100%;
  max-height: 600px;
  object-fit: contain;
}
</style>