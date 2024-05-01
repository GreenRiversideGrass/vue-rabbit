import http from "@/utils/http"

// 获取商品详情
export const getDetail = (id) => http.get('/goods/',{params:{id}})