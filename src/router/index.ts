import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    alias: '',
    name: 'layout',
    component: () => import("@/layout/index.vue"),
    meta: { title: 'layout' },
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import("@/pages/home/index.vue"),
      meta: { title: '首页' }
    }, {
      path: '/hospital',
      name: 'hospital',
      component: () => import("@/pages/hospital/index.vue"),
      meta: { title: 'hospital' },
      children: [
        {
          path: 'register',
          component: () => import('@/pages/hospital/register/index.vue'),
          meta: { title: '预约挂号' }
        },
        {
          path: 'detail',
          component: () => import('@/pages/hospital/detail/index.vue'),
          meta: { title: '医院详情' }
        },
        {
          path: 'notice',
          component: () => import('@/pages/hospital/notice/index.vue'),
          meta: { title: '预约通知' }
        },
        {
          path: 'close',
          component: () => import('@/pages/hospital/close/index.vue'),
          meta: { title: '停诊信息' }
        },
        {
          path: 'search',
          component: () => import('@/pages/hospital/search/index.vue'),
          meta: { title: '查询' }
        },
        {
          path: 'register_step1',
          component: () => import('@/pages/hospital/register/register_step1.vue'),
          meta: { title: '预约详情' }
        },
        {
          path: 'register_step2',
          component: () => import('@/pages/hospital/register/register_step2.vue'),
          meta: { title: '确认挂号信息' }
        }
      ]
    }, {
      path: '/wxlogin',
      name: 'wxlogin',
      component: () => import("@/pages/wxlogin/index.vue"),
      meta: { title: '登录' }
    }, {
      path: '/user',
      name: 'user',
      component: () => import("@/pages/user/index.vue"),
      meta: { title: '会员中心' },
      children: [
        {
          path: 'certification',
          name: 'certification',
          component: () => import('@/pages/user/certification/index.vue'),
          meta: { title: '实名认证' }
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('@/pages/user/order/index.vue'),
          meta: { title: '挂号订单' }
        },
        {
          path: 'patient',
          name: 'patient',
          component: () => import('@/pages/user/patient/index.vue'),
          meta: { title: '就诊人管理' }
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/pages/user/profile/index.vue'),
          meta: { title: '账号信息' }
        },
        {
          path: 'feedback',
          name: 'feedback',
          component: () => import('@/pages/user/feedback/index.vue'),
          meta: { title: '意见反馈' }
        }
      ]
    }]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})


export default router