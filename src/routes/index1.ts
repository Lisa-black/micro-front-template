import Home from '@/views/Home.vue'
import Login from '@/views/login/index.vue'

/**
 * path: 路径为 / 时触发该路由规则
 * name: 路由的 name 为 Home
 * component: 触发路由时加载 `Home` 组件
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
]

export default routes
