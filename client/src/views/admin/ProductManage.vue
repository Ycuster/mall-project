<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-weight: 600">商品管理</span>
        <div style="display: flex; gap: 10px">
          <el-input v-model="keyword" placeholder="搜索商品..." clearable style="width: 200px"
            @keydown.enter="load(1)" @clear="load(1)" />
          <el-button type="primary" @click="openDialog()">
            <el-icon><Plus /></el-icon> 添加商品
          </el-button>
        </div>
      </div>
    </template>

    <el-table :data="list" v-loading="loading" stripe>
      <el-table-column label="图片" width="80">
        <template #default="{ row }">
          <el-image v-if="row.cover" :src="row.cover" style="width: 50px; height: 50px; border-radius: 6px" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name" min-width="200" show-overflow-tooltip />
      <el-table-column label="分类" prop="category_name" width="100" />
      <el-table-column label="价格" width="100" align="center">
        <template #default="{ row }">
          <span class="text-price">¥{{ Number(row.price).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" prop="stock" width="80" align="center" sortable />
      <el-table-column label="销量" prop="sales" width="80" align="center" sortable />
      <el-table-column label="状态" width="80" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" size="small">{{ row.status ? '上架' : '下架' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="120" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.is_hot" type="danger" size="small" style="margin-right: 4px">热销</el-tag>
          <el-tag v-if="row.is_new" type="success" size="small">新品</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" text size="small" @click="openDialog(row)">编辑</el-button>
          <el-popconfirm title="确定删除？" @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button type="danger" text size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="display: flex; justify-content: center; margin-top: 20px">
      <el-pagination v-model:current-page="page" :page-size="10" :total="total"
        layout="total, prev, pager, next" @current-change="load" />
    </div>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑商品' : '添加商品'" width="680px" destroy-on-close>
      <el-form :model="form" label-width="80px" :rules="formRules" ref="formRef">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="售价" prop="price">
              <el-input-number v-model="form.price" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原价">
              <el-input-number v-model="form.original_price" :min="0" :precision="2" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="库存">
              <el-input-number v-model="form.stock" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类">
              <el-select v-model="form.category_id" clearable style="width: 100%">
                <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="封面图">
          <div style="display: flex; gap: 12px; align-items: flex-end">
            <el-input v-model="form.cover" placeholder="图片URL" style="width: 300px" />
            <el-upload
              :action="'/api/upload'"
              :headers="{ Authorization: 'Bearer ' + userStore.token }"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
            >
              <el-button size="small">上传</el-button>
            </el-upload>
          </div>
          <el-image v-if="form.cover" :src="form.cover" style="width: 100px; height: 100px; border-radius: 8px; margin-top: 8px" fit="cover" />
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="状态">
              <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-text="上架" inactive-text="下架" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="热销">
              <el-switch v-model="form.is_hot" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="新品">
              <el-switch v-model="form.is_new" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import request from '../../utils/request'
import { useUserStore } from '../../stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const list = ref([])
const categories = ref([])
const total = ref(0)
const page = ref(1)
const keyword = ref('')
const loading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const editId = ref(null)
const saving = ref(false)
const formRef = ref()

const form = reactive({
  name: '', price: 0, original_price: 0, stock: 0,
  category_id: null, description: '', cover: '',
  images: [], status: 1, is_hot: 0, is_new: 0
})

const formRules = {
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }]
}

async function load(p) {
  if (p) page.value = p
  loading.value = true
  const res = await request.get('/products', {
    params: { page: page.value, pageSize: 10, keyword: keyword.value, _admin: 1, status: '' }
  })
  if (res.code === 200) { list.value = res.data.list; total.value = res.data.total }
  loading.value = false
}

function openDialog(row) {
  if (row) {
    isEdit.value = true
    editId.value = row.id
    Object.assign(form, {
      ...row,
      images: (() => { try { return JSON.parse(row.images || '[]') } catch { return [] } })()
    })
  } else {
    isEdit.value = false
    editId.value = null
    Object.assign(form, {
      name: '', price: 0, original_price: 0, stock: 0,
      category_id: null, description: '', cover: '',
      images: [], status: 1, is_hot: 0, is_new: 0
    })
  }
  dialogVisible.value = true
}

function handleUploadSuccess(res) {
  if (res.code === 200) {
    form.cover = res.data.url
    ElMessage.success('上传成功')
  }
}

async function handleSave() {
  await formRef.value.validate()
  saving.value = true
  if (!form.cover && form.images.length) form.cover = form.images[0]
  const fn = isEdit.value
    ? request.put('/products/' + editId.value, form)
    : request.post('/products', form)
  const res = await fn
  if (res.code === 200) {
    ElMessage.success(isEdit.value ? '更新成功' : '添加成功')
    dialogVisible.value = false
    load()
  } else {
    ElMessage.error(res.message || '操作失败')
  }
  saving.value = false
}

async function handleDelete(id) {
  const res = await request.delete('/products/' + id)
  if (res.code === 200) { ElMessage.success('已删除'); load() }
  else ElMessage.error(res.message || '删除失败')
}

onMounted(async () => {
  const catRes = await request.get('/categories/all')
  if (catRes.code === 200) categories.value = catRes.data
  load(1)
})
</script>