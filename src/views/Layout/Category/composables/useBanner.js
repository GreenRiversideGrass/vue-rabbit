// 封装banner 轮播图相关的逻辑业务代码
import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home'

export function useBanner () {
    const bannerList = ref([])
    const getBanner = async () =>{
    const res = await getBannerAPI(
        {
        distributionSite: '2'
        }
    )
    bannerList.value = res.result
    }

    onMounted(() => {getBanner()})

    return {
        bannerList
    }
}