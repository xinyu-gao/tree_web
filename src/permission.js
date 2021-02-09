// import router from './router'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import { getToken } from '@/utils/auth'
// import Message from 'element-ui/packages/message/src/main'
// NProgress.configure({ showSpinner: false })
//
// router.beforeEach(async(to, from, next) => {
//   if (getToken()) { // token 还在生效中，正常使用
//     next({ path: to })
//   } else {
//     Message.warning('未登录或登录已过期')
//     if (to.path === '/login') { // 如果是登录页面路径，就直接next()
//       next()
//     } else { // 不然就跳转到登录
//       next('/login')
//     }
//   }
// })
