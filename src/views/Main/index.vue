<template>
  <div>
    <ImagePreview :data="imageData"></ImagePreview>
    <EchartDemo></EchartDemo>
    <PiniaDemo></PiniaDemo>
    <yhj-btn params="参数内容"></yhj-btn>
    <CompileMacros :typeList="[999, 888, 777]" @send-info="onSend">
      <template #default="{ item, index }">
        <span>{{ item }}--{{ index }}</span>
      </template>
    </CompileMacros>
    <h-func></h-func>
    <!-- tailwind 示例 -->
    <div class="bg-red-500 text-8xl text-slate-200">hello tailwind</div>
    <ImgsLazy></ImgsLazy>
    <DirectiveDemo></DirectiveDemo>
    <div>
      <h1>我是v-model父组件</h1>
      <div>{{ textValue }}</div>
      <div>
        <button @click="isShow = !isShow">开关</button>
      </div>
      <vModelVue v-model="isShow" v-model:textValue.isBt="textValue"></vModelVue>
    </div>
    <SetupFunc name="setup函数传值" @on-click="clickSetupFunc"></SetupFunc>
    <el-button type="primary" @click="randomHandlder">随机按钮</el-button>
    <TransitionGroup move-class="move-animal" tag="div" class="wraps">
      <div class="items" v-for="item in list" :key="item.id">
        {{ item.number }}
      </div>
    </TransitionGroup>
    <!-- 数字增加过渡效果 -->
    <div>
      <input v-model="num.current" type="number" step="10" />
      <div>{{ num.tweendNumber ^ 0 }}</div>
    </div>
    <ProvideDemo></ProvideDemo>
    <DynamicComponents :data="treeData"></DynamicComponents>
    <Card></Card>
    <Tree :data="treeData"></Tree>
  </div>
</template>

<script setup lang="ts">
import EchartDemo from '@/views/EchartDemo/index.vue'
import PiniaDemo from '@/views/PiniaDemo/index.vue'
import CustomVueCeVue from '@/views/webComponent/custom-vue.ce.vue'
import CompileMacros from '@/views/CompileMacros/index.vue'
import HFunc from '@/views/h-func/index.vue'
import ImgsLazy from '@/views/ImgsLazy/index.vue'
import DirectiveDemo from '@/views/DirectiveDemo/index.vue'
import vModelVue from '@/views/v-model/index.vue'
import DynamicComponents from '@/views/DynamicComponents/index.vue'
import ProvideDemo from '@/views/ProvideDemo/index.vue'
import SetupFunc from '@/views/Tsx/setupFunc'
import ImagePreview from '@/views/ImagePreview/ImagePreview.vue'

import _ from 'lodash'
import gsap from 'gsap'
import { defineCustomElement } from 'vue'
import { IImageData } from '../ImagePreview/types'

const Btn = defineCustomElement(CustomVueCeVue)
nextTick(() => {
  window.customElements.define('yhj-btn', Btn)
})

const onSend = data => {
  console.log(data)
}

const isShow = ref<boolean>(true)
const textValue = ref<string>('默认值')

function clickSetupFunc(params: any) {
  console.log(params)
}
const list = ref(
  Array.apply(null, { length: 81 } as number[]).map((_, index) => {
    return {
      id: index,
      number: (index % 9) + 1,
    }
  })
)
function randomHandlder() {
  list.value = _.shuffle(list.value)
}

const num = reactive({
  current: 0,
  tweendNumber: 0,
})
watch(
  () => num.current,
  newValue => {
    gsap.to(num, {
      duration: 1,
      tweendNumber: newValue,
    })
  }
)
interface Tree {
  name: string
  checked: boolean
  children?: Tree[]
}

const treeData = ref<Tree[]>([
  {
    name: '1',
    checked: false,
    children: [
      {
        name: '1',
        checked: false,
      },
    ],
  },
  {
    name: '2',
    checked: false,
    children: [
      {
        name: '2-1',
        checked: false,
      },
    ],
  },
  {
    name: '3',
    checked: false,
    children: [
      {
        name: '3-1',
        checked: false,
        children: [
          {
            name: '3-1-1',
            checked: false,
          },
        ],
      },
      {
        name: '3-2',
        checked: false,
      },
    ],
  },
])

const imageData = reactive<IImageData[]>([
  {
    id: 1,
    image: '0001',
    rotate: 0,
    scale: 1,
  },
  {
    id: 2,
    image: '0002',
    rotate: 0,
    scale: 1,
  },
  {
    id: 3,
    image: '0003',
    rotate: 0,
    scale: 1,
  },
  {
    id: 4,
    image: '0004',
    rotate: 0,
    scale: 1,
  },
  {
    id: 5,
    image: '0005',
    rotate: 0,
    scale: 1,
  },
  {
    id: 6,
    image: '0006',
    rotate: 0,
    scale: 1,
  },
])
</script>

<style lang="scss" scoped>
.move-animal {
  transition: all 1s;
}
.wraps {
  display: flex;
  flex-wrap: wrap;
  width: calc(24px * 9 + 18px);
  .items {
    width: 24px;
    height: 24px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
