<template>
  <div>
    <h1>根组件</h1>
    <label>
      <input v-model="colorVal" type="radio" value="red" name="color" />
      红色
    </label>
    <label>
      <input v-model="colorVal" type="radio" value="pink" name="color" />
      粉色
    </label>
    <label>
      <input v-model="colorVal" type="radio" value="yellow" name="color" />
      黄色
    </label>
    <div class="box"></div>
    <ProvideA></ProvideA>
    <h1>兄弟组件传值</h1>
    <BroA @on-click="broAClick"></BroA>
    <BroB :flat="flat"></BroB>
    <MittA></MittA>
    <MittB></MittB>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import ProvideA from './components/ProvideA.vue'
import BroA from './components/BroA.vue'
import BroB from './components/BroB.vue'
import MittA from './components/MittA.vue'
import MittB from './components/MittB.vue'

const colorVal = ref('red')

provide('color', colorVal)

const flat = ref(false)
function broAClick(params: boolean) {
  flat.value = params
}
</script>

<style lang="scss" scoped>
.box {
  height: 80px;
  width: 80px;
  border: 1px solid #ccc;
  background-color: v-bind(colorVal);
}
</style>
