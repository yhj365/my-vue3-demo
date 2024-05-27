const { readFileSync, writeFileSync } = require('fs')

const { resolve } = require('path')

const fileContent = readFileSync(resolve(__dirname, 'index.vue'), 'utf8').replace(/[\r\n]/g, '')

const template = fileContent.match(/\<template\>(.+?)\<\/template\>/)[1]
const script = fileContent.match(/\<script setup\>(.+?)\<\/script\>/)[1]
const dataVar = script.replace(/\s+/g, '').match(/const(.+?)\=reactive/)[1]
const regHTMML = /\<(.+?)\>\{\{(.+?)\}\}\<\/.+?\>/

const js = compile()

writeFileSync(resolve(__dirname, 'index.js'), js, 'utf8')

function compile() {
  let js = ''
  js += `const app = document.querySelector('#app')`
  js += `\r\n${script}\r\n`
  js += `const doms = {`

  const matched = template.match(new RegExp(regHTMML, 'gi'))
  matched.forEach((tag, index) => {
    const [, tagName, key] = tag.match(new RegExp(regHTMML, 'i'))

    js += `
        tag_${index}: {
            dom: document.createElement('${tagName}'),
            key: '${key.trim()}'
        },
    `
  })
  js += `}`

  js += `
    \r\n${reactive.toString()}\r\n
    \r\n${render.toString()}\r\n
    \r\n${update.toString()}\r\n
    \r\nrender(app,doms,${dataVar})\r\n
  `
  return js
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
