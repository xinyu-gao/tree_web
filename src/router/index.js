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
  }

  // {
  //   path: '/realtimedata',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/realtimedata/index'),
  //       name: 'Realtime',
  //       meta: { title: '实时数据', icon: 'table', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/map',
  //   component: Layout,
  //   redirect: 'index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/map/index'),
  //       name: 'Map',
  //       meta: { title: '地图显示', icon: 'map', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/settings',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/settings/index'),
  //       name: 'Setting',
  //       meta: { title: '节点设置', icon: 'setting' }
  //     }
  //   ]
  // },
  // {
  //   path: '/usermanage',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/usermanage/index'),
  //       name: 'Manager',
  //       meta: { title: '用户管理', icon: 'peoples' }
  //     }
  //   ]
  // },
  // {
  //   path: '/register',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/register/index'),
  //       name: 'Register',
  //       meta: { title: '用户注册', icon: 'register' }
  //     }
  //   ]
  // },

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
