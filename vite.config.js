import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  publicPath: "./",
  resolve:{
    alias:{
      // 设置路径
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/bem.scss";`
      }
    }
  }
})