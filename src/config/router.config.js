/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/layouts/App'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: { title: '首页', keepAlive: false }
      }
    ]
  }
]
