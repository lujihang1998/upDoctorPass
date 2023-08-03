<script setup lang="ts">
// @ts-ignore
import QRCode from 'qrcode'
import { getOrderInfo, getCancelOrder, getQrcode, getQueryPayStatus } from "@/api/user"
import type { OrderInfoResponseData, OrderInfo, PayInfoResponseData, PayStatusResponseData } from "@/api/user/types"

defineOptions({ name: "OrderDetial" })

const $route = useRoute()
let orderInfo = ref<OrderInfo>({} as OrderInfo)
let dialogVisible = ref<boolean>(false)
let imgUrl = ref<string>('')
let timer = ref<ReturnType<typeof setTimeout>>()

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

const cancle = async () => {
  try {
    const id = $route.query.orderId as string
    await getCancelOrder(id)
    fetchOrderInfo()
  } catch (error) {
    ElMessage({ type: "error", message: "取消预约失败" })
  }
}

const openDialog = async () => {
  dialogVisible.value = true
  const id = $route.query.orderId as string
  const { data }: PayInfoResponseData = await getQrcode(id)
  imgUrl.value = await QRCode.toDataURL(data?.codeUrl || 'weixin://wxpay/bizpayurl?pr=6rI1fb7zz')
  timer.value = setInterval(async () => {
    const { data }: PayStatusResponseData = await getQueryPayStatus(id)
    if (data) {
      ElMessage({ type: "success", message: "支付成功" })
      closeDialog()
      clearInterval(timer.value)
      fetchOrderInfo()
    }
  }, 2000)
}

const closeDialog = () => {
  dialogVisible.value = false
  clearInterval(timer.value)
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
          <span class="ml-5px">{{ orderInfo.param?.orderStatusString }}</span>
        </div>
      </el-tag>
      <div class="flex items-center">
        <img class="w-40px h-40px" src="@/assets/images/code_app.png" alt="" />
        <div class="ml-10px text-[14px] leading-[20px]">
          <p>微信 关注 "北京114预约挂号"</p>
          <p>"快速预约挂号"</p>
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="detail-bottom-left">
            <el-descriptions :column="1" border>
              <el-descriptions-item label-align="right" label="就诊人信息">{{
                orderInfo.patientName || "xxxxxxxxx"
              }}</el-descriptions-item>
              <el-descriptions-item label-align="right" label="就诊日期">{{
                orderInfo.reserveDate || "xxxxxxxxx"
              }}</el-descriptions-item>
              <el-descriptions-item label-align="right" label="就诊医院">{{
                orderInfo.hosname || "xxxxxxxxx"
              }}</el-descriptions-item>
              <el-descriptions-item label-align="right" label="就诊科室">{{
                orderInfo.depname || "xxxxxxxxx"
              }}</el-descriptions-item>
              <el-descriptions-item label-align="right" label="医生职称">{{
                orderInfo.title || "xxxxxxxxx"
              }}</el-descriptions-item>
              <el-descriptions-item label-align="right" label="医事服务费">{{
                orderInfo.amount || "xxxxxxxxx"
              }}</el-descriptions-item>
              <el-descriptions-item label-align="right" label="挂号单号">{{
                orderInfo.outTradeNo || "xxxxxxxxx"
              }}</el-descriptions-item>
              <el-descriptions-item label-align="right" label="挂号时间">{{
                orderInfo.createTime || "xxxxxxxxx"
              }}</el-descriptions-item>
            </el-descriptions>
            <!-- <div v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1" class="mt-12px text-center"> -->
            <div class="mt-12px text-center">
              <el-button-group>
                <el-popconfirm @confirm="cancle" title="确认取消预约?">
                  <template #reference>
                    <el-button>取消预约</el-button>
                  </template>
                </el-popconfirm>
                <!-- <el-button v-if="orderInfo.orderStatus == 0" type="primary">支付</el-button> -->
                <el-button @click="openDialog" type="primary">支付</el-button>
              </el-button-group>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="detail-bottom-right">
            <el-card>
              <template #header>
                <div class="right-header">注意事项</div>
              </template>
              <p>
                1.请确认就诊人信息是否准确, 若填写辑误将无法取号就诊,
                损失由本人承担:
              </p>
              <p class="text-[red]">
                2.[取号] 就诊当天需在{{ orderInfo.fetchTime }}前
                在医院跟取号，未取号视为爽约, 该号不退不换:
              </p>
              <p>
                3.[退号] 在{{ orderInfo.quitTime }}前可在线退号,
                逾期将不可办理退号退费
              </p>
              <p>
                4.北东114预约挂号支持自费患者使用身份证预约,
                同时支持北京市医保患者使用北京社保卡在平台预约取号。请于就诊当日,
                携带预约挂号所使用的有效身份证件到院取号
              </p>
              <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog @close="closeDialog" v-model="dialogVisible" title="微信支付" width="400" :close-on-click-modal="false">
      <div class="qrcode-diolag-body">
        <img :src="imgUrl" alt="" />
        <p>请使用微信扫一扫</p>
        <p>打扫二维码支付</p>
      </div>
      <template #footer>
        <el-button @click="closeDialog" type="primary">关闭窗口</el-button>
      </template>
    </el-dialog>
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

    &-right {
      .el-card {
        box-shadow: none;
      }

      p {
        line-height: 30px;
      }
    }
  }

  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .qrcode-diolag-body {
    text-align: center;

    img {
      width: 250px;
    }

    p {
      line-height: 30px;
    }
  }
}
</style>
