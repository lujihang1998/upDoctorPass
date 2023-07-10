import { defineStore } from 'pinia'
import { getHospitalDetail, getGHospitalDeparment } from '@/api/hospital/index'
import type { HosPitalDetailResponseData, HosPitalDetail, DeparmentREsponseData, Deparment } from '@/api/hospital/types'

const useDetailStore = defineStore('Detail', {
    state: (): {
        hospitalInfo: HosPitalDetail,
        deparmentArr: Deparment[]
    } => {
        return {
            hospitalInfo: {} as HosPitalDetail,
            deparmentArr: []
        }
    },

    actions: {
        async getHosDetail(hoscode: string) {
            const { data, code = 200 }: HosPitalDetailResponseData = await getHospitalDetail(hoscode)
            if (code === 200) {
                this.hospitalInfo = data
            }
        },

        async getDeparment(hoscode: string) {
            const { data, code = 200 }: DeparmentREsponseData = await getGHospitalDeparment(hoscode)
            if (code === 200) {
                this.deparmentArr = data
            }
        }
    },

    getters: {

    }
})

export default useDetailStore