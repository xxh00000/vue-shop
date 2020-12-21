/*
 * @Author: your name
 * @Date: 2020-12-14 12:40:22
 * @LastEditTime: 2020-12-14 13:28:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-shop\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})
// //配置路由守卫
router.beforeEach((to, from, next) => {
  //如果访问登录页直接放行
  if (to.path === '/login') {
    return next()
  }
  //如果用户不访问登录页，进行判断
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  if (!userInfo) {
    return next('/login')
  }
  next()
})

export default router