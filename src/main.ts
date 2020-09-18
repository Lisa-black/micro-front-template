import Vue, { DirectiveOptions } from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

// import Antd from 'ant-design-vue'
import App from '@/App.vue'
import store from '@/store'
import VueRouter from 'vue-router'
import { AppModule } from '@/store/modules/app'
import routes from '@/routes'
import i18n from '@/lang'
// import '@/icons/components'
import '@/permission'
import '@/utils/error-log'
import * as directives from '@/directives'
import * as filters from '@/filters'

import startQiankun from '@/qiankun'
// import './assets/styles/locale.antd.css'
// import '@/utils/router.ts'

// Vue.use(Antd)
Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: AppModule.size, // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
})

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string ]: Function })[key])
})

startQiankun()

/**
 * 注册路由实例
 * 即将开始监听 location 变化，触发路由规则
 */
const router = new VueRouter({
  mode: 'history',
  routes: routes.options.routes
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#master-app')
