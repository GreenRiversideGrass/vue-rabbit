import http from "@/utils/http"

// 获取-轮播图数据banner
export const getBannerAPI = () => http.get('/home/banner')

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