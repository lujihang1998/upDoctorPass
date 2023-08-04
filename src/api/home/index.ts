import request from '@/utils/request'
import { HospitalResponseData, HospitalLevelAndRegionResponseData, HospitalInfoResponseData } from './types'

enum API {
    HOSPITAL_URL = '/hosp/hospital/',
    HOSPITALLEVElANDREGION_URL = '/cmn/dict/findByDictCode/',
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