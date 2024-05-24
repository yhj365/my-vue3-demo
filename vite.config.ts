import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx';
import myJsx from './plugin/index'
import path from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'

// vite.config不能使用import.env获取环境信息
// 可以使用loadEnv(mode, process.cwd()获取环境变量
export default ({ mode }: any) => {
  return defineConfig({
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3333',
          rewrite: path => path.replace(/^\/api/, '/api'),
        },
      },
    },
    plugins: [
      DefineOptions(),
      vue({
        // 使用web component,注册组件为yhj- 开头的使用attachShadow，组件文件名称必须是 .ce.vue 结尾
        template: {
          compilerOptions: {
            isCustomElement: tag => tag.includes('yhj-'),
          },
        },
      }),
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
      // 性能报告,默认关闭
      visualizer({
        open: false,
      }),
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
    // 简单的vite配置性能优化，vite-plugin-pwa离线缓存
    build: {
      chunkSizeWarningLimit: 1024,
      cssCodeSplit: true,
      sourcemap: false,
      minify: 'terser',
      assetsInlineLimit: 4000,
    },
  })
}
