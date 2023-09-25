<template>
  <div>
    <h2>组件A</h2>
    <button @click="emitB">派发一个事件</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Bus from '@/utils/Bus'

let flag = ref(false)
function emitB() {
  flag.value = !flag.value
  Bus.emit('on-click', flag.value)
}
</script>

<style lang="scss" scoped></style>
