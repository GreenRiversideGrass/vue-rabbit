import http from "@/utils/http"

// 获取-轮播图数据banner

export const getBannerAPI = (params = {}) => {
      // 默认为1 商品为2
  const { distributionSite = '1' } = params
    return http.get('/home/banner',{
        params:{
            distributionSite
        }
    })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const getNewGoodsAPI = () => http.get('/home/new')

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotGoodsAPI = () => http.get('/home/hot')

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => http.get('/home/goods')