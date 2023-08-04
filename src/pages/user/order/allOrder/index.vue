<script setup lang='ts'>
import { getUserAllOrder, getAllUser, getOrderStatus } from '@/api/user'
import { OrderResponseData, Order, UserResponseData, User, OrderStatusResponseData, OrderStatus } from '@/api/user/types'

defineOptions({ name: 'AllOrder' })

const $router = useRouter()

const userList = ref<User[]>([])
const orderStatusList = ref<OrderStatus[]>([])
const tableData = ref<Order[]>([])
const patientId = ref<string>('')
const orderStatus = ref<string>('')
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)

onMounted(() => {
  fetchAllOrder()
  fetchUser()
  fetchOrderStatus()
})

const fetchAllOrder = async () => {
  const { data, code }: OrderResponseData = await getUserAllOrder(pageNo.value, pageSize.value, patientId.value, orderStatus.value)
  if (code === 200) {
    tableData.value = data.records
    total.value = data.total
  }
}

const fetchUser = async () => {
  const { data, code }: UserResponseData = await getAllUser()
  if (code === 200) {
    userList.value = data
  }
}

const fetchOrderStatus = async () => {
  const { data, code }: OrderStatusResponseData = await getOrderStatus()
  if (code === 200) {
    orderStatusList.value = data
  }
}

const goDetail = (row: Order) => {
  $router.push({ path: '/user/order', query: { orderId: row.id } })
}

const handleSizeChange = (_value: number): void => {
  fetchAllOrder()
}

const handleCurrentChange = (_value: number): void => {
  fetchAllOrder()
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="就诊人">
        <el-select v-model="patientId" placeholder="选择所有患者" @change="fetchAllOrder">
          <el-option v-for="user in userList" :key="user.id" :label="user.name" :value="user.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="orderStatus" placeholder="选择订单状态" @change="fetchAllOrder">
          <el-option v-for="status in orderStatusList" :key="status.status" :label="status.comment" :value="status.status"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table class="my-10px" :data="tableData" border stripe>
      <el-table-column prop="reserveDate" label="就诊时间" />
      <el-table-column prop="hosname" label="医院" />
      <el-table-column prop="depname" label="科室" />
      <el-table-column prop="title" label="医生" />
      <el-table-column prop="amount" label="服务费" />
      <el-table-column prop="patientName" label="就诊人" />
      <el-table-column prop="param.orderStatusString" label="订单状态" />
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button @click="goDetail(row)" type="primary" text>详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" background
      layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </el-card>
</template>

<style lang="scss" scoped></style>