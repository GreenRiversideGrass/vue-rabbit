// 封装所有和用户相关的接口函数
import http from "@/utils/http"

// 登录
export const LoginPAI = ({account,password}) => http.post('/login',{
    account,
    password
})