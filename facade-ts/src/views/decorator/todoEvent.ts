import { ITodo } from './index'

let todoData: ITodo[] = []

export function addTodo(target: any, metheedName: string, description: PropertyDescriptor) {
  const _origin = description.value
  description.value = function (todo: ITodo) {
    const _todo: ITodo | null = todoData.find((item: ITodo) => {
      return item.content === todo.content
    })

    if (_todo) {
      return alert('该项已存在')
    }
    todoData.push(todo)
    _origin.call(this, todo)
  }
}

export function removeTodo(target: any, metheedName: string, description: PropertyDescriptor) {
  const _origin = description.value
  description.value = function (id: number) {
    todoData = todoData.filter((item: ITodo) => item.id !== id)
    _origin.call(this, id)
  }
}

export function changeCompleted(target: any, metheedName: string, description: PropertyDescriptor) {
  const _origin = description.value
  description.value = function (id: number) {
    todoData = todoData.map((todo: ITodo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
        _origin.call(this, id, todo.completed)
      }
      return todo
    })
  }
}
