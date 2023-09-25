<template>
  <div>
    MittB:
    {{ str }}
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
const instance = getCurrentInstance()

const str = ref('')
instance?.proxy?.$Bus.on('on-mitt', (data: any) => {
  console.log(data)
  str.value = data
})
</script>

<style lang="scss" scoped></style>
