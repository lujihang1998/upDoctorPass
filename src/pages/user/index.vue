<script setup lang="ts">
defineOptions({ name: 'user' })

const $route = useRoute()
</script>

<template>
    <div class="flex">
        <div class="menu flex flex-col items-center">
            <div class="top">
                <i class="i-ep:home-filled"></i>
                <span> / 会员中心</span>
            </div>
            <el-menu router :default-active="$route.path" class="el-menu-vertical-demo">
                <el-menu-item index="/user/certification">
                    <i class="i-ep:postcard"></i>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/user/order">
                    <i class="i-ep:document"></i>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/user/patient">
                    <i class="i-ep:user"></i>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/user/profile">
                    <i class="i-ep:info-filled"></i>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/user/feedback">
                    <i class="i-ep:search"></i>
                    <span>意见反馈</span>
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
