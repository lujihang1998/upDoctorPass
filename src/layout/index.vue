<script setup lang="ts">
defineOptions({ name: 'Layout' })
</script>

<template>
    <div class="layout">
        <HostpitalTop />
        <div class="content w-full">
            <router-view></router-view>
        </div>
        <HostpitalBottom />
    </div>
</template>

<style scoped lang="scss">
.content {
    width: 1200px;
    min-height: 700px;
    margin: 70px auto 0;
}
</style>
