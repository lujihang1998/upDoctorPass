<script setup lang="ts">
// import useUserStore from '@/store/modules/user'
import { SET_TOKEN } from '@/utils/user'

const $route = useRoute()
SET_TOKEN(JSON.stringify($route.query))
// const userStore = useUserStore()
// userStore.visiable = false
// userStore.userInfo = $route.query as any

let html = document.querySelector('html') as HTMLElement
html.style.display = 'none'
</script>

<template>
  <div></div>
</template>

<style scoped lang="ts"></style>