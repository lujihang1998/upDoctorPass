<script setup lang="ts">
import { getHospitLelAndGeo } from '@/api/home/index.ts'
import type { HospitalLevelAndRegion, HospitalLevelAndRegionResponseData } from '@/api/home/types.ts'

defineOptions({ name: 'Region' })
const emit = defineEmits<{
    (event: 'getRegion', region: string): void
}>()

let regionArr = ref<HospitalLevelAndRegion[]>([])
const regionFlag = ref<string>('')

onMounted(() => {
    getHospitalRegion()
})

const getHospitalRegion = async () => {
    const { data, code }: HospitalLevelAndRegionResponseData = await getHospitLelAndGeo('Beijin')
    if (code == 200) {
        regionArr.value = data
    }
}

const changeRegion = (region: string) => {
    regionFlag.value = region
    emit('getRegion', region)
}
</script>

<template>
    <div class="region">
        <div class="content">
            <div class="left">地区:</div>
            <ul>
                <li :class="{ active: regionFlag == '' }" @click="changeRegion('')">全部</li>
                <li v-for="item in regionArr" :key="item.value" :class="{ active: regionFlag == item.value }"
                    @click="changeRegion(item.value)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>
  
  
<style scoped lang="scss">
.region {
    color: #7f7f7f;
    margin-top: 20px;

    .content {
        display: flex;

        .left {
            width: 50px;
        }

        ul {
            flex: 1;
            display: flex;
            flex-wrap: wrap;

            li {
                margin-right: 10px;
                margin-bottom: 10px;

                &.active {
                    color: #55a6fe;
                }
            }

            li:hover {
                color: #55a6fe;
                cursor: pointer;
            }
        }
    }
}
</style>
  