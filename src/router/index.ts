import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import LoadingBar from '@/components/LoadingBar/index.vue'
import { createVNode, render } from 'vue'

const Vnode = createVNode(LoadingBar)
render(Vnode, document.body)

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
  },
  {
    path: '/login',
    component: import('@/views/Login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savePosition) => {
    if (savePosition) {
      return savePosition
    } else {
      return {
        top: 0,
      }
    }
  },
  routes,
})

const whileList = ['/', '/login']
router.beforeEach((to, from, next) => {
  Vnode.component?.exposed?.startLoading()
  if (whileList.includes(to.path) || localStorage.getItem('token')) {
    next()
  } else {
    next('/')
  }
})

router.afterEach((to, from) => {
  Vnode.component?.exposed?.endLoading()
})
export default router
