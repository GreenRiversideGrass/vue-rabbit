import http from "@/utils/http"

// 获取详情接口
export const getCheckInfoAPI = () => http.get('/member/order/pre')

// 创建订单
export const createOrderAPI = (data) => http.post('/member/order', data)

// 获取-收获地址
export const getAddressAPI = () => http.get('/member/address')

// 添加地址
export const addAddressAPI = (data) => http.post('/member/address', data)

// 删除地址
export const delAddressAPI = (id) => http.delete(`/member/address/${id}`)