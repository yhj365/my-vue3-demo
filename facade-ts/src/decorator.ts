import TodoList from './views/decorator'
;(doc => {
  const oTodoList: HTMLElement = doc.querySelector('.todo-list')!
  const oAddBtn: HTMLElement = doc.querySelector('.add-btn')!
  const oInput: HTMLInputElement = doc.querySelector('input')!

  const todoList: TodoList = TodoList.create(oTodoList)

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    oAddBtn.addEventListener('click', handleAddBtnClick, false)
    oTodoList.addEventListener('click', handleListClick, false)
  }

  function handleAddBtnClick() {
    const val: string = oInput.value.trim()

    if (!val.length) return
    todoList.addItem({
      id: new Date().getTime(),
      content: val,
      completed: false,
    })

    oInput.value = ''
  }

  function handleListClick(e: MouseEvent) {
    const tar = e.target as HTMLElement
    const tagName = tar.tagName.toLowerCase()

    if (tagName === 'input' || tagName === 'button') {
      const id: number = parseInt(tar.dataset.id as string)
      switch (tagName) {
        case 'input':
          todoList.toggleCompleted(id)
          break
        case 'button':
          todoList.removeItem(id)
          break
        default:
          break
      }
    }
  }

  init()
})(document)
