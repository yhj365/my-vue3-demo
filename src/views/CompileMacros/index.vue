<template>
  <div>
    <el-button @click="send">发送</el-button>
    <div v-for="(item, index) in typeList" :key="index">
      <slot :index="index" :item="item"></slot>
    </div>
  </div>
</template>

<script generic="T" setup lang="ts">
// defineSlots 只有声明没有实现 没有任何参数 只能接受ts的类型
// 约束slot，类型提示
defineSlots<{
  default(props: { index: number; item: T }): void
}>()

// 普通的方式,定义props属性类型
// const props = defineProps({
//   name: {
//     typeList: Array as PropType<string[]>,
//     required: true,
//   },
// })

// ts字面量方式
// const props = defineProps<{
//   typeList: string[]
// }>()

// vue3.3更新内容,对泛型的支持，script标签上新增generic,从父组件传入
const props = defineProps<{
  typeList: T[]
}>()
console.log(props.typeList)

// 普通的emit
// const emit = defineEmits(['send'])
// ts的emit写法
// const emit = defineEmits<{
//   (event: 'send', name: string): void
// }>()
// 3.3更新的写法
const emit = defineEmits<{
  'send-info': [name: string]
}>()
const send = () => {
  emit('send-info', 'hello')
}

// 3.3内置defineOptions,3.3之前的版本需要下载插件
// 它里面的属性跟optionsAPI一模一样
// 已经有的defineXXX属性就不能在重新定义
defineOptions({
  name: 'CompileMacros',
})
</script>

<style lang="scss" scoped></style>
