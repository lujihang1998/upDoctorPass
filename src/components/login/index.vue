<script setup lang="ts">
import { LoginData } from '@/api/hospital/types'
import useUserStore from '@/store/modules/user'
import type { FormInstance, FormRules } from 'element-plus/lib/components/index.js'

defineOptions({ name: 'Login' })

const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
const validatePhone = (_rule: any, value: any, callback: any) => {
   if (value.trim() === '') {
      callback(new Error('请输入手机号'))
   } else if (!reg.test(loginForm.phone)) {
      callback(new Error('请输入正确的手机号'))
   } else {
      callback()
   }
}
const userStore = useUserStore()
const scene = ref<number>(0) // 0 手机登录 1 微信登录
let flag = ref<boolean>(false)
let loginLoading = ref<boolean>(false)
const ruleFormRef = ref<FormInstance>()
const loginForm = reactive<LoginData>({
   phone: '',
   code: ''
})
const rules = reactive<FormRules<LoginData>>({
   phone: [{ validator: validatePhone, trigger: ['blur', 'change'] }],
   code: [{ required: true, message: '请输入验证码', trigger: ['blur', 'change'] }]
})
let isPhone = computed(() => {
   return reg.test(loginForm.phone)
})

const toggleLoginMethods = (sceneValue: number): void => {
   scene.value = sceneValue
}

const getCode = async (): Promise<any> => {
   flag.value = true
   try {
      await userStore.getCode(loginForm.phone)
      loginForm.code = userStore.code
   } catch (error) {
      ElMessage({ type: 'error', message: (error as Error).message })
   }
}

const login = async (formEl: FormInstance | undefined) => {
   if (!formEl) return
   await formEl.validate()
   loginLoading.value = true
   try {
      await userStore.userLogin(loginForm)
      loginLoading.value = false
      userStore.visiable = false
   } catch (error) {
      loginLoading.value = false
      ElMessage({ type: 'error', message: (error as Error).message })
   }
}

const close = (): void => {
   Object.assign(loginForm, { phone: '', code: '' })
   ruleFormRef.value?.resetFields()
}

const closeDialog = (): void => {
   userStore.visiable = false
}
</script>

<template>
   <el-dialog v-model="userStore.visiable" title="用户登录" @close="close">
      <div class="login_container">
         <el-row>
            <el-col :span="12">
               <div class="logint">
                  <div v-show="scene === 0">
                     <el-form ref="ruleFormRef" :model="loginForm" :rules="rules">
                        <el-form-item prop="phone">
                           <el-input v-model="loginForm.phone" placeholder="请输入手机号" clearable>
                              <template #prefix>
                                 <i class="i-ep:user"></i>
                              </template>
                           </el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                           <el-input v-model="loginForm.code" placeholder="请输入验证码">
                              <template #prefix>
                                 <i class="i-ep:lock"></i>
                              </template>
                           </el-input>
                        </el-form-item>
                        <el-form-item>
                           <el-button :disabled="!isPhone || flag">
                              <CountDown v-model:flag="flag" :contorlCondition="(isPhone && !flag)"
                                 @defaultClick="getCode" />
                           </el-button>
                        </el-form-item>
                     </el-form>
                     <div class="logint-bottom">
                        <el-button @click="login(ruleFormRef)" :loading="loginLoading"
                           :disabled="!isPhone || loginForm.code.length < 6" class="logint-bottom-login"
                           type="primary">用户登录</el-button>
                        <div @click="toggleLoginMethods(1)" class="cursor-pointer mt-25px">
                           <p class="wechat-login-message my-2">微信扫码登录</p>
                           <svg t="1688978272108" class="icon" viewBox="0 0 1024 1024" version="1.1"
                              xmlns="http://www.w3.org/2000/svg" p-id="2424" width="32" height="32">
                              <path
                                 d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                 fill="#28C445" p-id="2425"></path>
                              <path
                                 d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                 fill="#28C445" p-id="2426"></path>
                           </svg>
                        </div>
                     </div>
                  </div>
                  <div v-show="scene === 1">
                     <div class="logint-bottom">
                        <div @click="toggleLoginMethods(0)" class="cursor-pointer mt-25px">
                           <p class="wechat-login-message my-2">手机验证码登录</p>
                           <svg t="1689062119126" class="icon" viewBox="0 0 1024 1024" version="1.1"
                              xmlns="http://www.w3.org/2000/svg" p-id="7823" width="32" height="32">
                              <path
                                 d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                                 fill="#d81e06" p-id="7824"></path>
                           </svg>
                        </div>
                     </div>
                  </div>
               </div>
            </el-col>
            <el-col :span="12">
               <div class="scanContent">
                  <div class="scan">
                     <div class="scan-item">
                        <img class="w-[130px] h-[130px]" src="@/assets/images/code_app.png" alt="">
                        <svg t="1688979245778" class="icon" viewBox="0 0 1024 1024" version="1.1"
                           xmlns="http://www.w3.org/2000/svg" p-id="5667" width="16" height="16">
                           <path
                              d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                              fill="#cdcdcd" p-id="5668"></path>
                           <path
                              d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                              fill="#cdcdcd" p-id="5669"></path>
                        </svg>
                        <p>微信扫一扫关注</p>
                        <p>"快速预约挂号"</p>
                     </div>
                     <div class="scan-item">
                        <img class="w-[130px] h-[130px]" src="@/assets/images/code_login_wechat.png" alt="">
                        <svg t="1688978886079" class="icon" viewBox="0 0 1024 1024" version="1.1"
                           xmlns="http://www.w3.org/2000/svg" p-id="4398" id="mx_n_1688978886079" width="16" height="16">
                           <path
                              d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                              fill="#000000" p-id="4399"></path>
                        </svg>
                        <p>扫一扫下载</p>
                        <p>"预约挂号"APP</p>
                     </div>
                  </div>
                  <p class="tip">尚医通官方指定平台</p>
                  <p class="tip">快速挂号 安全放心</p>
               </div>
            </el-col>
         </el-row>
      </div>
      <template #footer>
         <el-button @click="closeDialog" type="primary">关闭窗口</el-button>
      </template>
   </el-dialog>
</template>

<style scoped lang="scss">
.logint {
   padding: 20px;
   border: 1px solid #ccc;

   .logint-bottom {
      text-align: center;

      .logint-bottom-login {
         width: 90%;
      }
   }
}

.scanContent {
   .scan {
      display: flex;
      justify-content: space-around;

      .scan-item {
         display: flex;
         flex-direction: column;
         align-items: center;
         text-align: center;

         p {
            margin: 5px 0;
         }
      }
   }

   .tip {
      font-size: 20px;
      font-style: italic;
      text-align: center;
      margin: 20px 0;
   }
}
</style>
