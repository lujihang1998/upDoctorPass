import { createApp } from 'vue'
import router from '@/router/index'
import pinia from '@/store/index'
import App from '@/App.vue'

import '@/style/reset.scss'
import 'virtual:uno.css'
import 'element-plus/dist/index.css'
// @ts-ignore
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 国际化文件


createApp(App).use(router).use(pinia).mount('#app')
