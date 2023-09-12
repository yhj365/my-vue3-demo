<template>
  <div>
    <h1>根节点</h1>
    <label>
      <input v-model="colorVal" type="radio" value="red" name="color">
      红色
    </label>
    <label>
      <input v-model="colorVal" type="radio" value="pink" name="color">
      粉色
    </label>
    <label>
      <input v-model="colorVal" type="radio" value="yellow" name="color">
      黄色
    </label>
    <div class="box">

    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const colorVal = ref('')

</script>

<style lang="scss" scoped>

</style>