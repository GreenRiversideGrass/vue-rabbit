// 封装购物车模块

import { defineStore } from 'pinia'
import { ref ,computed} from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI , findNewCartListAPI,deleteCartAPI } from '@/apis/cart'

export const userCartStore = defineStore('cart',() => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1.定义state - cartList
    const cartList = ref([])
    // 获取最新购物车列表
    const updateNewList = async () =>{
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    // 2.定义cation - addCart
    const addCart = async (goods) => {
        const { skuId , count} = goods
        if(isLogin.value){
            // 登录后才能获取购物车列表
            await insertCartAPI({ skuId , count})
            // 通过接口获取购物车列表
            updateNewList()
        }else{
            // 添加购物车操作
            // 已添加过 - 直接count + 1
            // 没有添加过 - 直接push
            // 思路：通过匹配传递过来的商品对象中的skuId，判断是否已经添加过
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if(!item){
                // 没有添加过
                cartList.value.push(goods)
            }else{
                // 已经添加过
                item.count += 1
            }
        }

    }

    // 删除购物车列表
    const delCart = async (skuId) => {
        if(isLogin.value){
            // 调用接口删除
            await deleteCartAPI([skuId])
            // 通过接口获取最新购物车列表
            updateNewList()
        }else{
        // 思路：
        // 1.找到要删除项的下标值 - splice
        // 2.使用数据的过滤方法 - filter
        const Index =  cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(Index, 1)
        }

    }

    // 清除本地购物车
    const clearCart = () => {
        cartList.value = []
    }


    // 单选功能
    const singleSelect = (skuId, selected) => {
        // 通过skuIdZH找到对应的商品对象 - 修改selected属性
        const item = cartList.value.find((item) => item.skuId === skuId )
        item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
        cartList.value.forEach((item) => item.selected = selected)
    }

    // 计算属性
    // 1.总数量  所有项的count之和
    // reduce - 累加器
    const allCount = computed(()=> cartList.value.reduce((sum,item) => sum+item.count ,0))
    // 2.总价 所有项的count * price
    const allPrice = computed(()=> cartList.value.reduce((sum,item) => sum+item.count * item.price ,0))

    // 3.已选中的数量
    const selectedCount = computed(() => cartList.value.filter((item) => item.selected)
    .reduce((sum,item) => sum+item.count ,0))
    // 4.已选中的总价
    const selectedPrice = computed(() => cartList.value.filter((item) => item.selected)
    .reduce((sum,item) => sum+item.count * item.price ,0))
    // 是否全选
    const isALL = computed(() => cartList.value.every((item) => item.selected))

    // return cartList - addCart ...
    return { 
        cartList, 
        addCart,
        delCart,
        allCount,
        allPrice,
        singleSelect,
        isALL,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart
    }
},{
    persist:true
})