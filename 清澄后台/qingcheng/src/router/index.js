import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        component: () => import('../views/index/Index.vue')
      },
      {
        path: '/login-log',
        component: () => import('../views/index/LoginLog.vue')
      },
      {
        path: 'goods-add',
        component: () => import('../views/goods/GoodsAdd.vue')
      },
      {
        path: 'goods-list',
        component: () => import('../views/goods/GoodsList.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
