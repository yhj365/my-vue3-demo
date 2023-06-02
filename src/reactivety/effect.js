export const reactive = target =>{
  return new Proxy(target,{
    get(target, key, receiver){
      const res = Reflect.get(target, key,receiver)
      console.log('数据收集');
      track(target, key)
      return res
    },
    set(target, key, receiver){
      const res = Reflect.set(target, key,receiver)
      console.log('数据更新');
      trigger(target, key)
      return res
    }
  })
}

const targetMap = new Map()
const effectStack = []
let activeEffect

export const effect = (fn, scheduler = null ) =>{
  const effectFn = ()=>{
    try{
      effectStack.push(effectFn)
      activeEffect = fn
      return fn()
    }finally{
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
      
    }
  }
  // 先执行一次
  effectFn()

  // 挂载调度函数
  if(scheduler){
    effectFn.scheduler = scheduler
  }

  return effectFn
}

export const track = (target,key)=>{
  if(!activeEffect){
    return
  }
  let depsMap = targetMap.get(target)
  if(!depsMap){
    depsMap = new Map()
    targetMap.set(target,depsMap)
  }
  let deps = depsMap.get(key)
  if(!deps){
    deps = new Set()
    depsMap.set(key,deps)
  }
  deps.add(activeEffect)
}
export const trigger = (target,key)=>{
  let depsMap = targetMap.get(target)
  if(!depsMap){
    return
  }
  let deps = depsMap.get(key)
  if(!deps){
    return
  }
  deps.forEach(effectFn=>
    //如果有调度函数，优先执行调度函数
    // 否则调用effect本身
    effectFn.scheduler ? effectFn.scheduler(effectFn) : effectFn()
  )
}

// 测试
// let obj = reactive({a:1,b:2})

// effect(()=>{
//   effect(()=>{
//     console.log(`effect 执行，输出obj.a=${obj.a }`);
//   })
//   console.log(`effect 执行，输出obj.b=${obj.b }`);
// })

// obj.a = 3
// obj.a = 5