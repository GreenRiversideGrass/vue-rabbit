import http from "@/utils/http"

// 获取二级分类列表
export const getCategoryAPI = (id) => http.get('/category',{
    params: {
        id
    }
})

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */
export const getCategoryFilterAPI = (id) => http.get('/category/sub/filter',{params: {id}})