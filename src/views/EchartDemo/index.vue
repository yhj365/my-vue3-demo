<template>
  <div>
    <div id="china"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

onMounted(() => {
  const charts = echarts.init(document.getElementById('china') as HTMLElement)
  // charts.setOption()
})
</script>

<style lang="scss" scoped></style>
