
<script setup lang="ts">
import Visitor from './visitor.vue'
import { getDoctorInfo, getUser } from '@/api/hospital'
import { UserResponseData, User, DoctorInfoResponseData, Doctor } from '@/api/hospital/types'

defineOptions({ name: 'register_step2' })

const $route = useRoute()

const userList = ref<User[]>([])
const docInfo = ref<Doctor>({} as Doctor)
const currentIndex = ref<number>(-1)

onMounted(() => {
  getUserList()
  fetchDoctorInfo()
})

const getUserList = async () => {
  const { data, code }: UserResponseData = await getUser()
  if (code === 200) {
    userList.value = data
  }
}

const fetchDoctorInfo = async () => {
  const scheduleId = $route.query.docId as string
  const { data, code }: DoctorInfoResponseData = await getDoctorInfo(scheduleId)
  if (code === 200) {
    docInfo.value = data
  }
}

const changeIndex = (userIndex: number) => {
  currentIndex.value = currentIndex.value === userIndex ? -1 : userIndex
}
</script>

<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <el-card class="my-20px">
      <template #header>
        <div class="flex justify-between items-center">
          <span>请选择就诊人</span>
          <el-button type="primary">
            <template #icon>
              <i class="i-ep:user"></i>
            </template>
            添加就诊人
          </el-button>
        </div>
      </template>
      <div class="user">
        <Visitor @click="changeIndex(userIndex)" class="user-item" :user="user" :userIndex="userIndex" :currentIndex="currentIndex" v-for="(user, userIndex) in userList"
          :key="user.id" />
      </div>
    </el-card>
    <el-card class="my-20px">
      <template #header>
        <span>挂号信息</span>
      </template>
      <el-descriptions border :column="2">
        <el-descriptions-item label="就诊日期:">{{ docInfo.workDate }}</el-descriptions-item>
        <el-descriptions-item label="就诊医院:">{{ docInfo.param?.hosname }}</el-descriptions-item>
        <el-descriptions-item label="就诊科室:">{{ docInfo.param?.depname }}</el-descriptions-item>
        <el-descriptions-item label="医生姓名:">{{ docInfo.docname }}</el-descriptions-item>
        <el-descriptions-item label="医生职称:">{{ docInfo.title }}</el-descriptions-item>
        <el-descriptions-item label="医生专长:">{{ docInfo.skill }}</el-descriptions-item>
        <el-descriptions-item label="医事服务费:"><span style="color: red;">{{ docInfo.amount }}</span></el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="text-center my-10px">
      <el-button type="primary" :disabled="currentIndex === -1">确认挂号</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  .tip {
    font-weight: 900;
    font-size: 20px;
    color: #7f7f7f;
  }

  .user {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 10px;
    row-gap: 10px;
  }
}
</style>