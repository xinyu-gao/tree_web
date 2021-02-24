import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/table',
    component: Layout,

    children: [{
      path: 'index',
      name: 'table',
      component: () => import('@/views/table/index'),
      meta: { title: '树木列表', icon: 'list' }
    }]
  },
  {
    path: '/map',
    component: Layout,

    children: [{
      path: 'index',
      name: 'map',
      component: () => import('@/views/map/index'),
      meta: { title: '树木地图', icon: 'map' }
    }]
  },
  {
    path: '/detail',
    component: Layout,
    redirect: '/data/index',
    name: 'detail',
    meta: { title: '详细信息', icon: 'detail' },
    children: [
      {
        path: 'data',
        name: 'data',
        component: () => import('@/views/data/index'),
        meta: { title: '数据图标', icon: 'data' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/detail/index'),
        meta: { title: '数据清单', icon: 'detail' }
      }
    ]
  },
  {
    path: '/detail',
    component: Layout,

    children: []
  }

]
export const asyncRoutes = [
  {
    path: '/upload',
    component: Layout,
    children: [{
      path: 'index',
      name: 'upload',
      component: () => import('@/views/upload/index'),
      meta: { title: '数据上传', icon: 'upload' }
    }]
  },
  // 404 必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
