<template>
  <div class="container">
    <div class="name">{{ abc }}</div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/index.css'
import { ref, Ref } from 'vue'

const abc: Ref<string> = ref('hello world')
</script>

<style lang="scss" scoped>
.container {
  .name {
    font-size: 24px;
  }
}
</style>
