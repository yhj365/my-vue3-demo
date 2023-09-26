<template>
  <div v-move class="box">
    <div class="header"></div>
    <div>内容</div>
  </div>
</template>

<script setup lang="ts">
import { Directive } from 'vue'

const vMove: Directive<any, void> = (el: HTMLElement) => {
  let moveElement: HTMLDivElement = el.firstElementChild as HTMLDivElement
  const mouseDown = (e: MouseEvent) => {
    let x = e.clientX - el.offsetLeft
    let y = e.clientY - el.offsetTop
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX - x + 'px'
      el.style.top = e.clientY - y + 'px'
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', move)
    })
  }
  moveElement.addEventListener('mousedown', mouseDown)
}
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 3px solid #000;
  background-color: #fff;
  .header {
    height: 20px;
    background-color: #000;
    cursor: move;
  }
}
</style>
