import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'

import startQiankun from './qiankun'
import './assets/styles/locale.antd.css'

Vue.use(Antd)
Vue.config.productionTip = false

startQiankun()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
