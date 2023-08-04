<script setup lang='ts'>
import { getUser } from '@/api/hospital'
import { getCertificationType, getCity, postUser, updateUser } from '@/api/user'
import { UserResponseData, User } from '@/api/hospital/types'
import { CertificatesTypeResponseData, CertificatesType, AddOrUpdateUser } from '@/api/user/types'
// @ts-ignore
import type { CascaderProps, FormRules } from 'element-plus'

defineOptions({ name: 'Patient' })

const patientsForm = ref()
const scence = ref<number>(0)
const userList = ref<User[]>([])
const certificatesType = ref<CertificatesType[]>([])
const userParams = reactive<AddOrUpdateUser>({
  name: '',
  certificatesNo: '',
  certificatesType: '',
  sex: 0,
  birthdate: '',
  phone: '',
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: '',
  contactsName: '',
  contactsCertificatesType: '',
  contactsCertificatesNo: '',
  contactsPhone: ''
})
const validatorCertificatesNo = (_rule: any, value: any, callback: any) => {
  let sfzReg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
  let hkbReg = /^\d{9}$/
  if (sfzReg.test(value) || hkbReg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的身份证或者户口本号码'))
  }
}
const rules = reactive<FormRules<AddOrUpdateUser>>({
  name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  certificatesType: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
  certificatesNo: [{ required: true, validator: validatorCertificatesNo }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  birthdate: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
  phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  isMarry: [{ required: true, message: '请选择婚姻状态', trigger: 'change' }],
  isInsure: [{ required: true, message: '请选择自费还是医保', trigger: 'change' }],
  addressSelected: [{ required: true, message: '请选择当前住址', trigger: 'change' }],
  address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
})
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node: any, resolve: any) {
    const { level, value = '' } = node
    const levelId = level === 0 ? '86' : value
    let { code, data }: any = await getCity(levelId)
    if (code === 200) {
      const nodeList = data.map((item: any) => {
        return {
          id: item.id,
          value: item.value,
          label: item.name,
          leaf: !item.hasChildren
        }
      })
      resolve(nodeList)
    } else {
      resolve(null)
    }
  },
}

onMounted(() => {
  fetchUserList()
  fetchCertificationType()
})

const ceareUser = () => {
  return h('div', { class: 'i-ep:user' })
}

const fetchUserList = async () => {
  const { data, code }: UserResponseData = await getUser()
  if (code === 200) {
    userList.value = data
  }
}

const fetchCertificationType = async () => {
  const { data, code }: CertificatesTypeResponseData = await getCertificationType()
  if (code === 200) {
    certificatesType.value = data
  }
}

const addUser = (): void => {
  scence.value = 1
}

const changeScence = (_user: User) => {
  console.log(_user);

  // scence.value = 1
}

const deleteUser = (_user: User) => {

}

const disabledDate = (data: Date) => {
  const currentData = new Date()
  const contrastData = new Date(data)
  return currentData < contrastData
}

const submit = async () => {
  await patientsForm.value.validate()
  try {
    userParams.id ? await updateUser(userParams) : await postUser(userParams)
    scence.value = 0
    reset()
    fetchUserList()
    ElMessage({ type: 'success', message: userParams.id ? '更新成功' : '新增成功' })
  } catch (error) {
    ElMessage({ type: 'error', message: userParams.id ? '更新失败' : '新增失败' })
  }
}

const reset = () => {
  Object.assign(userParams, {
    id: '',
    name: '',
    certificatesNo: '',
    certificatesType: '',
    sex: 0,
    birthdate: '',
    phone: '',
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: '',
    contactsName: '',
    contactsCertificatesType: '',
    contactsCertificatesNo: '',
    contactsPhone: ''
  })
}
</script>

<template>
  <el-card v-if="scence === 0">
    <template #header>
      <div class="flex justify-between items-center card-header">
        <span>就诊人管理</span>
        <el-button @click="addUser" type="success" :icon="ceareUser()">添加就诊人</el-button>
      </div>
    </template>
    <div class="grid grid-cols-3 gap-10px">
      <Visitor @deleteUser="deleteUser" @changeScence="changeScence" :user="user" :userIndex="userIndex"
        v-for="(user, userIndex) in userList" :key="user.id" />
    </div>
  </el-card>
  <el-card v-else class="form">
    <template #header>
      <div class="flex justify-between items-center card-header">
        <span>添加就诊人</span>
        <el-button @click="scence = 0" type="primary">取消</el-button>
      </div>
    </template>
    <el-divider content-position="left">就诊人信息</el-divider>
    <el-form ref="patientsForm" :model="userParams" :rules="rules" :label-width="110" class="my-10px">
      <div class="w-[60%] mx-auto">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="userParams.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="证件类型" prop="certificatesType">
          <el-select v-model="userParams.certificatesType" class="w-full" placeholder="请选择证件类型">
            <el-option v-for="item in certificatesType" :key="item.value" :label="item.name"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificatesNo">
          <el-input v-model="userParams.certificatesNo" placeholder="请输入证件号码" />
        </el-form-item>
        <el-form-item label="用户性别" prop="sex">
          <el-radio-group v-model="userParams.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthdate">
          <el-date-picker v-model="userParams.birthdate" :disabled-date="disabledDate" type="date"
            value-format="YYYY-MM-DD" placeholder="请选择出生日期" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="userParams.phone" placeholder="请输入手机号码" />
        </el-form-item>
      </div>
      <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
      <div class="w-[60%] mx-auto">
        <el-form-item label="婚姻状态" prop="isMarry">
          <el-radio-group v-model="userParams.isMarry">
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保" prop="isInsure">
          <el-radio-group v-model="userParams.isInsure">
            <el-radio :label="1">自费</el-radio>
            <el-radio :label="0">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址" prop="addressSelected">
          <el-cascader v-model="userParams.addressSelected" :props="props" placeholder="请选择" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="userParams.address" placeholder="请输入" />
        </el-form-item>
      </div>
      <el-divider content-position="left">联系人信息（选填）</el-divider>
      <div class="w-[60%] mx-auto">
        <el-form-item label="联系人姓名">
          <el-input v-model="userParams.contactsName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="联系人证件类型">
          <el-select v-model="userParams.contactsCertificatesType" class="w-full" placeholder="请选择证件类型">
            <el-option v-for="item in certificatesType" :key="item.value" :label="item.name"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人证件号码">
          <el-input v-model="userParams.contactsCertificatesNo" placeholder="请输入证件号码" />
        </el-form-item>
        <el-form-item label="联系人手机号码">
          <el-input v-model="userParams.contactsPhone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary">提交</el-button>
          <el-button @click="reset" type="primary">重写</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>