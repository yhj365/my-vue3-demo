<template>
  <div>
    <DragDemo></DragDemo>
    <ButtonDemo></ButtonDemo>
    <button @click="flag = !flag">切换</button>
    <div v-if="flag" v-move:aaa.lazy="{ background: 'yellow', flag: flag }" class="move-block"></div>
  </div>
</template>

<script setup lang="ts">
import { Directive, DirectiveBinding, ref } from 'vue'
import ButtonDemo from './ButtonDemo.vue'
import DragDemo from './DragDemo.vue'

let flag = ref<boolean>(true)
type Dir = {
  background: string
}
const vMove: Directive = {
  created() {
    console.log('Directive--created')
  },
  beforeMount() {
    console.log('Directive--beforeMount')
  },
  mounted(el: HTMLElement, dir: DirectiveBinding<Dir>) {
    console.log('Directive--mounted')
    console.log(dir.value.background)
    el.style.background = dir.value.background
  },
  beforeUpdate() {
    console.log('Directive--beforeUpdate')
  },
  updated() {
    console.log('Directive--updated')
  },
}
</script>

<style lang="scss" scoped>
.move-block {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
}
</style>
