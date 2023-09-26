// interSectionObsercer 主要侦听元素是否在视口内
// MutationObserver  主要侦听子集的变化 还有属性的变化 以及增删改查
// ResizeObserver 主要侦听元素的宽高变化

import { App } from 'vue'

function useResize(el: HTMLElement, callback: Function) {
  const resize = new ResizeObserver(entries => {
    callback(entries[0].contentRect)
  })
  resize.observe(el)
}

const install = (app: App) => {
  app.directive('resize', {
    mounted(el, binding) {
      useResize(el, binding.value)
    },
  })
}
useResize.install = install

export default useResize
