import { effect,track,trigger } from './effect.js'
import {ref} from './ref.js'

export const computed = getter =>{
  return new ComputedImpl(getter);
}

class ComputedImpl {
  constructor(getter) {
    this._dirty = true
    this.effect = effect(getter, ()=>{
      if (!this._dirty){
        // 锁打开的时候
        this._dirty = true 
        trigger(this,'value')
      }
    })
  }
  get value() {
    if (this._dirty){
      this._value = this.effect()
      this._dirty = false // 锁上
      track(this,'value')
    }
    return this._value
  }
}

// 测试
const b = ref(1)
const c = computed(()=>{
  return b.value + (Math.random().toFixed(2) - '')
})

const fn = effect(()=>{
  console.log(`b的值为${b.value}`);
  console.log(`c的值为${c.value}`);
})
fn()
fn()
b.value = 10