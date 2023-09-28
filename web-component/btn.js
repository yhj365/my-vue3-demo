class Btn extends HTMLElement {
  constructor() {
    super()

    const shadowDom = this.attachShadow({ mode: 'open' })

    // 原生方法
    this.p = this.h('p')
    this.p.innerText = 'hello world'
    this.p.setAttribute('style', 'width: 200px; height:200px;border: 1px solid #ccc;')
    shadowDom.appendChild(this.p)

    // template方法
    this.template = this.h('template')
    // 内部的style与外部隔离
    this.template.innerHTML = `
      <style>
        div{
          width: 240px;
          height: 240px;
          border: 1px solid #000;
        }
      </style>
      <div>hello template</div>
    `
    shadowDom.appendChild(this.template.content.cloneNode(true))
  }
  h(el) {
    return document.createElement(el)
  }
  // 有4个生命周期
  connectedCallback() {
    console.log('Parent.connectedCallback')
  }

  disconnectedCallback() {
    console.log('Parent.disconnectedCallback')
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    console.log('Parent 属性发生了变化', ' prop=', prop, ' oldValue=', oldValue, ' newValue=', newValue)
  }

  adoptedCallback() {
    console.log('Parent 发生了移动')
  }
}

window.customElements.define('hj-btn', Btn)
