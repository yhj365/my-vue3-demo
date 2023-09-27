import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ELectronDevPlugin } from './plugins/vite.electron.dev'
import { ELectronBuildPlugin } from './plugins/vite.electron.build'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ELectronDevPlugin(), ELectronBuildPlugin()],
  base: './', // 默认绝对路径，需要改成相对路径
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
