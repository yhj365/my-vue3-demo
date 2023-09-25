<!-- 按钮级别权限 -->
<template>
  <div class="btns">
    <button v-has-show="'shop:create'">创建</button>
    <button v-has-show="'shop:edit'">编辑</button>
    <button v-has-show="'shop:delete'">删除</button>
  </div>
</template>

<script setup lang="ts">
import type { Directive } from 'vue'

localStorage.setItem('userId', '123456')
//mock数据permission数组
const permission = ['123456:shop:create', '123456:shop:edit', '123456:shop:delete']
const userId = localStorage.getItem('userId') as string
const vHasShow: Directive<HTMLElement, string> = (el, binding) => {
  if (!permission.includes(`${userId}:${binding.value}`)) {
    el.style.display = 'none'
  }
}
</script>

<style lang="scss" scoped>
.btns {
  button {
    margin: 8px;
  }
}
</style>
