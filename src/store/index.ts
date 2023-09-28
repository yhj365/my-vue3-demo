import { defineStore } from 'pinia'
import { Names } from './store-name'

type User = {
  name: string
  age: number
}
export const useTestStore = defineStore(Names.TEST, {
  state: () => {
    return {
      current: 123,
      name: 'yhj',
      user: <User>{},
    }
  },
  // computed 修饰一些值
  getters: {
    newName(): string {
      return `$getters--${this.name}`
    },
  },
  // methods 可以做同步 异步都可以做 提交state
  actions: {
    setCurrent(value: number) {
      this.current = value
    },
    setName(value: string) {
      this.name = value
    },
    setUser(value: User) {
      this.user = value
    },
  },
})
