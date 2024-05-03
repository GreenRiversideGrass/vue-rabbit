// 封装购物车相关接口
import http from "@/utils/http"

// 加入购物车
export const insertCartAPI = ({skuId,count}) => http.post('/member/cart',{skuId,count})

// 获取购物车列表
export const findNewCartListAPI = () => http.get('/member/cart')

// 删除购物车
export const deleteCartAPI = (ids) => http.delete('/member/cart',{data:{ids}})

// 合并购物车
export const mergeCartAPI = (data) => http.post('/member/cart/merge',data)