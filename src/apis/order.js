import http from "@/utils/http"

/*
获取订单列表
params: {
    orderState:0,
  page:1,
  pageSize:2
}
*/
export const getUserOrder = (params) => http.get("/member/order", { params })
