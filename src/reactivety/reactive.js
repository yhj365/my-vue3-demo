const reactive = target => {
  return new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      console.log('数据收集')
      return res
    },
    set(target, key, receiver) {
      const res = Reflect.set(target, key, receiver)
      console.log('数据更新')
      return res
    },
  })
}

let obj = reactive({ a: 1, b: 2 })
console.log(obj.a)
obj.a = 3
