import Vue from 'vue'
import App from './App.vue'
import HXUI from './../packages'

Vue.config.productionTip = false
Vue.use(HXUI)
new Vue({
  render: h => h(App)
}).$mount('#app')
