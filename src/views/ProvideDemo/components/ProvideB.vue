<template>
  <div>
    <h3>子组件B</h3>
    <button @click="change('yellow')">修改provide值</button>
    <div class="box"></div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { inject } from 'vue'

const colorVal = inject<Ref<string>>('color')
function change(params: string) {
  colorVal!.value = params
}
</script>

<style lang="scss" scoped>
.box {
  height: 50px;
  width: 50px;
  border: 1px solid #ccc;
  background-color: v-bind(colorVal);
}
</style>
