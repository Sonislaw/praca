import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import type { ViteSSGOptions } from 'vite-ssg'

const sitePaths = ['/', '/ile-na-reke-uop', '/ile-na-reke-b2b', '/b2b-vs-uop']

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  ssgOptions: {
    dirStyle: 'flat',
    includedRoutes: () => sitePaths,
  } satisfies ViteSSGOptions,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
