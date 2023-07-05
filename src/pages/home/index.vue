<script setup lang="ts">
import { getHospitalList } from '@/api/home/index'
import type { Hospital, HospitalResponseData } from '@/api/home/types'

import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'
import Tip from './tip/index.vue'

defineOptions({ name: 'Home' })

let hostype = ref<string>("")
let districtCode = ref<string>("")
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
let hasHospitalArr = ref<Hospital[]>([])

onMounted(() => {
    getHospitalInfo()
})

const getHospitalInfo = async () => {
    const { data, code }: HospitalResponseData = await getHospitalList(currentPage.value, pageSize.value, { hostype: hostype.value, districtCode: districtCode.value })
    if (code == 200) {
        hasHospitalArr.value = data.content
        total.value = data.totalElements
    }
}

const getLevel = (level: string) => {
    hostype.value = level
    getHospitalInfo()
}

const getRegion = (region: string) => {
    districtCode.value = region
    getHospitalInfo()
}

const handleSizeChange = (): void => {
    currentPage.value = 1
    getHospitalInfo()
}

const handleCurrentChange = (): void => {
    getHospitalInfo()
}
</script>

<template>
    <div>
        <Carousel />
        <Search />
        <el-row :gutter="20">
            <el-col :span="20">
                <Level @getLevel="getLevel" />
                <Region @getRegion="getRegion" />
                <div class="flex flex-wrap justify-between">
                    <Card class="w-[48%] my-10px" v-for="item in hasHospitalArr" :key="item.id" :hospitalInfo="item" />
                </div>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                    background layout="prev, pager, next, jumper, ->, sizes, total" :total="total">
                </el-pagination>
            </el-col>
            <el-col :span="4">
                <Tip />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss"></style>
