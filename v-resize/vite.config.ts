import { defineConfig } from 'vite'

// umd 支持amd cmd cjs 全局变量模式
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'useResize',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          useResize: 'useResize',
        },
      },
    },
  },
})
