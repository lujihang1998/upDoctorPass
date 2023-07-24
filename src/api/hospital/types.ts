export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 代表医院详情的数据
export interface HosPitalDetail {
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
    },
    "hospital": {
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
            "hostypeString": string,
            "fullAddress": string
        },
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "logoData": string,
        "intro": null,
        "route": string,
        "status": number,
        "bookingRule": null
    }
}

export interface HosPitalDetailResponseData extends ResponseData {
    data: HosPitalDetail
}

export interface Deparment {
    "depcode": string
    "depname": string
    "children"?: Deparment[]
}

export interface DeparmentResponseData extends ResponseData {
    data: Deparment[]
}

export interface getCodeResponseData extends ResponseData {
    data: string
}

export interface LoginData {
    phone: string
    code: string
}

export interface UserInfo {
    name: string
    token: string
}

export interface UserInfoResponseData extends ResponseData {
    data: UserInfo
}

export interface WxLogin {
    redirectUri: string
    appid: string
    scope: string
    state: string
}

export interface WxLoginResponseData extends ResponseData {
    data: WxLogin
}

export interface BaseMap {
    "workDateString": string
    "releaseTime": string
    "bigname": string
    "stopTime": string
    "depname": string
    "hosname": string
}

export interface WorkData {
    "workDate": string
    "workDateMd": string
    "dayOfWeek": string
    "docCount": number
    "reservedNumber": null
    "availableNumber": number
    "status": number
}

export interface HosPitalWorkData {
    total: number,
    bookingScheduleList: WorkData[],
    baseMap: BaseMap
}

export interface HosPitalWorkDataResponseData extends ResponseData {
    data: HosPitalWorkData
}

export interface Doctor {
    "id": string
    "createTime": string
    "updateTime": string
    "isDeleted": number
    "param": {
        "dayOfWeek": string
        "depname": string
        "hosname": string
    }
    "hoscode": string
    "depcode": string
    "title": string
    "docname": string
    "skill": string
    "workDate": string
    "workTime": number
    "reservedNumber": number
    "availableNumber": number
    "amount": number
    "status": number
    "hosScheduleId": string
}

export interface DoctorResponseData extends ResponseData {
    data: Doctor[]
}

export interface User {
    "id": number
    "createTime": string
    "updateTime": string
    "isDeleted": number
    "param": {
        "certificatesTypeString": string
        "contactsCertificatesTypeString": string
        "cityString": null
        "fullAddress": string
        "districtString": null
        "provinceString": null
    }
    "userId": number
    "name": number
    "certificatesType": string
    "certificatesNo": string
    "sex": number
    "birthdate": string
    "phone": string
    "isMarry": number
    "provinceCode": null
    "address": string
    "contactsName": string
    "contactsCertificatesType": string
    "contactsCertificatesNo": string
    "contactsPhone": string
    "isInsure": number
    "cardNo": null
    "status": string
}

export interface UserResponseData extends ResponseData  {
    data: User[]
}

export interface DoctorInfoResponseData extends ResponseData {
    data: Doctor
}