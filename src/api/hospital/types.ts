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