const Vue = window.Vue
const Router = window.VueRouter

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      // component: resolve => require(['@/views/index.vue'], resolve),
      meta: { keepAlive: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: resolve => require(['@/views/home.vue'], resolve)
        },
        {
          path: '/style/list',
          name: 'styleList',
          component: resolve => require(['@/views/style/list.vue'], resolve)
        },
        {
          path: '/style/display',
          name: 'styleDisplay',
          component: resolve => require(['@/views/style/display.vue'], resolve)
        }, 
        {
          path: '/components',
          name: 'components',
          component: resolve => require(['@/views/components/index.vue'], resolve),
          meta: { keepAlive: true },
          children: [
            {
              path: '/components/hx-image',
              name: 'hx-image',
              component: resolve => require(['@/views/components/image.vue'], resolve)
            },
            {
              path: '/components/hx-button',
              name: 'hx-button',
              component: resolve => require(['@/views/components/button.vue'], resolve)
            },
            {
              path: '/components/hx-input',
              name: 'hx-input',
              component: resolve => require(['@/views/components/input.vue'], resolve)
            },
            {
              path: '/components/select',
              name: 'select',
              component: resolve => require(['@/views/components/select.vue'], resolve)
            }
          ]
        },
        {
          path: '/plugins',
          name: 'plugins',
          component: resolve => require(['@/views/plugins/index.vue'], resolve),
          meta: { keepAlive: true },
          children: [
            {
              path: '/plugins/confirm',
              name: 'confirm',
              component: resolve => require(['@/views/plugins/confirm.vue'], resolve)
            },
            {
              path: '/plugins/toast',
              name: 'toast',
              component: resolve => require(['@/views/plugins/toast.vue'], resolve)
            },
            {
              path: '/plugins/validate',
              name: 'validate',
              component: resolve => require(['@/views/plugins/validate.vue'], resolve)
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login.vue'], resolve),
      meta: { keepAlive: true }
    }
  ]
})
