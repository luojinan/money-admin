import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/login'
    },{
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },{
      path: '/index',
      name: 'index',
      component: () => import('./views/index.vue')
    },{
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
})

// 设置路由守卫，没有很多复杂的页面要区分登不登录的问题
// 所以直接指定除了登录页面，其他页面都要已登录状态才能进入
router.beforeEach((to,from,next)=>{
  if(to.path == '/login') next()
  else localStorage.eleToken ? next() : next('/login')
})

export default router
