import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { PostCssPxToViewPort } from './plugins/postcss-px-to-viewport'
import unocss from 'unocss/vite'
import { presetIcons, presetAttributify, presetUno } from "unocss";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    unocss({
      presets: [presetIcons(),presetAttributify(),presetUno()],
      rules: [
        ['flex', {display: 'flex'}],
        ['red', {color: 'red'}],
      ]
    })
  ],
  css: {
    postcss: {
      plugins: [PostCssPxToViewPort()]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5188,
  }
})
