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
      component: resolve => require(['@/views/index'], resolve),
      meta: { keepAlive: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: resolve => require(['@/views/home'], resolve),
          meta: { keepAlive: true },
          children: [
            {
              path: '/',
              name: 'welcome',
              component: resolve => require(['@/views/docs/welcome'], resolve)
            },
            {
              path: '/hx-image',
              name: 'hx-image',
              component: resolve => require(['@/views/docs/image'], resolve)
            },
            {
              path: '/hx-button',
              name: 'hx-button',
              component: resolve => require(['@/views/docs/button'], resolve)
            },
            {
              path: '/hx-input',
              name: 'hx-input',
              component: resolve => require(['@/views/docs/input'], resolve)
            }
          ]
        },
        {
          path: '/style/list',
          name: 'styleList',
          component: resolve => require(['@/views/style/list'], resolve)
        },
        {
          path: '/style/display',
          name: 'styleDisplay',
          component: resolve => require(['@/views/style/display'], resolve)
        }, 
        {
          path: '/components/response',
          name: 'componentsResponse',
          component: resolve => require(['@/views/components/response'], resolve)
        },
        {
          path: '/plugins/list',
          name: 'pluginsList',
          component: resolve => require(['@/views/plugins/list'], resolve)
        },
        {
          path: '/plugins/global',
          name: 'pluginsGlobal',
          component: resolve => require(['@/views/plugins/global'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login'], resolve),
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
