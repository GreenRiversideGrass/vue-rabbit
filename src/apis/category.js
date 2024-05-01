import http from "@/utils/http"

// 获取二级分类列表
export const getCategoryAPI = (id) => http.get('/category',{
    params: {
        id
    }
})