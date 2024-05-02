// 管理用户相关数据的store
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginPAI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
    // 定义一个ref类型的变量userInfo，用于存储用户信息
    const userInfo = ref({})
    // 定义一个函数getUserInfo，用于获取用户信息
    const getUserInfo = async ({ account, password }) => {
        const res = await LoginPAI({ account, password })
        userInfo.value = res.result
    }
    //  返回userInfo和getUserInfo
    return { userInfo, getUserInfo }
  })