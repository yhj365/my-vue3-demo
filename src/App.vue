<template>
  <Layout></Layout>
</template>

<script setup lang="ts">
import Layout from './layout/index.vue'
// 环境变量
console.log(import.meta.env)
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';
#app {
  @include bfc;
}
</style>
