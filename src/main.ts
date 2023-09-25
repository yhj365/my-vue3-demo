import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import Card from './components/Card/index.vue'
import Tree from './components/Tree/index.vue'

const Mitt = mitt()
//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof Mitt
  }
}

const app = createApp(App)

app.component('Card', Card)
app.component('Tree', Tree)

// 设置全局总线bus
app.config.globalProperties.$Bus = Mitt

app.mount('#app')
