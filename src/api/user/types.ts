export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

export interface SubmitOrderResponseData extends ResponseData {
  data: number
}

export interface OrderInfo {
  "id": number
  "createTime": string
  "updateTime":string
  "isDeleted": number
  "param": {
    "orderstatusstringl": string
  }
  "userId": number
  "outTradeNo": string
  "hoscode": string
  "hosname": string
  "depcode": string
  "depname": string
  "scheduleId": string
  "title": string
  "reserveDate": string
  "reserveTime": number
  "patientId": number
  "patientName": string
  "patientPhone": string
  "hosRecordId": string
  "number": number
  "fetchTime": string
  "fetchAddress": string
  "amount": number
  "quitTime": string
  "orderStatus": number
}

export interface OrderInfoResponseData extends ResponseData {
  data: OrderInfo
}