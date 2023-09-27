// 生产环境的插件electron
import type { Plugin } from 'vite'
import fs from 'fs'
import * as electronBuilder from 'electron-builder'
import path from 'path'

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

// 打包 需要先等vite打完包之后就有index.html 在执行electron-build打包
export const ELectronBuildPlugin = (): Plugin => {
  return {
    name: 'electron-build',
    // 配置vite钩子
    closeBundle() {
      buildBackground()
      // electron-build 需要指定package.json main
      const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      json.main = 'background.js'
      fs.writeFileSync('dist/package.json', JSON.stringify(json))
      // bug electron-builder 会给你下载垃圾文件, 需要自己创建node_modules，防止下载解决这个bug
      fs.mkdirSync('dist/node_modules')
      electronBuilder.build({
        config: {
          directories: {
            output: path.resolve(process.cwd(), 'release'),
            app: path.resolve(process.cwd(), 'dist'),
          },
          files: ['**/*'],
          asar: true,
          appId: 'com.ex.app',
          productName: 'vite-electron',
          nsis: {
            oneClick: false, // 取消一键安装
            allowToChangeInstallationDirectory: true, // 允许用户选择安装目录
          },
        },
      })
    },
  }
}
