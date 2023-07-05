import request from '@/utils/request'
import { HospitalResponseData, HospitalLevelAndRegionResponseData, HospitalInfoResponseData } from './types'

//通过枚举管理首页模块的接口地址
enum API {
    //获取已有的医院的数据接口地址
    HOSPITAL_URL = '/hosp/hospital/',
    //获取医院的等级与地区接口
    HOSPITALLEVElANDREGION_URL = '/cmn/dict/findByDictCode/',
    //根据关键字医院的名字获取数据
    HOSPITALINFO_URL = '/hosp/hospital/findByHosname/'
}

export const getHospitalList = (page: number, limit: number, params: { hostype: string, districtCode: string }) => {
    return request.get<any, HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}`, { params })
}

export const getHospitLelAndGeo = (dictCode: string) => {
    return request.get<any, HospitalLevelAndRegionResponseData>(API.HOSPITALLEVElANDREGION_URL + dictCode)
}

export const getHospitalInfo = (hosname: string) => {
    return request.get<any, HospitalInfoResponseData>(API.HOSPITALINFO_URL + hosname)
}