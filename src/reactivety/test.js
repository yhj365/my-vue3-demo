import { effect } from './effect.js'
import { ref } from './ref.js'

const num = ref(0)

effect(() => {
  console.log(`num.value值：${num.value}`)
})
num.value = 1
