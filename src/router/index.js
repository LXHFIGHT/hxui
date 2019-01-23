import Vue from 'vue'
import Router from 'vue-router'
import { initMenus } from './menus'
// import Main from '@/components/admin/Admin'
import Info from '@/components/info/Info'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Info,
      meta: { keepAlive: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: resolve => require(['@/containers/enter/Home'], resolve),
          meta: { keepAlive: true },
          children: [
            {
              path: '/',
              name: 'welcome',
              component: resolve => require(['@/containers/docs/Welcome'], resolve)
            },
            {
              path: '/hx-image',
              name: 'hx-image',
              component: resolve => require(['@/containers/docs/Image'], resolve)
            },
            {
              path: '/hx-button',
              name: 'hx-button',
              component: resolve => require(['@/containers/docs/Button'], resolve)
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: resolve => require(['@/containers/layout/List'], resolve)
        },
        {
          path: '/components',
          name: 'components',
          component: resolve => require(['@/containers/layout/Components'], resolve)
        },
        {
          path: '/form',
          name: 'form',
          component: resolve => require(['@/containers/form/Form'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/containers/enter/Login'], resolve),
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
