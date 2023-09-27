<template>
  <div v-if="isShow" class="loading">Loading...</div>
</template>

<script setup lang="ts">
const isShow = ref<boolean>(false)
const show = () => {
  isShow.value = true
}
const hide = () => (isShow.value = false)
defineExpose({
  isShow,
  show,
  hide,
})
</script>

<style lang="scss" scoped>
.loading {
  background-color: #000;
  opacity: 0.8;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  color: white;
  position: fixed;
  top: 0;
}
</style>
