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
  "updateTime": string
  "isDeleted": number
  "param": {
    "orderStatusString": string
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

export interface PayInfo {
  "codeUrl": string
  "orderId": number
  "totalFee": number
  "resultCode": string
}

export interface PayInfoResponseData extends ResponseData {
  data: PayInfo
}

export interface PayStatusResponseData extends ResponseData {
  data: boolean
}

export interface UserInfo {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  params: {}
  openid: null
  nickName: null
  phone: string
  name: string
  certificatesNo: string
  certificatesType: string
  certificatesUrl: null
  authStatus: number
  status: number
}

export interface UserInfoResponseData extends ResponseData {
  data: UserInfo
}

export interface CertificatesType {
  createTime: string
  dictCode: ""
  hasChildren: boolean
  id: number
  isDeleted: number
  name: string
  param: {}
  parentId: number
  updateTime: string
  value: string
}

export interface CertificatesTypeResponseData extends ResponseData {
  data: CertificatesType[]
}

export interface UserParams {
  certificatesNo: string
  certificatesType: string
  certificatesUrl: string
  name: string
}

export interface UserParamsResponseData extends ResponseData {
  data: boolean
}

export interface Order {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param : {
    orderStatusString: string
  }
  userId: number
  outTradeNo: string
  hoscode: string
  hosname: string
  depcode: string
  depname: string
  scheduleId: null
  title: string
  reserveData: string
  reserveTime: number
  patientId: number
  patientName: string
  patientPhone: string
  hosRecordId: string
  number: number
  fetchTime: string
  fetchAddress: string
  amount: number
  quitTime: string
  orderStatus: number
}

export interface OrderResponseData extends ResponseData {
  data: {
    records: Order[]
    total: number
    size: number
    current: number
    orders: []
    hitCount: boolean
    searchCount: boolean
    pages: number
  }
}

export interface User {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param : {
    certificatesTypeString: string
    cityString: string
    contactsCertificatesTypeString: null
    districtString: string
    fullAddress: string
    provinceString: string
  },
  address: string
  birthdate: string
  cardNo: null
  certificatesNo: string
  certificatesType: string
  cityCode: string
  contactsCertificatesNo: string
  contactsCertificatesType: string
  contactsName: string
  contactsPhone: string
  districtCode: string
  isInsure: number
  isMarry: number
  name: string
  phone: string
  provinceCode: string
  sex: number
  status: string
  userId: number
}

export interface UserResponseData extends ResponseData {
  data: User[]
}

export interface OrderStatus {
  comment: string
  status: number
}

export interface OrderStatusResponseData extends ResponseData {
  data: OrderStatus[]
}