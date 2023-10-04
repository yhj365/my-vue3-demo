<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
// 环境变量
console.log(import.meta.env)
</script>

<style lang="scss">
@import '@/assets/scss/reset.scss';
#app {
  @include bfc;
}
</style>
