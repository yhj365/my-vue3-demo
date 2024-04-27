import { createApp, toRaw } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/tailwindcss/index.css'
import mitt from 'mitt'
import Card from './components/Card/index.vue'
import Tree from './components/Tree/index.vue'
import Loading from './components/Loading'
import { MyUse } from './myUse'
import { createPinia, PiniaPluginContext } from 'pinia'
import router from './router'

const store = createPinia()
const Mitt = mitt()
//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module 'vue' {
  export interface ComponentCustomProperties {
    $Bus: typeof Mitt
  }
}

export const app = createApp(App)

// pinia plugin 持久化
type Options = {
  key?: string
}
const __piniaKey__: string = 'hj'
const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}
const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}
const piniaPlugin = (options: Options) => {
  return (context: PiniaPluginContext) => {
    const { store } = context
    const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)

    store.$subscribe(() => {
      setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`, toRaw(store.$state))
    })
    return { ...data }
  }
}
store.use(piniaPlugin({ key: 'pinia' }))
app.use(router)
app.use(store)
app.component('Card', Card)
app.component('Tree', Tree)

// 设置全局总线bus
app.config.globalProperties.$Bus = Mitt

// 扩充类型
type Filter = {
  format<T>(str: T): string
}
declare module 'vue' {
  export interface ComponentCustomProperties {
    $filters: Filter
  }
}
app.config.globalProperties.$filters = {
  format<T>(str: T): string {
    return `全局格式化-${str}`
  },
}
type Loading = {
  show: () => void
  hide: () => void
}
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loading: Loading
  }
}
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(Loading)
// 使用自定义myUse
MyUse(Loading)
// 使用unplugin-vue-components，自动按需导入
MyUse(ElementPlus)

app.mount('#app')
