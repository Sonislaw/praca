import './style.css'
import { createPinia } from 'pinia'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(App, { routes, scrollBehavior: () => ({ top: 0 }) }, ({ app }) => {
  app.use(createPinia())
})
