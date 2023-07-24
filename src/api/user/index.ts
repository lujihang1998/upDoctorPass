import request from "@/utils/request"
import { SubmitOrderResponseData, OrderInfoResponseData } from './types'

enum API {
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
  GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/'
}

export const postSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => {
  return request.post<any, SubmitOrderResponseData>(API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)
}

export const getOrderInfo = (id: string) => {
  return request.post<any, OrderInfoResponseData>(API.GETORDERINFO_URL + `${id}`)
}