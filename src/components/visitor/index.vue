
<script setup lang="ts">
import type { User } from '@/api/hospital/types'

defineOptions({ name: 'Visitor' })
withDefaults(defineProps<{
  user: User,
  userIndex?: number,
  currentIndex?: number,
  buttonGroup?: string[]
}>(), {
  userIndex: -1,
  currentIndex: -1,
  buttonGroup: () => ['edit', 'delete']
})
const $emit = defineEmits<{
  (e: 'changeScence', user: User): void,
  (e: 'deleteUser', user: User): void
}>()

const createEdit = () => h('div', { class: `i-ep:edit` })

const createDelete = () => h('div', { class: `i-ep:delete` })
</script>

<template>
  <div class="visitor-container">
    <div class="top flex justify-between items-center">
      <div class="top-left">
        <span v-if="buttonGroup.includes('edit')" class="top-left-medical__insurance">{{ user.isInsure === 1 ? '医保' : '自费' }}</span>
        <span v-if="buttonGroup.includes('delete')" class="top-left-username">{{ user.name }}</span>
      </div>
      <div class="right">
        <el-button @click.stop="$emit('changeScence', user)" circle :icon="createEdit()" type="primary"></el-button>
        <el-button @click.stop="$emit('deleteUser', user)" circle :icon="createDelete()" type="danger"></el-button>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型：{{ user.param.certificatesTypeString }}</p>
      <p>证件号码：{{ user.certificatesNo }}</p>
      <p>用户性别：{{ user.sex === 1 ? '女' : '男' }}</p>
      <p>出生日期：{{ user.birthdate }}</p>
      <p>手机号码：{{ user.phone }}</p>
      <p>婚姻状况：{{ user.isMarry === 0 ? '未婚' : '已婚' }}</p>
      <p>当前住址：{{ user.param.cityString }}</p>
      <p>详细地址：{{ user.param.fullAddress }}</p>
      <div v-if="userIndex === currentIndex" class="comfirm">已选择</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.visitor-container {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

  .top {
    height: 60px;
    padding: 0 20px;
    background-color: #e5e5e5;

    &-left {
      &-medical__insurance {
        background-color: #fff;
        padding: 5px;
        margin-right: 10px;
        border-radius: 10px;
      }

      &-username {
        color: #7f7f7f;
      }
    }
  }

  .bottom {
    position: relative;
    padding: 20px;

    P {
      line-height: 30px;
    }

    .comfirm {
      position: absolute;
      left: 20%;
      top: 20%;
      width: 200px;
      height: 200px;
      line-height: 200px;
      color: red;
      font-weight: 900;
      text-align: center;
      border-radius: 50%;
      border: 1px solid red;
      opacity: 0.5;
      user-select: none;
      transform: rotate(35deg);
    }
  }
}
</style>