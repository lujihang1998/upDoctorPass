<script setup lang="ts">
import { SET_TOKEN } from '@/utils/user'

const $route = useRoute()
SET_TOKEN(JSON.stringify($route.query))

let html = document.querySelector('html') as HTMLElement
html.style.display = 'none'
</script>

<template>
  <div></div>
</template>

<style scoped lang="ts"></style>