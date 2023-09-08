<template>
  <div>
    <div @click.stop="clickTap(item, $event)" class="tree" v-for="item in data">
      <input type="checkbox" v-model="item.checked">
      <span>{{ item.name }}</span>
      <MyTree v-if="item?.children?.length" :data="item.children"></MyTree>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

// 组件名称自定义
defineOptions({
  name: 'MyTree',
})
interface Tree {
  name: string,
  checked: boolean,
  children?: Tree[]
}
defineProps<{data?:Tree[]}>()

function clickTap(item: Tree, event){
  console.log(item);
  console.log(event);
  
}
</script>

<style lang="scss" scoped>
.tree{
  margin-left: 10px;
}
</style>