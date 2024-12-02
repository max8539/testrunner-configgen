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
      path: '/editor',
      name: 'editor',
      // route level code-splitting
      component: () => import('@/pages/editor.vue'),
    },
  ],
})

export default router
