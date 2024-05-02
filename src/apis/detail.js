import http from "@/utils/http"

// 获取商品详情
export const getDetail = (id) => http.get('/goods/',{params:{id}})


// 获取商品热榜
export const getHotGoodsAPI = ({ id,type,limit = 3 }) => http.get('/goods/hot',{
    params:{
        id,
        type,
        limit
    }
})