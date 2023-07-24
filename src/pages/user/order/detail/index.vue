<script setup lang="ts">
import { getOrderInfo } from '@/api/user'
import type { OrderInfoResponseData } from '@/api/user/types'

defineOptions({ name: "OrderDetial" })

const $route = useRoute()
const orderInfo = ref<OrderInfo>({} as OrderInfo)

onMounted(() => {
  fetchOrderInfo()
})

const fetchOrderInfo = async () => {
  const id = $route.query.orderId as string
  const { data, code }: OrderInfoResponseData = await getOrderInfo(id)
  if (code === 200) {
    orderInfo.value = data
  }
}
</script>

<template>
  <el-card class="detail-card">
    <template #header>
      <div class="detail-header">挂号详情</div>
    </template>
    <div class="flex justify-between detail-top">
      <el-tag type="success">
        <div class="flex">
          <i class="i-ep:check"></i>
          <span class="ml-5px">{{ orderInfo.param?.orderstatusstringl }}</span>
        </div>
      </el-tag>
      <div class="flex items-center">
        <img class="w-40px h-40px" src="@/assets/images/code_app.png" alt="">
        <div class="ml-10px text-[14px] leading-[20px]">
          <p>微信 关注 "北京114预约挂号" </p>
          <p>"快速预约挂号"</p>
        </div>
      </div>
    </div>
    <div class="flex justify-between detail-bottom">
      <div class="detail-bottom-left">
        <el-descriptions :column="1" border>
          <el-descriptions-item label-align="right" label="就诊人信息">{{ orderInfo.patientName }}</el-descriptions-item>
          <el-descriptions-item label-align="right" label="就诊日期">{{ orderInfo.reserveDate }}</el-descriptions-item>
          <el-descriptions-item label-align="right" label="就诊医院">{{ orderInfo.hosname }}</el-descriptions-item>
          <el-descriptions-item label-align="right" label="就诊科室">{{ orderInfo.depname }}</el-descriptions-item>
          <el-descriptions-item label-align="right" label="医生职称">{{ orderInfo.title }}</el-descriptions-item>
          <el-descriptions-item label-align="right" label="医事服务费">{{ orderInfo.amount }}</el-descriptions-item>
          <el-descriptions-item label-align="right" label="挂号单号">{{ orderInfo.outTradeNo }}</el-descriptions-item>
          <el-descriptions-item label-align="right" label="挂号时间">{{ orderInfo.createTime }}</el-descriptions-item>
        </el-descriptions>
        <el-button-group>
          <el-button>取消预约</el-button>
          <el-button type="primary">支付</el-button>
        </el-button-group>
      </div>
      <div class="detail-bottom-right">
        <el-card>
          <template #header>
            <div class="right-header">注意事项</div>
          </template>      
          <p>1.请确认就诊人信息是否准确, 若填写辑误将无法取号就诊, 损失由本人承担:</p>   
          <p class="text-[red]">2.[取号] 就诊当天需在{{ orderInfo.fetchTime }}前 在医院跟取号，未取号视为爽约, 该号不退不换:</p> 
          <p>3.[退号] 在{{ orderInfo.quitTime }}前可在线退号, 逾期将不可办理退号退费;</p> 
          <p>4.北东114预约挂号支持自费患者使用身份证预约, 同时支持北京市医保患者使用北京社保卡在平台预约取号。请于就诊当日, 携带预约挂号所使用的有效身份证件到院取号;</p> 
          <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
        </el-card>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.detail-card {
  .detail-header {
    color: #7f7f7f;
    font-weight: 900;
  }

  .detail-top {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  .detail-bottom {
    margin-top: 20px;
  
    &-left {
      flex: 4;
    }

    &-right {
      flex: 6;

      p {
        line-height: 30px;
      }
    }
  }
}
</style>
