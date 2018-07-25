import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
        path: 'login',
        name: 'login',
        component: resolve => require(['@/container/enter/Login'], resolve),
        meta: { keepAlive: true }
      }]
    }
  ]
})
