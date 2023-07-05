import { defineStore } from 'pinia'
import { getHospitalDetail } from '@/api/hospital/index'
import type { HosPitalDetailResponseData, HosPitalDetail } from '@/api/hospital/types'

const useDetailStore = defineStore('Detail', {
    state: () => {
        return {
            hospitalInfo: {} as HosPitalDetail
        }
    },

    actions: {
        async getHosDetail(hoscode: string) {
            const { data, code = 200 }: HosPitalDetailResponseData = await getHospitalDetail(hoscode)
            if (code === 200) {
                this.hospitalInfo = data
            }
        }
    },

    getters: {

    }
})

export default useDetailStore