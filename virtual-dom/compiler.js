const { readFileSync, writeFileSync } = require('fs')

const { resolve } = require('path')

const fileContent = readFileSync(resolve(__dirname, 'index.vue'), 'utf8').replace(/[\r\n]/g, '')

const template = fileContent.match(/\<template\>(.+?)\<\/template\>/)[1]
const script = fileContent.match(/\<script setup\>(.+?)\<\/script\>/)[1]
const dataVar = script.replace(/s+/g, '').match(/const(.+?)\=reactive/)
const regHTMML = /\<(.+?)\>\{\{(.+?)\}\}\<\/.+?\>/

const js = compile()

writeFileSync(resolve(__dirname, 'index.js'), js, 'utf8')

function compile() {
  let js = ''
  js += `const app = document.querySelector("#app")`
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
  return js
}
