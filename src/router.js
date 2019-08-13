import Index from './views/index.vue'
const Vue = window.Vue
const Router = window.VueRouter

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Index,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('./views/home')
        },
        {
          path: '/style/list',
          name: 'styleList',
          component: () => import('./views/style/list')
        },
        {
          path: '/style/display',
          name: 'styleDisplay',
          component: () => import('./views/style/display')
        }, 
        {
          path: '/components',
          name: 'components',
          component: () => import('./views/components/index'),
          meta: { keepAlive: true },
          children: [
            {
              path: '/components/hx-image',
              name: 'hx-image',
              component: () => import('./views/components/image')
            },
            {
              path: '/components/hx-button',
              name: 'hx-button',
              component: () => import('./views/components/button')
            },
            {
              path: '/components/hx-input',
              name: 'hx-input',
              component: () => import('./views/components/input')
            },
            {
              path: '/components/select',
              name: 'select',
              component: () => import('./views/components/select')
            }
          ]
        },
        {
          path: '/plugins',
          name: 'plugins',
          component: () => import('./views/plugins/index'),
          meta: { keepAlive: true },
          children: [
            {
              path: '/plugins/confirm',
              name: 'confirm',
              component: () => import('./views/plugins/confirm')
            },
            {
              path: '/plugins/toast',
              name: 'toast',
              component: () => import('./views/plugins/toast')
            },
            {
              path: '/plugins/validate',
              name: 'validate',
              component: () => import('./views/plugins/validate')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login'),
      meta: { keepAlive: true }
    }
  ]
})
