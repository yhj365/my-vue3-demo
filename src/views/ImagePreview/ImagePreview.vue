<template>
  <div class="image-preview">
    <Indicator :dir="ARROW_DIRECTION.LEFT" @handle-image-slide="handleImageSlide"></Indicator>
    <Indicator :dir="ARROW_DIRECTION.RIGHT" @handle-image-slide="handleImageSlide"></Indicator>
    <ControlBar @handle-image-rotate="handleImageRotate" @handle-image-scale="handleImageScale"></ControlBar>
    <div
      class="slider"
      :style="{
        width: sliderWidth + 'px',
        transform: `translate3d(-${sliderLeft}px , 0, 0)`,
      }"
    >
      <ImageContainer v-for="item of imageData" :key="item.id" :item="item"></ImageContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageContainer from './ImageContainer.vue'
import Indicator from './Indicator.vue'
import ControlBar from './ControlBar.vue'
import { IImageData, ARROW_DIRECTION, ZOOM } from './types'
import { useSliderIndex, useSliderLeft, useImageData } from './hooks'

const props = defineProps<{
  data: IImageData[]
}>()

const imgLen = props.data.length
const sliderWidth = imgLen * 440

const { sliderIndex, setSliderIndex } = useSliderIndex(imgLen)
const sliderLeft = useSliderLeft(sliderIndex as Ref)

const handleImageSlide = (dir: ARROW_DIRECTION) => {
  imageReset(sliderIndex.value)
  setSliderIndex(dir)
}

const { imageData, setImageRotate, setImageScale } = useImageData(props.data)
const handleImageRotate = (dir: ARROW_DIRECTION) => {
  setImageRotate(sliderIndex.value, dir)
  console.log(imageData)
}
const handleImageScale = (zoom: ZOOM) => {
  setImageScale(sliderIndex.value, zoom)
}

const imageReset = (sliderIndex: number) => {
  const target = imageData.value[sliderIndex]
  target.rotate = 0
  target.scale = 0
}
</script>

<style lang="scss" scoped>
.image-preview {
  position: relative;
  width: 400px;
  height: 248px;
  overflow: hidden;
  .slider {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s;
  }
}
</style>
