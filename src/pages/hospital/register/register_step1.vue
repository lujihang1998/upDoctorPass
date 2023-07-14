<script setup lang="ts">
import { getHospitalWork, getHospitalDoctor } from '@/api/hospital/index'
import { HosPitalWorkData, HosPitalWorkDataResponseData, BaseMap, DoctorResponseData, Doctor } from '@/api/hospital/types'

defineOptions({ name: 'register_step1' })

const $route = useRoute()
const currentPage = ref<number>(1)
const limit = ref<number>(6)
let workData = ref<HosPitalWorkData>({
  total: 0,
  bookingScheduleList: [],
  baseMap: {} as BaseMap
})
let workTime = ref<any>({})
let doctorArr = ref<Doctor[]>([])
const moringDoctor = computed(() => {
  return doctorArr.value.filter((item: Doctor) => item.workTime == 0)
})
const afterDoctor = computed(() => {
  return doctorArr.value.filter((item: Doctor) => item.workTime != 0)
})

onMounted(() => {
  getHospitalWorkDetail()
})

const getHospitalWorkDetail = async (): Promise<any> => {
  const { hoscode, depcode } = $route.query as any
  const { code, data }: HosPitalWorkDataResponseData = await getHospitalWork(currentPage.value, limit.value, hoscode, depcode)
  if (code === 200) {
    workData.value = data
    const firstWorkTime = data?.bookingScheduleList.find(item => item.status !== -1)
    workTime.value = firstWorkTime || {}
    getHospitalDoctorDetail()
  }
}

const getHospitalDoctorDetail = async (): Promise<any> => {
  if (!workTime.value.workDate) return
  const { hoscode, depcode } = $route.query as any
  const { code, data }: DoctorResponseData = await getHospitalDoctor(hoscode, depcode, workTime.value.workDate)
  if (code === 200) {
    doctorArr.value = data
  }
}

const changeTime = (item: any): void => {
  if (item.status === -1) return
  workTime.value = item
  getHospitalDoctorDetail()
}

const currentChange = (_value: number): void => {
  getHospitalWorkDetail()
}
</script>

<template>
  <div class="wrap">
    <div class="top">
      <div class="hosname">{{ workData.baseMap?.hosname }}</div>
      <div class="line"></div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div class="dot">.</div>
      <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
    </div>
    <div class="flex center">
      <h1 class="timer">{{ workData.baseMap?.workDateString }}</h1>
      <div class="flex select-time">
        <div @click="changeTime(item)" class="select-time-item"
          :class="{
            'select-time-item-active': item.status === -1 || item.availableNumber === -1,
            'current-select': item.workDate === workTime.workDate
          }"
          v-for="(item, index) in workData.bookingScheduleList" :key="index">
          <div class="select-time-item-top">{{ item.workDate }} - {{ item.dayOfWeek }}</div>
          <div class="select-time-item-bottom">
            <div v-if="item.status === -1">停止挂号</div>
            <div v-else-if="item.status === 0">
              <span>{{ item.availableNumber === -1 ? '无号' : `有号(${item.availableNumber})` }}</span>
            </div>
            <div v-else>即将放号</div>
          </div>
        </div>
      </div>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="limit" layout="prev, pager, next"
        :total="workData.total" @current-change="currentChange" />
    </div>
    <div class="bottom">
      <div v-if="workTime.status == 1" class="will">
        <span class="will-time">2023年7月15日 8:30:00</span>
        <span class="ml-2">放号</span>
      </div>
      <div v-else class="doctor">
        <div class="moring">
          <div class="flex items-center tip">
            <svg t="1689318138982" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="3000" width="32" height="32">
              <path
                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                fill="#1296db" p-id="3001"></path>
            </svg>
            <span class="tip-text">上午号源</span>
          </div>
          <div v-for="doctor in moringDoctor" :key="doctor.id" class="flex justify-between doc-info">
            <div class="left">
              <div class="left-info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="left-info-describe">{{ doctor.skill }}</div>
            </div>
            <div class="flex items-center justify-between right">
              <div class="money">¥{{ doctor.amount }}</div>
              <el-button type="primary">剩余{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
        <div class="moring">
          <div class="flex items-center tip">
            <svg t="1689319898628" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="3769" width="32" height="32">
              <path
                d="M512 224c-159.06 0-288 128.94-288 288s128.94 288 288 288 288-128.94 288-288-128.94-288-288-288z m0 512c-123.71 0-224-100.29-224-224s100.29-224 224-224 224 100.29 224 224-100.29 224-224 224zM512 64a32 32 0 0 0-32 32v64a32 32 0 0 0 64 0V96a32 32 0 0 0-32-32zM512 832a32 32 0 0 0-32 32v64a32 32 0 0 0 64 0v-64a32 32 0 0 0-32-32zM195.22 195.22a32 32 0 0 0 0 45.25l45.25 45.25a32 32 0 0 0 45.25-45.25l-45.25-45.25a32 32 0 0 0-45.25 0zM738.27 738.27a32 32 0 0 0 0 45.25l45.25 45.25a32 32 0 0 0 45.25-45.25l-45.25-45.25a32 32 0 0 0-45.25 0zM64 512a32 32 0 0 0 32 32h64a32 32 0 0 0 0-64H96a32 32 0 0 0-32 32zM832 512a32 32 0 0 0 32 32h64a32 32 0 0 0 0-64h-64a32 32 0 0 0-32 32zM195.22 828.78a32 32 0 0 0 45.25 0l45.25-45.25a32 32 0 0 0-45.25-45.25l-45.25 45.25a32 32 0 0 0 0 45.25zM738.27 285.73a32 32 0 0 0 45.25 0l45.25-45.25a32 32 0 0 0-45.25-45.25l-45.25 45.25a32 32 0 0 0 0 45.25z"
                p-id="3770" fill="#1296db"></path>
            </svg>
            <span class="tip-text">下午号源</span>
          </div>
          <div v-for="doctor in afterDoctor" :key="doctor.id" class="flex justify-between doc-info">
            <div class="left">
              <div class="left-info">
                <span>{{ doctor.title }}</span>
                <span>|</span>
                <span>{{ doctor.docname }}</span>
              </div>
              <div class="left-info-describe">{{ doctor.skill }}</div>
            </div>
            <div class="flex items-center justify-between right">
              <div class="money">¥{{ doctor.amount }}</div>
              <el-button type="primary">剩余{{ doctor.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;

    .line {
      width: 1px;
      height: 18px;
      background: #7f7f7f;
      margin: 0px 5px;
    }

    .dot {
      margin: 0px 10px;
      color: #7f7f7f;
    }
  }

  .center {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;

    .timer {
      color: #7f7f7f;
      font-weight: bold;
    }

    .select-time {
      width: 100%;
      margin: 30px 0;

      .select-time-item {
        width: 150px;
        border: 1px solid skyblue;
        margin: 0 5px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        transition: all ease-in-out .15s;

        &.select-time-item-active {
          color: #7f7f7f;
          border: 1px solid #7f7f7f;
          cursor: not-allowed;

          .select-time-item-top {
            background-color: #ccc;
          }
        }
        
        &.current-select {
          transform: scale(1.1);
        }

        &-top {
          height: 30px;
          line-height: 30px;
          background-color: #e8f2ff;
        }

        &-bottom {
          height: 50px;
          line-height: 50px;
        }
      }
    }
  }

  .bottom {
    .will {
      font-size: 24px;
      text-align: center;
      font-weight: 800;
      color: #c4c2c2ef;

      .will-time {
        color: skyblue;
      }
    }

    .doctor {
      .tip {
        .tip-text {
          color: #7f7f7f;
          font-weight: 900;
          margin-left: 5px;
        }
      }

      .doc-info {
        margin: 10px 0;
        border-bottom: 1px solid #ccc;

        .left {
          .left-info {
            color: skyblue;
            margin: 10px 0;

            span {
              margin: 0 5px;
              font-size: 18px;
              font-weight: 900;
            }
          }

          .left-info-describe {
            margin: 10px 0;
            color: #7f7f7f;
          }
        }

        .right {
          width: 150px;
          color: #7f7f7f;
          font-weight: 900;
        }
      }
    }
  }
}
</style>