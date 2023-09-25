<template>
  <div class="wraps">
    <div
      class="items"
      :style="{ height: item.height + 'px', background: item.background, left: item.left + 'px', top: item.top + 'px' }"
      v-for="(item, index) in waterList"
      :key="index"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: any[]
}>()

const waterList = reactive([])
const heightList: number[] = []
const init = () => {
  const width = 130
  const x = document.body.offsetWidth
  const column = Math.floor(x / width)
  for (let i = 0; i < props.list.length; i++) {
    if (i < column) {
      props.list[i].left = i * width
      props.list[i].top = 20
      waterList.push(props.list[i])
      heightList.push(props.list[i].height)
    } else {
      let current = heightList[0]
      let index = 0
      heightList.forEach((h, i) => {
        if (current > h) {
          current = h
          index = i
        }
      })
      props.list[i].top = current + 30
      props.list[i].left = index * width
      heightList[index] = heightList[index] + props.list[i].height + 20
      waterList.push(props.list[i])
    }
  }
}
init()
</script>

<style lang="scss" scoped>
.wraps {
  position: relative;
  .items {
    position: absolute;
    width: 120px;
  }
}
</style>
