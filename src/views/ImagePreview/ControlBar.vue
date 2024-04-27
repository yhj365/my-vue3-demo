<template>
  <div class="control-bar">
    <el-icon class="iconfont" @click="handleImageRotate(ARROW_DIRECTION.LEFT)">
      <RefreshLeft />
    </el-icon>
    <el-icon class="iconfont" @click="handleImageRotate(ARROW_DIRECTION.RIGHT)">
      <RefreshRight />
    </el-icon>
    <el-icon class="iconfont" @click="handleImageScale(ZOOM.IN)">
      <ZoomIn />
    </el-icon>
    <el-icon class="iconfont" @click="handleImageScale(ZOOM.OUT)">
      <ZoomOut />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { ARROW_DIRECTION, ZOOM } from './types'

const emit = defineEmits<{
  handleImageRotate: [dir: ARROW_DIRECTION]
  handleImageScale: [zoom: ZOOM]
}>()

function handleImageRotate(dir: ARROW_DIRECTION) {
  emit('handleImageRotate', dir)
}
function handleImageScale(zoom: ZOOM) {
  emit('handleImageScale', zoom)
}
</script>

<style lang="scss" scoped>
.control-bar {
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 120px;
  height: 30px;
  margin-left: -60px;
  z-index: 1;
  .iconfont {
    color: #fff;
    cursor: pointer;
    margin-right: 6px;
    font-size: 24px;
  }
}
</style>
