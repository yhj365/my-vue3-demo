const SHAPEFLAG = {
  ELEMENT: 1,
  TEXT: 1 << 1,
  COMPONENT: 1 << 2,
  TEXT_CHILDREN: 1 << 3,
  ARRAY_CHILDREN: 1 << 4,
}
const Text = Symbol('Text')
//js当中 事件都是以on开头
const eventReg = /^on[A-Z]/

// 创建一个vnode
const h = (type, props, children) => {
  let shapeFlag = 0
  // 根据type类型判断节点类型，存到shapeFlag
  if (typeof type === 'string') {
    shapeFlag = SHAPEFLAG.ELEMENT
  } else if (type === Text) {
    console.log(type)
    shapeFlag |= SHAPEFLAG.TEXT
  } else {
    shapeFlag |= SHAPEFLAG.COMPONENT
  }

  // 根据children 的类型 ，判断子节点的类型，保存在 shaoeFlag
  if (typeof children === 'string') {
    shapeFlag |= SHAPEFLAG.ELEMENT
  } else if (typeof children === 'number') {
    shapeFlag |= SHAPEFLAG.TEXT_CHILDREN
    children = children + ''
  } else if (Array.isArray(children)) {
    shapeFlag |= SHAPEFLAG.ARRAY_CHILDREN
  }
  return {
    type,
    props,
    children,
    shapeFlag,
    el: null,
    key: props && props.key,
  }
}

export const render = (vnode, container) => {
  const prevNode = container._vnode
  if (vnode) {
    patch(prevNode, vnode, container)
  } else {
    prevNode && unmount(prevNode)
  }
  // container.innerHTML = ''
  mount(vnode, container)
}

export const processTextNode = (n1, n2, container) => {
  if (n1) {
    patchTextNode(n1, n2)
  } else {
    mountTextNode(n2, container)
  }
}
export const processElement = (n1, n2, container) => {
  if (n1) {
    patchElement(n1, n2)
  } else {
    mountElement(n2, container)
  }
}
export const patch = (n1, n2, container) => {
  if (n1 && n1.type !== n2.type) {
    unmount(n1)
    nl = null
  }
  const { shapeFlag } = n2
  if (shapeFlag & SHAPEFLAG.TEXT) {
    processTextNode(n1, n2, container)
  } else if (shapeFlag & SHAPEFLAG.ELEMENT) {
    processElement(n1, n2, container)
  }
}

const patchTextNode = (n1, n2) => {
  n2.el = n1.el
  n1.el.textContent = n2.children
}

const patchElement = (n1, n2) => {
  n2.el = n1.el

  patchProps(n1.props, n2.props, n2.el)
  patchChildren(n1, n2, n2.el)
}

const patchProps = (oldProps, newProps, el) => {
  if (oldprops === newProps) {
    return
  }
  for (const key in oldprops) {
    if (newprops[key] == null) {
      patchDomProps(oldprops[key], null, key, el)
    }
  }
  for (const key in newProps) {
    const prev = oldprops[keyl]
    const next = newProps[key]
    if (prev !== next) {
      patchDomProps(prev, next, key, el)
    }
  }
}

const patchDomProps = (prev, next, key, el) => {
  switch (key) {
    case 'class':
      el.className = next || ''
      break
    case 'style':
      if (next == null) {
        el.removeAttribute('style')
      } else {
        if (prev) {
          for (const styleName in prev) {
            if (next[styleName] == null) {
              el.style[styleName] = ''
            }
          }
        }
        for (const styleName in next) {
          el.style[styleName] = next[styleName]
        }
      }
      break
    default:
      if (eventReg.test(key)) {
        const eventName = key.slice(2).toLowerCase()
        if (prev) {
          el.removeEventListener(eventName, prev)
        }
        if (next) {
          el.addEventListener(eventName, next)
        }
      } else {
        if (next == null || next == false) {
          el.removeEventListener(key)
        }
        if (next) {
          el.addEventListener(key, next)
        }
      }
      break
  }
}

const patchChildren = (n1, n2, container) => {
  const { shapeflag: prevShapeFlag, children: prevChildren } = n1
  const { shapeflag: nextShapeFlag, children: nextChildren } = n2

  if (prevShapeFlag & SHAPEFLAG.TEXT_CHILDREN) {
    if (nextShapeFlag & SHAPEFLAG.TEXT_CHILDREN) {
      container.textContent = nextChildren
    } else if (nextShapeFlag & SHAPEFLAG.ARRAY_CHILDREN) {
      container.textContent = ''
      moutChildren(nextChildren, container)
    } else {
      container.textContent = ''
    }
  } else if (prevShapeFlag & SHAPEFLAG.ARRAY_CHILDREN) {
    if (nextShapeFlag & SHAPEFLAG.TEXT_CHILDREN) {
      unmountChildren(prevChildren)
      container.textContent = nextChildren
    } else if (nextShapeFlag & SHAPEFLAG.ARRAY_CHILDREN) {
      patchArrayChildren(prevChildren, nextChildren, container)
    } else {
      unmountChildren(nextChildren, container)
    }
  }
}
const patchArrayChildren = (prev, next, container) => {
  const oldLength = prev.length
  const newLength = next.length
  const commomLengtn = Math.min(oldLength, newLength)
  for (let i = 0; i < commomLengtn; i++) {
    patch(prev[i], next[i], container)
  }
  if (oldLength > newLength) {
    unmountChildren(prev.slice(commomLengtn))
  } else if (oldlength < newlength) {
    moutChildren(next.slice(commomLengtn), container)
  }
}

const mount = (vnode, container) => {
  const { shapeFlag } = vnode
  if (shapeFlag & SHAPEFLAG.TEXT) {
    // 单独调用文本节点的演染方法
    mountTextNode(vnode, container)
  } else if (shapeFlag & SHAPEFLAG.ELEMENT) {
    // 元素节点的挂裁方法
    mountElement(vnode, container)
  } else if (shapeFlag & SHAPEFLAG.COMPONENT) {
    mountComponent(vnode, container)
  }
}

const mountTextNode = (vnode, container) => {
  const textNode = document.createTextNode(vnode.children)
  container.appendChild(textNode)
  vnode.el = textNode
}
const mountElement = (vnode, container) => {
  const { type, props, children, shapeFlag } = vnode
  const el = document.createElement(type)
  // 挂载属性
  mountprops(props, el)
  // 子节点类型不同， 调用不同的方法 挂载子节点
  if (shapeFlag & SHAPEFLAG.TEXT_CHILDREN) {
    mountTextNode(vnode, el)
  } else if (shapeFlag & SHAPEFLAG.ARRAY_CHILDREN) {
    moutChildren(children, el)
  }
  container.appendChild(el)
  vnode.el = el
}

const moutChildren = (children, container) => {
  children.forEach(child => {
    patch(child, container)
  })
}
// 组件
const mountComponent = (vnode, container) => {
  console.log(vnode, container)
}

const mountprops = (props, el) => {
  for (const key in props) {
    const value = props[key]
    switch (key) {
      case 'class':
        el.className = value
        break
      case 'style':
        for (const styleName in value) {
          el.style[styleName] = value[styleName]
        }
        break
      default:
        if (eventReg.test(key)) {
          // onclick 转为 click
          const eventName = key.slice(2).toLowerCase()
          el.addEventListener(eventName, value)
        } else {
          el.setAttribute(key, value)
        }
        break
    }
  }
}

const unmount = vnode => {
  // 前文说的 el 派上用场了
  console.log(vnode)
  const { el } = vnode
  el.parentNode.removeChild(el)
}
const unmountChildren = children => {
  children.forEach(child => {
    unmount(child)
  })
}

// 普通渲染test
// render(
//   h(
//     // div ul styoe onClick chilren
//     'ul',{
//       class: 'classul',
//       style:{
//         border: '1px soild #000',
//         fontsize:'18px',
//       },
//       onClick: () => console.log('click'),
//       id:'idid',
//     },[
//       h('li', null,1),
//       h('li', null,[h(Text, null,'2')]),
//       h('li', null, 3)
//     ]

//   ),
//   document.getElementById('app')
// )

// 修改节点重新渲染test
render(
  h('ul', null, [
    h('li', null, '我是 first'),
    h('li', null, [h('li', null, '我是second 的1'), h('li', null, '我是second 的2'), h('li', null, '我是second 的3')]),
    h('li', null, 'third'),
  ]),
  document.body
)
setTimeout(() => {
  h('ul', null, [
    h('li', null, 'first'),
    h('li', null, [
      h('li', null, '我是second 的first'),
      h('li', null, '我是second 的我是second'),
      h('li', null, '我是second 的third'),
    ]),
    h('li', null, 'third'),
  ]),
    document.body
}, 5000)
