import request from "@/utils/request"
import { HosPitalDetailResponseData, DeparmentResponseData, getCodeResponseData, UserInfoResponseData, LoginData, WxLoginResponseData, HosPitalWorkDataResponseData, DoctorResponseData, UserResponseData, DoctorInfoResponseData } from './types'

enum API {
    HOSPITALDETAIL_URL = '/hosp/hospital/',
    HOSPITALDEPARMENT_URL = '/hosp/hospital/department/',
    GETUSERCODE_URL = '/sms/send/',
    USERLOGIN_URL = '/user/login',
    WXLOGIN_URL = '/user/weixin/getLoginParam/',
    HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
    HOSPITALDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
    GETUSER_URL = '/user/patient/auth/findAll',
    GETDOCTOR_URL = '/hosp/hospital/getSchedule/'
}

export const getHospitalDetail = (hoscode: string) => {
    return request.get<any, HosPitalDetailResponseData>(API.HOSPITALDETAIL_URL + hoscode)
}

export const getGHospitalDeparment = (hoscode: string) => {
    return request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode)
}

export const getUserCode = (phone: string) => {
    return request.get<any, getCodeResponseData>(API.GETUSERCODE_URL + phone)
}

export const postUserLogin = (data: LoginData) => {
    return request.post<any, UserInfoResponseData>(API.USERLOGIN_URL, data)
}

export const getWxLogin = (wxRedirectUri: string) => {
    return request.get<any, WxLoginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`)
}

export const getHospitalWork = (page: number, limit: number, hoscode: string, depcode: string) => {
    return request.get<any, HosPitalWorkDataResponseData>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`)
}

export const getHospitalDoctor = (hoscode: string, depcode: string, workDate: string) => {
    return request.get<any, DoctorResponseData>(API.HOSPITALDOCTOR_URL + `/${hoscode}/${depcode}/${workDate}`)
}

export const getUser = () => {
    return request.get<any, UserResponseData>(API.GETUSER_URL)
}

export const getDoctorInfo = (scheduleId: string) => {
    return request.get<any, DoctorInfoResponseData>(API.GETDOCTOR_URL + scheduleId)
}
