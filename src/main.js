// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router.js'
import store from './store'
import HXUI from './hxui/plugins/index'
import HxHeader from './hxui/cpts/HxHeader'

Vue.config.productionTip = false
Vue.prototype.$hxui = HXUI
Vue.component('hx-header', HxHeader)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
