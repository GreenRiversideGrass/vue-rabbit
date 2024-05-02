// axios基础封装
import axios from "axios"
import { ElMessage } from 'element-plus'

const http = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

// axios请求拦截器
http.interceptors.request.use(config => {
    return config
  }, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  // 统一错误处理
  ElMessage.error(e.response.data.message)
    return Promise.reject(e)
  })

export default http