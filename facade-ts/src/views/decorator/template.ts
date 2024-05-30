import { ITodo } from './index'

export function todoView({ id, content, completed }: ITodo): string {
  return `
      <input type="checkbox" data-id="${id}" ${completed ? 'checked' : ''}/>
      <span style="text-decoration: ${completed ? 'line-through' : 'none'}">${content}</span>
      <button data-id="${id}" class="remove-btn">删除</button>
    `
}
