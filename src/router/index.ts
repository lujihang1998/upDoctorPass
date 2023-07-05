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
            meta: { title: 'home' }
        }, {
            path: '/hospital',
            name: 'hospital',
            component: () => import("@/pages/hospital/index.vue"),
            meta: { title: 'hospital' },
            children: [
                {
                    path: 'register',
                    component: () => import('@/pages/hospital/register/index.vue'),
                    meta: {
                        title: '预约挂号'
                    }
                },
                {
                    path: 'detail',
                    component: () => import('@/pages/hospital/detail/index.vue'),
                    meta: {
                        title: '医院详情'
                    }
                },
                {
                    path: 'notice',
                    component: () => import('@/pages/hospital/notice/index.vue'),
                    meta: {
                        title: '预约通知'
                    }
                },
                {
                    path: 'close',
                    component: () => import('@/pages/hospital/close/index.vue'),
                    meta: {
                        title: '停诊信息'
                    }
                },
                {
                    path: 'search',
                    component: () => import('@/pages/hospital/search/index.vue'),
                    meta: {
                        title: '查询'
                    }
                }
            ]
        }]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})


export default router