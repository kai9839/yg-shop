import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [{
      path: '/',
      component: () => import('@/views/home')
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
