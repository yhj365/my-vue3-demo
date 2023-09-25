<template>
  <div class="xm-content">
    <button @click="switchBtn">过渡效果切换</button>
    <!-- gsap函数过渡 -->
    <transition mode="out-in" @before-enter="enterFrom" @enter="enterActive" @leave="leave">
      <div class="block-red" v-if="showMain"></div>
      <div class="block-yellow" v-else></div>
    </transition>
    <!-- css版本过渡 -->
    <transition name="fade" mode="out-in">
      <div class="block-red" v-if="showMain"></div>
      <div class="block-yellow" v-else></div>
    </transition>
    <Main></Main>
    <WaterFall :list="waterFallList"></WaterFall>
    <ScssTest></ScssTest>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Main from '@/views/Main/index.vue'
import ScssTest from '@/views/ScssTest/index.vue'
import WaterFall from '@/views/water-fall/index.vue'
import { gsap } from 'gsap'
const waterFallList = ref([
  {
    height: 300,
    background: 'red',
  },
  {
    height: 400,
    background: 'pink',
  },
  {
    height: 500,
    background: 'blue',
  },
  {
    height: 200,
    background: 'yellow',
  },
  {
    height: 600,
    background: 'green',
  },
  {
    height: 300,
    background: 'blue',
  },
  {
    height: 200,
    background: 'blue',
  },
  {
    height: 300,
    background: 'red',
  },
  {
    height: 400,
    background: 'pink',
  },
  {
    height: 500,
    background: 'blue',
  },
  {
    height: 200,
    background: 'yellow',
  },
  {
    height: 600,
    background: 'green',
  },
  {
    height: 300,
    background: 'blue',
  },
  {
    height: 200,
    background: 'blue',
  },
])

const showMain = ref(true)
function switchBtn() {
  showMain.value = !showMain.value
}

function enterFrom(el) {
  gsap.set(el, {
    width: 0,
    height: 0,
  })
}
function enterActive(el, done) {
  gsap.to(el, {
    width: '200px',
    height: '200px',
    onComplete: done,
  })
}
function leave(el, done) {
  gsap.to(el, {
    width: 0,
    height: 0,
    onComplete: done,
  })
}
</script>

<style lang="scss" scoped>
@include b(content) {
  flex: 1;
  overflow: auto;
}
.block-red {
  background-color: red;
  width: 200px;
  height: 200px;
}
.block-yellow {
  background-color: yellow;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}
.fade-enter-from {
  height: 0;
  width: 0;
}
.fade-enter-active {
  transition: all 1.5s ease;
}
.fade-enter-to {
  height: 200px;
  width: 200px;
}
.fade-leave-from {
  height: 200px;
  width: 200px;
}
.fade-leave-active {
  transition: all 1.5s ease;
}
.fade-leave-to {
  height: 0;
  width: 0;
}
</style>
