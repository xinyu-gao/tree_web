import Vue from 'vue'
import App from './App'

import store from './store'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/icons'
import '@/permission'

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
