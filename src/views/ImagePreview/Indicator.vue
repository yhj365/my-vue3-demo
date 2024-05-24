<template>
  <el-icon class="iconfont" :class="[`icon-${dir}`]">
    <component :is="`arrow-${dir}-bold`" @click="handleImageSlide(dir)" />
  </el-icon>
</template>

<script setup lang="ts">
import { ARROW_DIRECTION } from './types'

const porps = defineProps<{
  dir: ARROW_DIRECTION
}>()

const emit = defineEmits<{
  handleImageSlide: [dir: ARROW_DIRECTION]
}>()

const handleImageSlide = (dir: ARROW_DIRECTION) => {
  emit('handleImageSlide', dir)
}
</script>

<style lang="scss" scoped>
.iconfont {
  position: absolute;
  top: calc(50% - 12px);
  z-index: 1;
  font-size: 24px;
  color: #ddd;
  cursor: pointer;
  text-shadow: 1px 3px 5px #000;
  transition: text-shadow 0.3s;
  &:hover {
    text-shadow: 1px 2px 3px #000;
  }
  &.icon-left {
    left: 20px;
  }
  &.icon-right {
    right: 20px;
  }
}
</style>
