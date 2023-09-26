import type { App, VNode } from 'vue'
import Loading from './index.vue'
import { createVNode, render } from 'vue'

export default {
  install(app: App) {
    const vNode: VNode = createVNode(Loading)
    render(vNode, document.body)
    app.config.globalProperties.$loading = {
      show: vNode.component?.exposed?.show,
      hide: vNode.component?.exposed?.hide,
    }
    // 需要组件中使用defineExpose导出
    // console.log(vNode.component?.exposed)
  },
}
