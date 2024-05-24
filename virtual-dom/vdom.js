// 1. 编译模版

const regHTMML = /\<(.+?)\>\{\{(.+?)\}\}\<\/.+?\>/
let _app = null
let _data = null
let _vDOM = null
let _template = ''

function compileTemplate(template, data) {
  const vDOM = []
  const matched = template.match(new RegExp(regHTMML, 'gi'))
  matched.forEach((tag, index) => {
    const [, tagName, key] = tag.match(new RegExp(regHTMML, 'i'))
    vDOM[index] = {
      tag: tagName,
      children: data[key.trim()],
    }
  })
  return vDOM
}

export function render(app, template, data) {
  _vDOM = compileTemplate(template, data)
  _template = template
  _data = data
  _app = app

  const fragment = document.createDocumentFragment()
  _vDOM.forEach(vnode => {
    const { tag, children } = vnode
    const node = document.createElement(tag)
    node.innerText = children
    fragment.appendChild(node)
  })

  app.appendChild(fragment)
}

export function reactive(data) {
  _data = new Proxy(data, {
    get(obj, key) {
      return Reflect.get(obj, key)
    },
    set(obj, key, value) {
      const res = Reflect.set(obj, key, value)
      update(value)
      return res
    },
  })
  return _data
}

function update(value) {
  const newVDOM = compileTemplate(_template, _data)
  newVDOM.forEach((vnode, index) => {
    if (vnode.children !== _vDOM[index].children) {
      patch(value, index)
      _vDOM = newVDOM
    }
  })
}

function patch(value, index) {
  const childNodes = app.children
  childNodes[index].innerText = value
}
