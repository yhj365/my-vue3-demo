import {Dep} from './dep'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
].forEach(function (method) {
  // 缓存原始方法
  const original = arrayProto[method]
  Object.defineProperty(arrayMethods,method,{
    value: function mutator(...args){
      return original.apply(this,args)
    },
    enumerable: false,
    writable: true,
    configurable: true,
  })
})




/**
 * Observer类会附加到每个被侦测的object上
 * 一旦被附加上，Observer会将object的所有属性转换成getter/setter的形式
 * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖
 */
export class Observer{
  constructor(value){
    this.value = value
    if(Array.isArray(value)){
      value._proto_ = arrayMethods
    }else{
      this.walk(value)
    }
  }
  /**
   * walk会将每个属性都转换成getter/setter的形式来侦测变化，
   * 这个方法只有在数据类型为Object时被调用
   */
   walk(obj){
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj,keys[i],obj[keys[i]])
    }
   }
}

function defineReactive(data,key,val) {
  // 新增，递归子属性
  if(typeof val === 'object'){
    new Observer(val)
  }
  let dep = new Dep() //新增
  Object.defineProperty(data,key,{
    enumerable: true,
    configurable: true,
    get: function(){
      dep.depend() // 新增
      return val
    },
    set: function(newVal){
      if(val === newVal){
        return
      }
      val = newVal
      // 新增
      dep.notify()
    }
  })
}

const obj = {
  name: '名字'
}
const arr = []

defineReactive(obj,'name','yyy')


console.log(obj.name);
obj.name = 1
console.log(obj.name);