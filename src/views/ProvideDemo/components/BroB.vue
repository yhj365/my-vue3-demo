<template>
  <div>
    <h2>组件B</h2>
    {{ flag }}
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Bus from '@/utils/Bus'

let flag = ref(false)
Bus.on('on-click',(data:boolean)=>{
  console.log(data);
  
  flag.value = data
})

</script>

<style lang="scss" scoped>

</style>