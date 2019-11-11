import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/me',
    component: () => import('../views/Me.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/guc',
    component: () => import('../views/GouWuChe1.vue')
  },
  {
    path: '/gucc',
    component: () => import('../views/GouWuChe2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
