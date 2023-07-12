import { defineStore } from 'pinia'
import { getUserCode, postUserLogin } from '@/api/hospital'
import { getCodeResponseData, UserInfoResponseData, UserInfo, LoginData } from '@/api/hospital/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/user'
import { clear } from 'console'

const useUserStore = defineStore('User', {
  state: (): {
    visiable: boolean,
    code: string,
    userInfo: UserInfo
  } => {
    return {
      visiable: false,
      code: '',
      userInfo: JSON.parse(GET_TOKEN()) || {}
    }
  },
  actions: {
    async getCode(phone: string) {
      const data: getCodeResponseData = await getUserCode(phone)
      if (data.code === 200) {
        this.code = data.data || ''
        return 'success'
      } else {
        return Promise.reject(new Error(data.message))
      }
    },

    async userLogin(loginForm: LoginData) {
      const data: UserInfoResponseData = await postUserLogin(loginForm)
      if (data.code === 200) {
        this.userInfo = data.data
        SET_TOKEN(JSON.stringify(this.userInfo))
        return 'success'
      } else {
        return Promise.reject(new Error(data.message))
      }
    },

    logout() {
      this.userInfo = { name: '', token: ''  }
      REMOVE_TOKEN()
    },

    queryState() {
      let timer = setInterval(() => {
        if (GET_TOKEN()) {
          this.visiable = false
          this.userInfo = JSON.parse(GET_TOKEN())
          clearInterval(timer)
        }
      }, 500)
    }
  },
  getters: {}
})

export default useUserStore