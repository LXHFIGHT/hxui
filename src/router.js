const Vue = window.Vue
const Router = window.VueRouter

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: resolve => require(['@/views/index'], resolve),
      children: [
        {
          path: '/',
          name: 'home',
          component: resolve => require(['@/views/home'], resolve)
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
          path: '/components',
          name: 'components',
          component: resolve => require(['@/views/components/index'], resolve),
          meta: { keepAlive: true },
          children: [
            {
              path: '/components/hx-image',
              name: 'hx-image',
              component: resolve => require(['@/views/components/image'], resolve)
            },
            {
              path: '/components/hx-button',
              name: 'hx-button',
              component: resolve => require(['@/views/components/button'], resolve)
            },
            {
              path: '/components/hx-input',
              name: 'hx-input',
              component: resolve => require(['@/views/components/input'], resolve)
            },
            {
              path: '/components/select',
              name: 'select',
              component: resolve => require(['@/views/components/select'], resolve)
            }
          ]
        },
        {
          path: '/plugins',
          name: 'plugins',
          component: resolve => require(['@/views/plugins/index'], resolve),
          meta: { keepAlive: true },
          children: [
            {
              path: '/plugins/confirm',
              name: 'confirm',
              component: resolve => require(['@/views/plugins/confirm'], resolve)
            },
            {
              path: '/plugins/toast',
              name: 'toast',
              component: resolve => require(['@/views/plugins/toast'], resolve)
            },
            {
              path: '/plugins/validate',
              name: 'validate',
              component: resolve => require(['@/views/plugins/validate'], resolve)
            }
          ]
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
