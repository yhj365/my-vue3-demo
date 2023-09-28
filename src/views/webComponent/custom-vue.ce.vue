import { divide } from 'lodash';
<template>
  <div>
    <button>web component按钮</button>
    <div>{{ props.params }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  params: string
}>()
</script>

<style lang="scss" scoped></style>
