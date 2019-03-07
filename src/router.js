import Vue from 'vue'
import Router from 'vue-router'
import { initMenus } from './config/menus'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: resolve => require(['@/views/Index'], resolve),
      meta: { keepAlive: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: resolve => require(['@/views/enter/Home'], resolve),
          meta: { keepAlive: true },
          children: [
            {
              path: '/',
              name: 'welcome',
              component: resolve => require(['@/views/docs/Welcome'], resolve)
            },
            {
              path: '/hx-image',
              name: 'hx-image',
              component: resolve => require(['@/views/docs/Image'], resolve)
            },
            {
              path: '/hx-button',
              name: 'hx-button',
              component: resolve => require(['@/views/docs/Button'], resolve)
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: resolve => require(['@/views/layout/List'], resolve)
        },
        {
          path: '/components',
          name: 'components',
          component: resolve => require(['@/views/layout/Components'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/enter/Login'], resolve),
      meta: { keepAlive: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 根据当前页前端路由判断打开侧边栏按钮
  initMenus(to.path)
  // 页面跳转统一处理方法
  next()
})

export default router
