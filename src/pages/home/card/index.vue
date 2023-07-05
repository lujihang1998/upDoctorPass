<script setup lang="ts">
defineOptions({ name: 'Card' })
const $props = defineProps(['hospitalInfo'])

const $router = useRouter()
const goDetail = () => {
    $router.push({ path: "/hospital/register", query: { hoscode: $props.hospitalInfo.hoscode } })
}
</script>

<template>
    <el-card class="box-card" shadow="hover" @click="goDetail">
        <div class="flex justify-between">
            <div class="left w-[60%]">
                <div class="left-top">
                    {{ hospitalInfo.hosname }}
                </div>
                <div class="tip">
                    <div class="level">
                        <svg t="1688202299538" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1623" width="16" height="16">
                            <path
                                d="M170.666667 938.666667a85.333333 85.333333 0 0 1-85.333334-85.333334v-341.333333a85.333333 85.333333 0 0 1 85.333334-85.333333h85.333333l128-341.333334h42.666667a170.666667 170.666667 0 0 1 170.666666 170.666667v170.666667h232.021334a85.333333 85.333333 0 0 1 82.773333 106.026666l-69.12 276.693334A170.666667 170.666667 0 0 1 677.376 938.666667H170.666667z m85.333333-426.666667H170.666667v341.333333h85.333333v-341.333333z m187.136-341.333333L341.333333 442.154667V853.333333h336.085334a85.333333 85.333333 0 0 0 82.773333-64.64L829.354667 512H512V239.530667c0-35.925333-27.52-65.408-62.592-68.565334L443.136 170.666667z"
                                fill="#000000" p-id="1624"></path>
                        </svg>
                        <span>{{ hospitalInfo.param.hostypeString }}</span>
                    </div>
                    <div class="time">
                        <svg t="1684986208058" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4522" width="16" height="16">
                            <path
                                d="M931.2 518.4c0-233.6-188.8-419.2-419.2-419.2-233.6 0-419.2 188.8-419.2 419.2 0 137.6 67.2 259.2 169.6 336l-57.6 51.2c-9.6 9.6-12.8 25.6-3.2 35.2 9.6 9.6 25.6 12.8 35.2 3.2l70.4-57.6c60.8 35.2 131.2 54.4 208 54.4 80 0 153.6-22.4 214.4-60.8 0 0 0 0 3.2 3.2l73.6 60.8c9.6 9.6 25.6 6.4 35.2-3.2 9.6-9.6 6.4-25.6-3.2-35.2l-64-54.4C867.2 774.4 931.2 652.8 931.2 518.4zM512 889.6c-204.8 0-371.2-166.4-371.2-371.2s166.4-371.2 371.2-371.2 371.2 166.4 371.2 371.2S716.8 889.6 512 889.6z"
                                p-id="4523"></path>
                            <path
                                d="M208 96c-9.6-9.6-25.6-9.6-35.2 0l-118.4 118.4c-9.6 9.6-9.6 25.6 0 35.2 9.6 9.6 25.6 9.6 35.2 0l118.4-118.4C217.6 121.6 217.6 105.6 208 96z"
                                p-id="4524"></path>
                            <path
                                d="M969.6 211.2l-118.4-115.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l118.4 115.2c9.6 9.6 25.6 9.6 35.2 0C979.2 236.8 979.2 220.8 969.6 211.2z"
                                p-id="4525"></path>
                            <path
                                d="M707.2 300.8l-144 128c0 0 0 3.2-3.2 3.2-12.8-3.2-22.4-6.4-35.2-6.4-12.8 0-22.4 3.2-32 6.4 0-3.2-3.2-3.2-3.2-6.4l-92.8-83.2c-9.6-9.6-25.6-9.6-35.2 3.2-9.6 9.6-9.6 25.6 3.2 35.2l89.6 80c-16 19.2-28.8 41.6-28.8 70.4 0 54.4 44.8 102.4 102.4 102.4 54.4 0 102.4-44.8 102.4-102.4 0-25.6-9.6-48-25.6-67.2l140.8-124.8c9.6-9.6 9.6-25.6 3.2-35.2C732.8 294.4 716.8 294.4 707.2 300.8zM524.8 582.4c-28.8 0-51.2-22.4-51.2-51.2 0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2C576 556.8 553.6 582.4 524.8 582.4z"
                                p-id="4526"></path>
                        </svg>
                        <span>每天{{ hospitalInfo.bookingRule?.releaseTime }}放号</span>
                    </div>
                </div>
            </div>
            <img class="w-[50px] h-[50px]" :src="`data:image/jpeg;base64,${hospitalInfo.logoData}`" alt="">
        </div>
    </el-card>
</template>

<style scoped lang="scss">
.tip {
    color: #7f7f7f;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .level {
        display: flex;
        align-items: center;

        span {
            margin-left: 5px;
        }
    }

    .time {
        display: flex;
        align-items: center;

        span {
            margin-left: 5px;
        }
    }
}
</style>
