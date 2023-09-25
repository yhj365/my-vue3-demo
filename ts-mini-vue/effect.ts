interface Options {
  scheduler?: Function
}
let activeEffect: any
export const effect = (fn: Function, options: Options) => {
  const _effect = function () {
    activeEffect = _effect
    let res = fn()
    return res
  }
  _effect.options = options
  _effect()
  return _effect
}
/**
 * targetMap{
 *    key: value,
 *    {}: new Map :{
 *       name: new Set: [effect]
 *     }
 * }
 */
const targetMap = new WeakMap()
export const track = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  deps.add(activeEffect)
}

export const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return console.error('no depsMap')
  }
  const deps = depsMap.get(key)
  if (!deps) {
    return console.error('no deps')
  }
  deps.forEach(effect => {
    if (effect?.options?.scheduler) {
      effect?.options?.scheduler?.()
    } else {
      effect()
    }
  })
}
