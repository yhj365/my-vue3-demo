<template>
  <div >
    <div class="container">
      <div class="tabs" :class="[acticve === index?'acticve':'']" v-for="(item,index) in data" @click="switchCom(item,index)">
        <div>{{ item.name }}</div>
      </div>
    </div>
    <component :is="comId"></component>
  </div>
</template>

<script setup>
import {markRaw, ref, shallowRef} from 'vue'
import ACom from './components/A.vue'
import BCom from './components/B.vue'
import CCom from './components/C.vue'

const data = ref([
  {
    name: 'A组件',
    com: markRaw(ACom),
  },
  {
    name: 'B组件',
    com: markRaw(BCom),
  },
  {
    name: 'C组件',
    com: markRaw(CCom),
  },
])
const comId = shallowRef(ACom)
const acticve = ref(0)
function switchCom(item,index) {
  comId.value = markRaw(item.com) 
  acticve.value = index
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  .tabs{
    border: 1px solid #ccc;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
  }
  .acticve{
    background-color: aqua;
  }
}
</style>