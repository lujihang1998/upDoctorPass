<script setup lang='ts'>
import { getUser } from '@/api/hospital'
import { UserResponseData, User } from '@/api/hospital/types'

defineOptions({ name: 'Patient' })

const userList = ref<User[]>([])

onMounted(() => {
  getUserList()
})

const ceareUser = () => {
  return h('div', { class: 'i-ep:user' })
}

const getUserList = async () => {
  const { data, code }: UserResponseData = await getUser()
  if (code === 200) {
    userList.value = data
  }
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="flex justify-between items-center card-header">
        <span>就诊人管理</span>
        <el-button type="success" :icon="ceareUser()">添加就诊人</el-button>
      </div>
    </template>
    <div class="grid grid-cols-3 gap-10px">
      <Visitor :user="user" :userIndex="userIndex" v-for="(user, userIndex) in userList" :key="user.id" />
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>