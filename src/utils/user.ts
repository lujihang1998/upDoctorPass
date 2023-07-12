const userInfoName = 'USERINFO'

export const SET_TOKEN = (userInfo: string) => {
  localStorage.setItem(userInfoName, userInfo)
}

export const GET_TOKEN = (): string => {
  return localStorage.getItem(userInfoName) as string
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem(userInfoName)
}