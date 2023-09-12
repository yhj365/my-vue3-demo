<template>
  <div>
    <button @click="randomHandlder">随机按钮</button>
    <TransitionGroup move-class="move-animal" tag="div" class="wraps">
      <div class="items" v-for="item in list" :key="item.id">
        {{ item.number }}
      </div>
    </TransitionGroup>
    <!-- 数字增加过渡效果 -->
    <div>
      <input v-model="num.current" type="number" step="10">
      <div>{{ num.tweendNumber^0 }}</div>
    </div>
    <ProvideDemo></ProvideDemo>
    <DynamicComponents :data="treeData"></DynamicComponents>
    <Card></Card>
    <Tree :data="treeData"></Tree>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive,watch} from 'vue'
import DynamicComponents from '@/views/DynamicComponents/index.vue'
import ProvideDemo from '@/views/ProvideDemo/index.vue'
import _ from 'lodash'
import gsap from 'gsap'

const list = ref(Array.apply(null,{length: 81} as number[]).map((_,index)=>{
  return {
    id: index,
    number: (index % 9) + 1
  }
}))
function randomHandlder() {
  list.value = _.shuffle(list.value)
}

const num = reactive({
  current: 0,
  tweendNumber: 0
})
watch(()=>num.current,(newValue)=>{
  gsap.to(num,{
    duration: 1,
    tweendNumber: newValue
  })
})
interface Tree {
  name: string,
  checked: boolean,
  children?: Tree[]
}

const treeData = ref<Tree[]>([
  {
    name: '1',
    checked: false,
    children: [
      {
        name: '1',
        checked: false,
      }
    ]
  },
  {
    name: '2',
    checked: false,
    children: [
      {
        name: '2-1',
        checked: false,
      }
    ]
  },
  {
    name: '3',
    checked: false,
    children: [
      {
        name: '3-1',
        checked: false,
        children: [
          {
            name: '3-1-1',
            checked: false,
          }
        ]
      },
      {
        name: '3-2',
        checked: false,
      }
    ]
  },
])
</script>

<style lang="scss" scoped>
.move-animal{
  transition: all 1s;
}
.wraps{
  display: flex;
  flex-wrap: wrap;
  width: calc(24px * 9 + 18px);
  .items{
    width: 24px;
    height: 24px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>