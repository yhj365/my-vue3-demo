<template>
  <div class="wraps">
    <div ref="bar" class="bar"></div>
  </div>
</template>

<script setup lang="ts">
let speed = ref<number>(1)
const bar = ref<HTMLElement>()
let timer = ref<number>(0)
const startLoading = () => {
  let dom = bar.value as HTMLElement

  speed.value = 1
  timer.value = window.requestAnimationFrame(function fn() {
    if (speed.value < 90) {
      speed.value += 1
      dom.style.width = speed.value + '%'
      timer.value = window.requestAnimationFrame(fn)
    } else {
      speed.value = 1
      window.cancelAnimationFrame(timer.value)
    }
  })
}
const endLoading = () => {
  let dom = bar.value as HTMLElement
  setTimeout(() => {
    window.requestAnimationFrame(function fn() {
      speed.value = 100
      dom.style.width = speed.value + '%'
    })
  }, 500)
}
onMounted(() => {
  startLoading()
  endLoading()
})

defineExpose({
  startLoading,
  endLoading,
})
</script>

<style lang="scss" scoped>
.wraps {
  position: fixed;
  top: 0;
  width: 100%;
  height: 4px;
  .bar {
    width: 0;
    height: inherit;
    background-color: blue;
  }
}
</style>
