<template>
  <div>
    <button @click="emit">mitt</button>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
function emit() {
  console.log('on-mitt')

  instance?.proxy?.$Bus.emit('on-mitt', 'mitt')
}
</script>

<style lang="scss" scoped></style>
