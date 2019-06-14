import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/github.css'
import HXUI from './hxui/plugins/index'
import HxHeader from './hxui/cpts/HxHeader'
import combineFilters from './tools/combineFilters'
const Vue = window.Vue
Vue.config.productionTip = false
Vue.prototype.$hxui = HXUI
Vue.component('hx-header', HxHeader)
Vue.use(VueHighlightJS)
combineFilters(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
