<script setup lang="ts">
import { getHospitLelAndGeo } from '@/api/home/index.ts'
import type { HospitalLevelAndRegion, HospitalLevelAndRegionResponseData } from '@/api/home/types.ts'

defineOptions({ name: 'Level' })
const emit = defineEmits<{
    (event: 'getLevel', level: string): void
}>()

let levelArr = ref<HospitalLevelAndRegion[]>([])
const activeFlag = ref<string>('')

onMounted(() => {
    getHospitalLevel()
})

const getHospitalLevel = async () => {
    const { data, code }: HospitalLevelAndRegionResponseData = await getHospitLelAndGeo('HosType')
    if (code == 200) {
        levelArr.value = data
    }
}

const changeLevel = (level: string) => {
    activeFlag.value = level
    emit('getLevel', level)
}
</script>

<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级:</div>
            <ul class="hospital">
                <li :class="{ active: activeFlag == '' }" @click="changeLevel('')">全部</li>
                <li v-for="level in levelArr" :class="{ active: activeFlag == level.value }" :key="level.value"
                    @click="changeLevel(level.value)">{{ level.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.level {
    color: #7f7f7f;
    margin-top: 20px;

    h1 {
        font-weight: 900;
        margin: 10px 0px;
    }

    .content {
        display: flex;

        .left {
            width: 50px;
        }

        .hospital {
            flex: 1;
            display: flex;

            li {
                margin-right: 10px;

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