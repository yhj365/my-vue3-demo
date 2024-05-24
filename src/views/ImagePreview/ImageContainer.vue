<template>
  <div class="image-container">
    <img
      :src="imageSrc"
      :style="{
        transform: `rotate(${item.rotate}deg) scale(${item.scale})`,
      }"
      draggable="false"
    />
  </div>
</template>

<script setup lang="ts">
import type { IImageData } from './types'

const props = defineProps<{
  item: IImageData
}>()

const imageSrc = ref('')

async function loadImage(image: string) {
  // 必须显性的添加扩展名后缀，否则只用变量名无法导入
  const imageModule = await import(`../../assets/images/${image}.jpg`)
  imageSrc.value = imageModule.default
}
onMounted(() => {
  loadImage(props.item.image)
})
</script>

<style lang="scss" scoped>
.image-container {
  width: 440px;
  height: 248px;
  display: inline-block;
  img {
    width: 100%;
    user-select: none;
    transition: all 0.3s;
  }
}
</style>
