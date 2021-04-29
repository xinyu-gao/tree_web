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
    redirect: '/mega_data',
    children: [{
      path: 'mega_data',
      name: 'Megadata',
      component: () => import('@/views/mega_data/index'),
      meta: { title: '数据展示', icon: 'dashboard' }
    }]
  },
  {
    path: '/tree_list',
    component: Layout,

    children: [{
      path: 'tree_list',
      name: 'table',
      component: () => import('@/views/tree_list/index'),
      meta: { title: '树木列表', icon: 'list' }
    }]
  },
  {
    path: '/tree_map',
    component: Layout,

    children: [{
      path: 'tree_map',
      name: 'map',
      component: () => import('@/views/tree_map/index'),
      meta: { title: '树木地图', icon: 'map' }
    }]
  },
  {
    path: '/detail_info',
    component: Layout,
    redirect: '/detail_info/charts',
    name: 'detail',
    meta: { title: '详细信息', icon: 'detail' },
    children: [
      {
        path: 'charts',
        name: 'charts',
        component: () => import('@/views/detail_info/charts/index'),
        meta: { title: '数据图表', icon: 'data' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/detail_info/list/index'),
        meta: { title: '数据清单', icon: 'detail' }
      }
    ]
  }

]
export const superManageRoutes = [
  {
    path: '/data',
    component: Layout,
    redirect: '/upload/data_manage/upload',
    name: 'data',
    meta: { title: '数据管理', icon: 'manage' },
    children: [
      {
        path: 'index',
        name: 'upload',
        component: () => import('@/views/data_manage/upload/index'),
        meta: { title: '数据上传', icon: 'upload' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/data_manage/imsi_manage/index'),
        meta: { title: '节点设置', icon: 'modify' }
      }
    ]
  },
  {
    path: '/user_manage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user_manage',
        component: () => import('@/views/user_manage/index'),
        meta: { title: '用户管理', icon: 'peoples' }
      }

    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/upload/user',
    name: 'settings',
    meta: { title: '设 置', icon: 'manage' },
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/settings/user/index'),
        meta: { title: '个人中心', icon: 'peoples' }
      }

    ]
  },
  // 404 必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

export const manageRoutes = [
  {
    path: '/data',
    component: Layout,
    redirect: '/upload/data_manage/upload',
    name: 'data',
    meta: { title: '数据管理', icon: 'manage' },
    children: [
      {
        path: 'index',
        name: 'upload',
        component: () => import('@/views/data_manage/upload/index'),
        meta: { title: '数据上传', icon: 'upload' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/data_manage/imsi_manage/index'),
        meta: { title: '节点设置', icon: 'modify' }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/upload/user',
    name: 'settings',
    meta: { title: '设 置', icon: 'manage' },
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/settings/user/index'),
        meta: { title: '个人中心', icon: 'peoples' }
      }

    ]
  },
  // 404 必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]
export const userRoutes = [
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
