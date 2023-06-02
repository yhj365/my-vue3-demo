
const SHAPEFLAG = {
  ELEMENT: 1,
  TEXT: 1 << 1,
  COMPONENT: 1 << 2,
  TEXT_CHILDREN: 1 << 3,
  ARRAY_CHILDREN: 1 << 4
}

// 创建一个vnode
const h = (type, props, children)=>{
  let shapeFlag = 0
  // 根据type类型判断节点类型，存到shapeFlag
  if(typeof type ==='string'){
    shapeFlag = SHAPEFLAG.ELEMENT
  }else if (type === Text){
    console.log(type);
    shapeFlag |= SHAPEFLAG.TEXT
  }else{
    shapeFlag |= SHAPEFLAG.COMPONENT
  }

  // 根据children 的类型 ，判断子节点的类型，保存在 shaoeFlag
  if(typeof children === 'string'){
    shapeFlag |= SHAPEFLAG.ELEMENT
  } else if (typeof children === 'number'){
    shapeFlag |= SHAPEFLAG.TEXT_CHILDREN
    children = children + ''
  }else if(Array.isArray(children)){
    shapeFlag |= SHAPEFLAG.ARRAY_CHILDREN
  }
  return {
    type,
    props,
    children,
    shapeFlag,
    el: null,
    key: props && props.key
  }
}

export const render = (vnode, container)=> {
  container.innerHTML = ''
  mount(vnode, container)
}

const mount = (vnode, container)=>{
  const { shapeFlag } = vnode;
  if(shapeFlag & SHAPEFLAG.TEXT){
    // 单独调用文本节点的演染方法
    mountTextNode(vnode, container)
  }else if(shapeFlag & SHAPEFLAG.ELEMENT ){
    // 元素节点的挂裁方法
    mountElement(vnode, container)
    
  }else if(shapeFlag & SHAPEFLAG.COMPONENT ){
    
    mountComponent(vnode, container)
  }
}
    
const mountTextNode = (vnode, container) => {
  const textNode = document.createTextNode(vnode.children)
  container.appendChild(textNode)
  vnode.el = textNode
}
const mountElement = (vnode, container) => {
  const {
    type,
    props,
    children,
    shapeFlag, 
  } = vnode
  const el = document.createElement(type)
  // 挂载属性
  mountprops(props, el)
  // 子节点类型不同， 调用不同的方法 挂载子节点
  if(shapeFlag & SHAPEFLAG.TEXT_CHILDREN){
    mountTextNode(vnode,el)
  }else if( shapeFlag & SHAPEFLAG.ARRAY_CHILDREN){
    moutChildren(children, el)
  }
  container.appendChild(el)
  vnode.el = el
}

const moutChildren = (children,container) => {
  children.forEach( child => {
    mount(child ,container)
  })
}
// 组件
const mountComponent = (vnode, container) => {

}
//js当中 事件都是以on开头
const eventReg = /^on[A-Z]/

const mountprops = (props, el) => {
  for(const key in props) {
    const value = props[key];
    switch (key) {
      case "class":
        el.className = value;
        break;
      case "style":
        for (const styleName in value) {
          el.style[styleName] = value[styleName]
        }
        break;
      default:
        if (eventReg.test(key)) {
          // onclick 转为 click
          const eventName = key.slice(2).toLowerCase()
          el.addEventListener(eventName, value) 
        }else {
          el.setAttribute(key, value)
        }
        break;
    }
  }
}

const unmount = vnode => {
  // 前文说的 el 派上用场了
  const {el} = vnode;
  el.parentNode.removeChild(el);
}
const unmountChildren = children => {
  children.forEach(child =>{
    unmount(child);
  });
}

// 普通渲染
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

