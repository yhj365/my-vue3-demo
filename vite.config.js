import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx';
import myJsx from './plugin/index'
import path from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    DefineOptions(),
    vue(),
    // vueJsx()
    // 手写vueJsx插件
    myJsx(),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-import.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // * EsLint 报错信息显示在浏览器界面上
    eslintPlugin(),
  ],
  resolve: {
    alias: {
      // 设置路径
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/bem.scss";`,
      },
    },
  },
})
