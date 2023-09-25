<template>
  <div>
    <h2>父组件A</h2>
    <div class="box"></div>
    <hr />
    <ProvodeB></ProvodeB>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { inject } from 'vue'
import ProvodeB from './ProvideB.vue'

const colorVal = inject<Ref<string>>('color')
</script>

<style lang="scss" scoped>
.box {
  height: 50px;
  width: 50px;
  border: 1px solid #ccc;
  background-color: v-bind(colorVal);
}
</style>
