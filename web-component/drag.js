;(function () {
  const transform = getTransform()

  function Drag(selector) {
    this.elem = typeof selector === 'Object' ? selector : document.getElementById(selector)
    this.startX = 0
    this.startY = 0
    this.sourceX = 0
    this.sourceY = 0
    this.init()
  }
  Drag.prototype = {
    constructor: Drag,
    init: function () {
      this.setDrag()
    },
    // 稍作改造 仅用于获取当前元素的属性
    getStyle: function (property) {
      return document.defaultView.getComputedStyle
        ? document.defaultView.getComputedStyle(this.elem, false)[property]
        : this.elem.currentStyle[property]
    },
    // 用来获取当前元素的位置信息 ，注意与之前 的不同之处
    getPosition: function () {
      let pos = { x: 0, y: 0 }
      if (transform) {
        const transformValue = this.getStyle(transform)
        if (transformValue === 'none') {
          this.elem.style[transform] = `translate(0, 0)`
        } else {
          const temp = transformValue.match(/-?\d+/g)
          pos = {
            x: parseInt(temp[4].trim()),
            y: parseInt(temp[5].trim()),
          }
        }
      } else {
        if (this.getStyle('position') === 'static') {
          this.elem.style.position === 'relative'
        } else {
          pos = {
            x: parseInt(this.getStyle('left') ? this.getStyle('left') : 0),
            y: parseInt(this.getStyle('top') ? this.getStyle('top') : 0),
          }
        }
      }
      return pos
    },
    // 用来设置当前元素的位置
    setPostion: function (pos) {
      if (transform) {
        this.elem.style[transform] = `translate(${pos.x}px,${pos.y}px)`
      } else {
        this.elem.style.left = pos.x + 'px'
        this.elem.style.top = pos.y + 'px'
      }
    },
    // 该方法用来绑定事件
    setDrag: function () {
      const self = this
      this.elem.addEventListener('mousedown', start, false)
      function start(event) {
        self.startX = event.pageX
        self.startY = event.pageY
        const pos = self.getPosition()
        self.sourceX = pos.x
        self.sourceY = pos.y
        document.addEventListener('mousemove', move, false)
        document.addEventListener('mouseup', end, false)
      }
      function move(event) {
        const currentX = event.pageX
        const currentY = event.pageY

        const distanceX = currentX - self.startX
        const distanceY = currentY - self.startY

        self.setPostion({
          x: (self.sourceX + distanceX).toFixed(),
          y: (self.sourceY + distanceY).toFixed(),
        })
      }
      function end(event) {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', end)
      }
    },
  }

  function getTransform(params) {
    let transform = ''
    const divStyle = document.createElement('div').style
    const transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform']
    let i = 0
    let len = transformArr.length
    for (; i < len; i++) {
      if (transformArr[i] in divStyle) {
        return (transform = transformArr[i])
      }
    }
    return transform
  }

  window.Drag = Drag
})()
