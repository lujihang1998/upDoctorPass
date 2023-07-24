<script setup lang='ts'>
import OrderDetail from './detail/index.vue'
import AllOrder from './allOrder/index.vue'

defineOptions({ name: 'Order' })

const $route = useRoute()
</script>

<template>
  <div>
    <div v-if="$route.query.orderId">
      <OrderDetail />
    </div>
    <div v-else>
      <AllOrder />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>