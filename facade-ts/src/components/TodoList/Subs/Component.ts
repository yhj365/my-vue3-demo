import { ITodoData } from '../../../typings'

abstract class Component {
  constructor() {}
  protected static inputView(placeholderText: string, buttonText: string): string {
    return `
        <div>
            <input class="todo-input" type="text" placeholder="${placeholderText}" />
            <button class="add-btn">${buttonText}</button>
        </div>
    `
  }

  protected static todoView(todo: ITodoData): string {
    const { id, content, completed } = todo
    return `
        <div class="todo-item">
            <input type="checkbox" data-id="${id}" ${completed ? 'checked' : ''}/>
            <span style="text-decoration: ${completed ? 'line-through' : ''}">${content}</span>
            <button data-id="${id}" class="remove-btn">删除</button>
        </div>
    `
  }

  protected static listView(data: ITodoData[]): string {
    return `
        <div class="todo-list">
        ${
          data.length
            ? data.map((todo: ITodoData) => {
                return Component.todoView(todo)
              })
            : '暂无数据'
        }
        </div>
    `
      .split(',')
      .join('')
  }
}

export default Component
