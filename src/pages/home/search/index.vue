<template>
    <div class="search w-full h-[50px]">
        <el-autocomplete v-model="hosname" size="large" class="inline-input" placeholder="请输入医院名称" :trigger-on-focus="false"
            :fetch-suggestions="querySearchAsync" @select="goDetail"></el-autocomplete>
        <el-button size="large" type="primary">
            <i class="i-ep:search"></i>
        </el-button>
    </div>
</template>
  
<script setup lang="ts">
import { getHospitalInfo } from '@/api/home/index'
import type { HospitalInfoResponseData } from '@/api/home/types'

defineOptions({ name: 'Search' })

const $router = useRouter()
const hosname = ref<string>('')

const querySearchAsync = async (keyword: string, cb: (arg: any) => void) => {
    const { data }: HospitalInfoResponseData = await getHospitalInfo(keyword)
    let showData = data.map((item) => {
        return {
            value: item.hosname, // 展示的医院的名字
            hoscode: item.hoscode // 存储医院的编码
        }
    })
    cb(showData)
}

const goDetail = (item: any): void => {
    $router.push({ path: "/hospital/register", query: { hoscode: item.hoscode } })
}
</script>

<style scoped lang="scss">
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;

    ::v-deep(.el-input__wrapper) {
        width: 600px;
        margin-right: 10px;
    }
}
</style>
