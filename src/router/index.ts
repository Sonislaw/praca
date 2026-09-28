import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/ile-na-reke-uop', name: 'uop', component: () => import('@/views/UopCalculatorView.vue') },
  { path: '/ile-na-reke-b2b', name: 'b2b', component: () => import('@/views/B2bCalculatorView.vue') },
  { path: '/b2b-vs-uop', name: 'comparison', component: () => import('@/views/ComparisonView.vue') },
  { path: '/polityka-prywatnosci', name: 'privacy', component: () => import('@/views/PrivacyPolicyView.vue') },
]
