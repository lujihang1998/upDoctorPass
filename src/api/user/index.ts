import request from "@/utils/request"
import { SubmitOrderResponseData, OrderInfoResponseData, PayInfoResponseData, PayStatusResponseData, UserInfoResponseData, CertificatesTypeResponseData, UserParams, OrderResponseData, UserResponseData, OrderStatusResponseData } from './types'

enum API {
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
  GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
  ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
  QRCODE_URL = '/order/weixin/createNative/',
  PAYRESULT_URL = '/order/weixin/queryPayStatus/',
  USERINFO_URL = '/user/auth/getUserInfo',
  CERTIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/',
  USERCERTATION_URL = '/user/auth/userAuah',
  USERALLORDER_URL = '/order/orderInfo/auth/',
  ALLUSER_URL = '/user/patient/auth/findAll',
  ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList'
}

export const postSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => {
  return request.post<any, SubmitOrderResponseData>(API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)
}

export const getOrderInfo = (id: string) => request.get<any, OrderInfoResponseData>(API.GETORDERINFO_URL + id)

export const getCancelOrder = (id: string) => request.get<any, any>(API.ORDERCANCEL_URL + id)

export const getQrcode = (orderId: string) => request.get<any, PayInfoResponseData>(API.QRCODE_URL + orderId)

export const getQueryPayStatus = (orderId: string) => request.get<any, PayStatusResponseData>(API.PAYRESULT_URL + orderId)

export const getUserInfo = () => request.get<any, UserInfoResponseData>(API.USERINFO_URL)

export const getCertificationType = (dictCode: string = 'CertificatesType') => request.get<any, CertificatesTypeResponseData>(API.CERTIFICATIONTYPE_URL + dictCode)

export const getUserCertation = (data: UserParams) => request.post<any, any>(API.USERCERTATION_URL, data)

export const getUserAllOrder = (page: number, limit: number, patientId: string, orderStatus: string) => request.get<any, OrderResponseData>(API.USERALLORDER_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)

export const getAllUser = () => request.get<any, UserResponseData>(API.ALLUSER_URL)

export const getOrderStatus = () => request.get<any, OrderStatusResponseData>(API.ORDERSTATE_URL)