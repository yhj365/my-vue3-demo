import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite';

export default defineConfig({
  plugins: [DefineOptions(),vue(),vueJsx()],
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