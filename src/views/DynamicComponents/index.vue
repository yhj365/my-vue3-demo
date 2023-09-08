<template>
  <div>
    <component></component>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import ACom from './components/A.vue'
import BCom from './components/B.vue'
import CCom from './components/C.vue'

const data = ref([
  {
    name: 'A组件',
    com: ACom,
  },
  {
    name: 'B组件',
    com: BCom,
  },
  {
    name: 'C组件',
    com: CCom,
  },
])
</script>

<style lang="scss" scoped>

</style>