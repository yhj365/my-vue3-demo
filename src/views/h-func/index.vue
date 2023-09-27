<template>
  <div>
    <el-table :data="list" border>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column label="操作">
        <template #default>
          <Btn type="success">编辑</Btn>
          <Btn type="error">删除</Btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, h } from 'vue'

// 1.template模板书写风格 2. tsx编写风格 3.函数式组件 h函数
// h函数反源码 createVnode
// h函数的优势 跳过了模板的编译 直接到render
// parser => ast => transfrom => js api => generate => render
// 缺点学习成本略高 vue3使用h函数较少

const list = reactive([
  { id: 1, name: 'hj', age: 18, type: 'success' },
  { id: 2, name: 'hj2', age: 56, type: 'error' },
  { id: 3, name: 'hj3', age: 5, type: 'warning' },
  { id: 4, name: 'hjy', age: 7, type: 'success' },
  { id: 5, name: 'hje', age: 14, type: 'success' },
])

interface Props {
  type: 'success' | 'error' | 'warning'
}

const Btn = (props: Props, ctx: any) => {
  return h(
    'button',
    {
      class: 'btn btn-primary',
      style: {
        color: props.type === 'success' ? 'green' : 'red',
      },
      onClick: () => {
        if (props.type === 'success') {
          console.log('编辑')
        } else {
          console.log('删除')
        }
      },
    },
    ctx.slots.default()
  )
}
</script>

<style lang="scss" scoped></style>
