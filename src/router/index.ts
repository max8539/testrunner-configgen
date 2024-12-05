import { createRouter, createWebHashHistory } from 'vue-router'
import index from '@/pages/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/create',
      name: 'create',
      component: () => import("@/pages/create.vue")
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/pages/editor.vue'),
    },
    {
      path: '/export',
      name: 'export',
      component: () => import('@/pages/export.vue')
    }
  ],
})

export default router
