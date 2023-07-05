<script setup lang="ts">
defineOptions({ name: 'Carousel' })
</script>

<template>
    <el-carousel :interval="4000" height="350px">
        <el-carousel-item v-for="item in 3" :key="item">
            <img class="w-full h-[350px]" src="@/assets/images/web-banner.png" alt="">
        </el-carousel-item>
    </el-carousel>
</template>