import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [{
      path: '/',
      component: () => import('@/views/home')
    },
    {
      path: '/category/:id',
      component: () => import('@/views/category/index.vue')
    },
    {
      path: '/category/sub/:id',
      component: () => import('@/views/category/sub.vue')
    },
    {
      path: '/product/:id',
      component: () => import('@/views/goods/index')
    }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else return { left: 0, top: 0 }
  }
})

export default router
