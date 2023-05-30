import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import { h } from 'vue'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [{ path: '/', component: () => import('@/views/home') },
      {
        path: '/member',
        component: () => import('@/views/member/Layout'),
        children: [
          {
            path: '/member',
            component: () => import('@/views/member/home'),
            children: [{
              path: '/member/order',
              // 创建一个RouterView容器形成嵌套关系
              component: { render: () => h(<RouterView />) },
              children: [
                { path: '', component: () => import('@/views/member/order') },
                { path: ':id', component: () => import('@/views/member/order/detail') }
              ]
            }]
          }
        ]
      },
      { path: '/category/:id', component: () => import('@/views/category/index.vue') },
      { path: '/category/sub/:id', component: () => import('@/views/category/sub.vue') },
      { path: '/product/:id', component: () => import('@/views/goods/index') },
      { path: '/cart', component: () => import('@/views/cart/index') },
      { path: '/member/checkout', component: () => import('@/views/member/pay/checkout') },
      { path: '/member/pay', component: () => import('@/views/member/pay/index') },
      { path: '/pay/callback', component: () => import('@/views/member/pay/pay-result') }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index') },
  { path: '/login/callback', component: () => import('@/views/login/callback.vue') }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else return { left: 0, top: 0 }
    // vue2.0  x  y  控制
    // vue3.0  left  top 控制
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登录的路由：地址是以 /member 开头
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
