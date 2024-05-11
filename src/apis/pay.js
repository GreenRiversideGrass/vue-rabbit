import http from "@/utils/http"

export const getOrderPAI = (id) => http.get(`/member/order/${id}`)
