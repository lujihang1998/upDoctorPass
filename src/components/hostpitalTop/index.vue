<script setup lang="ts">
defineOptions({ name: 'HostpitalTop' })

const $router = useRouter()
const goHome = (): void => {
    $router.push({ path: "/home" })
}
</script>

<template>
    <header class="fixed top-0 z-999 w-full h-[70px] bg-white flex justify-center">
        <div class="top_content">
            <div class="top_content_left" @click="goHome">
                <img src="../../assets/images/logo.png" alt="" />
                <p>尚医通 预约挂号统一平台</p>
            </div>
            <div class="top_content_right">
                <p class="help">帮助中心</p>
                <!-- 如果没有用户名字:显示登录注册 -->
                <p class="login" v-if="true">登录/注册</p>
                <!-- 如果有用户信息展示用户信息 -->
                <el-dropdown v-else>
                    <span class="el-dropdown-link">
                        fuckman
                        <span class="iconify" data-icon="ep:arrow-down" data-inline="false"></span>
                        <i class="i-ep:arrow-down"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>实名认证</el-dropdown-item>
                            <el-dropdown-item>挂号订单</el-dropdown-item>
                            <el-dropdown-item>就诊人管理</el-dropdown-item>
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
.top_content {
    width: 1200px;
    height: 70px;
    background: white;
    display: flex;
    justify-content: space-between;

    .top_content_left {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }

        p {
            font-size: 20px;
            color: #55a6fe;
        }
    }

    .top_content_right {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #bbb;

        .help {
            margin-right: 10px;
        }
    }
}
</style>
