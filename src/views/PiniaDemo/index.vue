<template>
  <div>
    <h1>pinia demo</h1>
    <div>{{ testStore.current }}--{{ testStore.name }}</div>
    <div>{{ current }}--{{ name }}</div>
    <div>getters==>{{ testStore.newName }}</div>
    <el-button @click="change">change</el-button>
  </div>
</template>

<script setup lang="ts">
import { useTestStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const testStore = useTestStore()

// 修改store的各种方法
// testStore.current = 11

// testStore.$patch({
//   current: 22,
//   name: 'test'
// })

// const change = () => {
//   testStore.$patch(state => {
//     state.current = 33
//   })
// }

// const change = () => {
//   testStore.$state = {
//     current: 44,
//     name: 'test',
//   }
// }
// action方式修改
const change = () => {
  testStore.setCurrent(55)
  testStore.setName('齐天大圣')
}

// pinia直接解构是没有响应式的,需要使用store
const { current, name } = storeToRefs(testStore)

type User = {
  name: string
  age: number
}
let result: User = {
  name: 'John',
  age: 36,
}
testStore.setUser(result)
</script>

<style lang="scss" scoped></style>
