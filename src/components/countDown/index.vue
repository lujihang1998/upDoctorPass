<script setup lang="ts">
defineOptions({ name: 'CountDown' })

const $emit = defineEmits<{
  (event: 'defaultClick'): void,
  (event: 'update:flag', flag: boolean): void
}>()
const $props = defineProps({
  flag: { type: Boolean, default: false },
  contorlCondition: { type: Boolean, default: true },
  defaultTitle: { type: String, default: '获取验证码' },
  countDownTitle: { type: String, default: '倒计时' },
  countDownNum: { type: Number, default: 5 }
})

let timeNumber = ref<number>(5)

watch(() => $props.flag, (newFlag) => {
  if (newFlag) {
    let timer = setInterval(() => {
      timeNumber.value--
      if (timeNumber.value === 0) {
        clearInterval(timer)
        timeNumber.value = 5
        $emit('update:flag', false)
      }
    }, 1000)
  }
}, {
  immediate: true
})

const getCode = () => {
  if (!$props.contorlCondition) return
  $emit('defaultClick')
}
</script>

<template>
  <span @click="getCode" v-if="!flag">{{ defaultTitle }}</span>
  <span v-else>倒计时{{ timeNumber ? `${timeNumber}s` : '' }}</span>
</template>

<style scoped lang="scss"></style>