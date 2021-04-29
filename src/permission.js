import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/getPageTitle'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']
/**
 * 导航守卫：未登陆的用户跳转 login 页面，并根据 “用户角色” 生成 “动态菜单”
 */
router.beforeEach(async(to, from, next) => {
  // 进度条
  NProgress.start()
  // web 标题
  document.title = getPageTitle(to.meta.title)
  // 用户 token
  const hasToken = getToken()
  // 已登录
  if (hasToken) {
    // 目的网址为 /login
    if (to.path === '/login') {
      Message.info('您已登录')
      // 已登录，重定向到 home 页面
      next({ path: '/' })
    } else {
      next()
      // 拥有的角色列表
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 系统中存在角色列表，说明路由已经生成过了，不必再生成
        // 进行管道中的下一个钩子
        next()
      } else {
        // 系统中不存在角色列表，动态路由需要生成
        try {
          // 获取拥有的角色列表
          const roles = await store.dispatch('user/getRoles')
          // 根据角色生成可访问的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 动态添加路由
          router.addRoutes(accessRoutes)
          // 确保addRoutes()时动态添加的路由已经被完全加载上去。并且之后不能通过浏览器后退按钮，返回前一个路由
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          // 移除 token
          await store.dispatch('user/resetToken')
          // 显示报错信息
          Message.error(error || 'Has Error')
          // 返回登陆页面
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      Message.warning('未登录或登录已过期')
      next(`/login?redirect=${to.path}`)
    }
  }
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})
