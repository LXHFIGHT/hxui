import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/main/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Main,
      meta: { keepAlive: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: resolve => require(['@/containers/enter/Home'], resolve)
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
