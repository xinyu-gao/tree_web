import Vue from 'vue'
import App from './App'

import store from './store'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // 全局 CSS
import '@/icons' // icon
import '@/permission' // permission control

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import _ from 'lodash'
Vue.prototype._ = _

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
