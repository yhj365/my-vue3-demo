<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  <header class="header flex">
    <div class="wrapper">
      left
    </div>
    <div class="wrapper">
      center
    </div>
    <div class="wrapper">
      right
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
.header{
  width: 100%;
  div{
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    font-size: var(--size);
  }
  div:nth-child(1){
    width: 100px;
    background-color: #f00;
  }
  div:nth-child(2){
    flex: 2;
    background-color: #0f0;
  }
  div:nth-child(3){
    width: 100px;
    background-color: #00f;
  }
}
</style>
