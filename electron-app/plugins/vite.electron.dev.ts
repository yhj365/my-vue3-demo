// 开发环境的插件electron
import type { Plugin } from 'vite'
import type { AddressInfo } from 'net'
import { spawn } from 'child_process'
import fs from 'fs'

// vite 插件要求必须导出一个对象，对象必须要name属性
// 在这个对象中有很多钩子
const buildBackground = () => {
  require('esbuild').buildSync({
    entryPoints: ['src/background.ts'],
    bundle: true,
    outfile: 'dist/background.js',
    platform: 'node',
    target: 'node12',
    external: ['electron'],
  })
}
export const ELectronDevPlugin = (): Plugin => {
  return {
    name: 'electron-dev',
    // 配置vite钩子
    configureServer(server) {
      buildBackground()
      server?.httpServer?.once('listening', () => {
        // 读取vite服务的信息
        const addressInfo = server?.httpServer?.address() as AddressInfo
        // 拼接ip地址 给electron 启动服务的时候使用
        const IP = `http://localhost:${addressInfo.port}`

        // 第一个参数是electron的入口文件
        // require('electron') 返回的是一个路径
        // electron 不认识ts文件 需要编译成js文件
        // 进程传参
        // 参数顺序是[electron, 'dist/background.js', IP],所以获取时使用索引获取
        let ElectronProcess = spawn(require('electron'), ['dist/background.js', IP])
        fs.watchFile('scr/background.ts', () => {
          ElectronProcess.kill()
          buildBackground()
          ElectronProcess = spawn(require('electron'), ['dist/background.js', IP])
        })
        ElectronProcess.stderr.on('data', (data: string) => {
          console.log('日志==>', data.toString())
        })
      })
    },
  }
}
