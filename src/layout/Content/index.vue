<template>
  <div class="xm-content">
    content
    <ScssTest></ScssTest>
    <WaterFall :list="waterFallList"></WaterFall>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import ScssTest from '@/views/ScssTest/index.vue'
import WaterFall from '@/views/water-fall/index.vue'

const waterFallList = ref([
  {
    height: 300,
    background: 'red',
  },
  {
    height: 400,
    background: 'pink',
  },
  {
    height: 500,
    background: 'blue',
  },
  {
    height: 200,
    background: 'yellow',
  },
  {
    height: 600,
    background: 'green',
  },
  {
    height: 300,
    background: 'blue',
  },
  {
    height: 200,
    background: 'blue',
  },
  {
    height: 300,
    background: 'red',
  },
  {
    height: 400,
    background: 'pink',
  },
  {
    height: 500,
    background: 'blue',
  },
  {
    height: 200,
    background: 'yellow',
  },
  {
    height: 600,
    background: 'green',
  },
  {
    height: 300,
    background: 'blue',
  },
  {
    height: 200,
    background: 'blue',
  },
])
</script>

<style lang="scss" scoped>
@include b(content){
    flex: 1;
    overflow: auto;
  }
</style>