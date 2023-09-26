<template>
  <div class="img-list">
    <!-- img2base64 -->
    <img id="img" src="@/assets/images/0001.jpg" alt="" />
    <!-- 自定义懒加载 -->
    <div v-for="(item, index) in arr" :key="index">
      <img v-mylazy="item" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Directive } from 'vue'
import img2base64 from '@/hooks'

const instance = getCurrentInstance()
const proxy = instance?.proxy
// glob是懒加载的模式
// globEager是静态加载
const imgList: Record<string, { default: string }> = import.meta.glob('@/assets/images/*.*', { eager: true })
const arr = Object.values(imgList).map(v => v.default)

const vMylazy: Directive<HTMLImageElement, string> = async (el, binding) => {
  const def = await import('@/assets/images/utils/0014.jpg')
  el.src = def.default
  const observer = new IntersectionObserver(entr => {
    if (entr[0].intersectionRatio > 0) {
      proxy?.$loading.show()
      setTimeout(() => {
        el.src = binding.value
        proxy?.$loading.hide()
      }, 2000)
      observer.unobserve(el)
    }
  })

  observer.observe(el)
}

img2base64({ el: '#img' }).then(res => {
  console.log(res)
})
</script>

<style lang="scss" scoped>
.img-list {
  img {
    width: 500px;
  }
}
</style>
