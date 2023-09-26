import type { App } from 'vue'
import { app } from './main'

interface Use {
  install: (app: App, ...options: any) => void
}

const installList = new Set()
export function MyUse<T extends Use>(plugin: T, ...options: any[]) {
  if (installList.has(plugin)) {
    console.error('已经注册', plugin)
  } else {
    plugin.install(app, ...options)
    installList.add(plugin)
  }
}
