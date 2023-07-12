<script setup lang="ts">
import useUserStore from '@/store/modules/user'

defineOptions({ name: 'Layout' })

const userStore = useUserStore()
</script>

<template>
    <div class="layout">
        <HostpitalTop />
        <div class="content w-full">
            <router-view></router-view>
        </div>
        <HostpitalBottom />
        <Login v-if="userStore.visiable"/>
    </div>
</template>

<style scoped lang="scss">
.content {
    width: 1200px;
    min-height: 700px;
    margin: 70px auto 0;
}
</style>
