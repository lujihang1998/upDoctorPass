<script setup lang="ts">
import useUserStore from "@/store/modules/user"

defineOptions({ name: "HostpitalTop" })

const $router = useRouter()
const userStore = useUserStore()

const goHome = (): void => {
    $router.push({ path: "/home" })
}

const login = (): void => {
    userStore.visiable = true
}

const loginOut = (): void => {
    userStore.logout()
    goHome()
}

const goUser = (path: string): void => {
    $router.push( path )
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
                <p class="login" @click="login" v-if="!userStore.userInfo.name">
                    登录/注册
                </p>
                <!-- 如果有用户信息展示用户信息 -->
                <el-dropdown v-else>
                    <span class="el-dropdown-link flex">
                        {{ userStore.userInfo.name }}
                        <i class="i-ep:arrow-down w-[1em] h-[1em]"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
                            <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
                            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
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
