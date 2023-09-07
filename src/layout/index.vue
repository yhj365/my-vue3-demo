<template>
  <div class="xm-box">
    <Menu></Menu>
    <div class="xm-box__right">
      <Header></Header>
      <Content></Content>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
import Content from './Content/index.vue'
</script>

<style lang="scss" scoped>
@include b(box){
  @include bfc;
  display: flex;
  @include e(right){
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>