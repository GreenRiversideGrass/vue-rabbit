// axios基础封装
import axios from "axios"
import { ElMessage } from "element-plus"
import { useUserStore } from "@/stores/userStore"
import router from "@/router"

const http = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
})

// axios请求拦截器
http.interceptors.request.use(
  (config) => {
    // 1. 从pinia中获取token
    const userStore = useUserStore()
    // 2.按照后端要求拼接token数据
    const token = userStore.userInfo.token
    if (token) {
      // 3.将token放到请求头中
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e),
)

// axios响应式拦截器
http.interceptors.response.use(
  (res) => res.data,
  (e) => {
    // 统一错误处理
    ElMessage.error(e.response.data.msg)
    // 401token失效处理
    // 1.清除本地用户数据
    // 2.跳转到登录页
    const userStore = useUserStore()
    if (e.response.status === 401) {
      userStore.clearUserInfo()
      router.push("/login")
    }
    return Promise.reject(e)
  },
)

export default http
