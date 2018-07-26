import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/home',
      component: HelloWorld,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/containers/enter/Login'], resolve),
      meta: { keepAlive: true }
    }
  ]
})
