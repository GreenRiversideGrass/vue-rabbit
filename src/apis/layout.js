import http from "@/utils/http"

// 获取-全部分类(包含推荐商品)
export const getCategoryAPI = () => http.get('/home/category/head')