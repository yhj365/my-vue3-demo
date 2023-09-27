<script setup lang="ts">
import { useCssVar } from '@vueuse/core';

const size = useCssVar('--size')
// 设置全局字体大小，使用变量var(--size)，所有页面都可以使用
// 使用vueuse改变css变量
const changeSize = (num: number) =>{
  size.value = num + 'px'
}
const initSize = ()=>{
  size.value = localStorage.getItem('size') || '14px'
}
initSize()
// 原生js方法实现原理
const changeSizeByJs = (num: number) =>{
  // 读取
  const size = document.documentElement.style.getPropertyValue('--size')
  console.log(size);
  // 设置
  document.documentElement.style.setProperty('--size', num + 'px')
  
}
</script>

<template>
  <main>
    <button @click="changeSize(36)">大</button>
    <button @click="changeSize(24)">中</button>
    <button @click="changeSize(12)">小</button>
    <button class="red" @click="changeSizeByJs(36)">js大</button>
    <button class="red" @click="changeSizeByJs(24)">js中</button>
    <button class="red" @click="changeSizeByJs(12)">js小</button>

    <!-- unocssIcons -->
    <div red class="i-ic-baseline-alarm-on"></div>
    <div class="h-24 bg-red-500"></div>
  </main>
</template>

<style scoped>
/* 全局变量 */
:root{
  --size: 14px;
}
button{
  margin: 8px;
  font-size: var(--size);
}
</style>
