const app = document.querySelector('#app')
/*eslint-disable*/const data = reactive({  title: 'this is a title',  content: 'this is content',});setTimeout(() => {  data.title = 'this is new title'}, 3000);
const doms = {
        tag_0: {
            dom: document.createElement('h1'),
            key: 'title'
        },
    
        tag_1: {
            dom: document.createElement('p'),
            key: 'content'
        },
    }
    
function reactive(data) {
  return new Proxy(data, {
    get(obj, key) {
      return Reflect.get(obj, key)
    },
    set(obj, key, value) {
      const res = Reflect.set(obj, key, value)
      update(key, value)
      return res
    },
  })
}

    
function render(app, doms, data) {
  const fragment = document.createDocumentFragment()

  for (let tag in doms) {
    doms[tag].dom.innerText = data[doms[tag].key.trim()]
    fragment.appendChild(doms[tag].dom)
  }

  app.appendChild(fragment)
}

    
function update(key, value) {
  for (let k in doms) {
    const o = doms[k]
    if (o.key === key) {
      o.dom.innerText = value
    }
  }
}

    
render(app,doms,data)

  