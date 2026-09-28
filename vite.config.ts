import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import type { ViteSSGOptions } from 'vite-ssg'
import { VitePWA } from 'vite-plugin-pwa'

const sitePaths = ['/', '/ile-na-reke-uop', '/ile-na-reke-b2b', '/b2b-vs-uop', '/polityka-prywatnosci']

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: { enabled: false },
      manifest: {
        name: 'PracaNaRękę - kalkulatory wynagrodzeń',
        short_name: 'PracaNaRękę',
        description: 'Kalkulatory wynagrodzeń UoP i B2B.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#f7f8f6',
        theme_color: '#123b2d',
        lang: 'pl-PL',
        icons: [
          { src: '/pwa/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'] },
    }),
  ],
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
