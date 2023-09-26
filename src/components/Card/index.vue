<template>
  <div class="card">
    <header>
      <div>标题</div>
      <div>副标题</div>
    </header>
    <section>123{{ isShow }}</section>
  </div>
</template>

<script setup lang="ts">
const isShow = ref<boolean>(false)
</script>

<style lang="scss" scoped>
$border: #ccc;
.card {
  border: 1px solid $border;
  width: 400px;
  header {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid $border;
  }
  section {
    padding: 5px;
    min-height: 300px;
  }
}
</style>
