<script setup>
/*eslint-disable*/
const data = reactive({
  title: 'this is a title',
  content: 'this is content',
});

setTimeout(() => {
  data.title = 'this is new title'
}, 3000);
</script>

<template>
  <h1>{{ title }}</h1>
  <p>{{ content }}</p>
</template>

<style lang="scss" scoped></style>
