<script setup lang='ts'>
// @ts-ignore
import type { UploadProps, UploadUserFile } from 'element-plus'
import { getUserInfo, getCertificationType, getUserCertation } from '@/api/user'
import { UserInfoResponseData, UserInfo, CertificatesTypeResponseData, CertificatesType, UserParams } from '@/api/user/types'

defineOptions({ name: 'Certification' })

const userInfo = ref<UserInfo>({} as UserInfo)
const certificatesType = ref<CertificatesType[]>([])
const params = reactive<UserParams>({
  certificatesNo: '',
  certificatesType: '',
  certificatesUrl: '',
  name: ''
})
const upload = ref()
const dialogVisible = ref<boolean>(false)
const dialogImageUrl = ref<string>('')
const fileList = ref<UploadUserFile[]>([])

onMounted(() => {
  fetchUserInfo()
  fetchCertificationType()
})

const fetchUserInfo = async () => {
  const { data, code }: UserInfoResponseData = await getUserInfo()
  if (code === 200) {
    userInfo.value = data
  }
}

const fetchCertificationType = async () => {
  const { data, code }: CertificatesTypeResponseData = await getCertificationType()
  if (code === 200) {
    certificatesType.value = data
  }
}

const onExceed = (_files: File[]) => {
  ElMessage({ type: 'error', message: '最大上传数量为1' })
}

const onSuccess = (_response: any, _uploadFile: any, _uploadFiles: any): void => {
  params.certificatesUrl = _response.data || ''
}

const onPreview: UploadProps['onPreview'] = (_uploadFile: any) => {
  dialogImageUrl.value = _uploadFile.url!
  dialogVisible.value = true
}

const onRemove: UploadProps['beforeRemove'] = (_uploadFile: any, _uploadFiles: any) => {
  params.certificatesUrl = ''
}

const submit = async () => {
  try {
    await getUserCertation(params)
    ElMessage({ type: 'success', message: '认证成功' })
    fetchUserInfo()
  } catch (error) {
    ElMessage({ type: 'error', message: '认证失败' })
  }
}

const reset = () => {
  // fileList.value = [] 或者使用 api
  upload.value.clearFiles()
  Object.assign(params, {
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
    name: ''
  })
}
</script>

<template>
  <el-card class="certification">
    <template #header>
      <div class="card-header">
        <h1>实名信息</h1>
      </div>
    </template>
    <div class="flex justify-center items-center tip">
      <div class="inline-block i-ep:warning"></div>
      <p>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续少骤，建议提前实名认证。</p>
    </div>
    <el-descriptions v-if="userInfo.name" class="mt-20px" :column="1" border>
      <el-descriptions-item :width="20" label-align="center" label="用户名">{{ userInfo.name }}</el-descriptions-item>
      <el-descriptions-item :width="20" label-align="center" label="证件类型">{{ userInfo.certificatesType === '10' ? '身份证' :
        '户口本' }}</el-descriptions-item>
      <el-descriptions-item :width="20" label-align="center" label="证件号码">{{ userInfo.certificatesNo
      }}</el-descriptions-item>
    </el-descriptions>
    <el-form :model="params" v-else class="user-form" label-width="80px">
      <el-form-item label="用户姓名">
        <el-input v-model="params.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="params.certificatesType" class="w-full" placeholder="请选择">
          <el-option v-for="item in certificatesType" :key="item.value" :label="item.name"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input v-model="params.certificatesNo" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="上传证件">
        <el-upload ref="upload" v-model:file-list="fileList" :limit="1" action="/api/oss/file/fileUpload?fileHost=userAuah"
          list-type="picture-card" :on-exceed="onExceed" :on-success="onSuccess" :on-preview="onPreview"
          :on-remove="onRemove">
          <img class="w-full h-full" src="@/assets/images/auth_example.png" alt="">
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary">提交</el-button>
        <el-button @click="reset">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
.tip {
  width: 100%;
  color: #7f7f7f;
}

.user-form {
  width: 60%;
  margin: 20px auto;
}
</style>