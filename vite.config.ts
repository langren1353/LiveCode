import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@': `${path.resolve(__dirname, 'src')}/`,
      '@comp': `${path.resolve(__dirname, 'src')}/components`,
      '@/comp': `${path.resolve(__dirname, 'src')}/components`,
      '@repl': `${path.resolve(__dirname, 'src')}/lib/repl`,
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    vueJsx(),
    Pages(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    Components({
      dts: true,
    }),
    Unocss(),
  ],
})
