import { render, reactive } from './vdom'

const app = document.querySelector('#app')

const template = `
    <h1>{{ title }}</h1>
`
const data = reactive({
  title: 'this is a title',
})

render(app, template, data)

setTimeout(() => {
  data.title = 'this is new title'
}, 3000)
