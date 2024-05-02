// 管理用户相关数据的store
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginPAI } from '@/apis/user'
import { userCartStore } from './cartStore'

export const useUserStore = defineStore('user', () => {
    const cartStore = userCartStore()
    // 定义一个ref类型的变量userInfo，用于存储用户信息
    const userInfo = ref({})
    // 定义一个函数getUserInfo，用于获取用户信息
    const getUserInfo = async ({ account, password }) => {
        const res = await LoginPAI({ account, password })
        userInfo.value = res.result
    }

    // 退出时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        // 执行清除购物车的action
        cartStore.clearCart()
    }

    //  返回userInfo和getUserInfo
    return { userInfo, getUserInfo ,clearUserInfo}
  },{
    // 定义一个插件，用于持久化存储用户信息
    persist: true
  })