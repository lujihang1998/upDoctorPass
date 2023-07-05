<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetail'

const route = useRoute()
const detailStore = useDetailStore()

onMounted(() => {
    detailStore.getHosDetail(route?.query?.hoscode as string)
})

</script>

<template>
    <div class="flex">
        <div class="menu flex flex-col items-center">
            <div class="top">
                <i class="i-ep:home-filled"></i>
                <span> / 医院信息</span>
            </div>
            <el-menu router :default-active="route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/hospital/register">
                    <i class="i-ep:menu"></i>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/hospital/detail">
                    <i class="i-ep:document"></i>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item index="/hospital/notice">
                    <i class="i-ep:setting"></i>
                    <span>预约通知</span>
                </el-menu-item>
                <el-menu-item index="/hospital/close">
                    <i class="i-ep:info-filled"></i>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item index="/hospital/search">
                    <i class="i-ep:search"></i>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
.menu {
    flex: 2;

    .top {
        display: flex;
        color: #7f7f7f;
    }
}

.content {
    flex: 8;
}
</style>
