import http from "@/utils/http"

// 获取-轮播图数据
export const getBannerAPI = () => http.get('/home/banner')