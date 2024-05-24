<script setup>
const data = reactive({
  title: 'this is a title',
  content: 'this is content',
})

setTimeout(() => {
  data.title = 'this is new title'
}, 3000)
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
