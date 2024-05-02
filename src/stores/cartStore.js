// 封装购物车模块

import { defineStore } from 'pinia'
import { ref ,computed} from 'vue'

export const userCartStore = defineStore('cart',() => {
    // 1.定义state - cartList
    const cartList = ref([])
    // 2.定义cation - addCart
    const addCart = (goods) => {
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

    // 删除购物车列表
    const delCart = (skuId) => {
        // 思路：
        // 1.找到要删除项的下标值 - splice
        // 2.使用数据的过滤方法 - filter
       const Index =  cartList.value.findIndex((item) => skuId === item.skuId)
       cartList.value.splice(Index, 1)
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
        allCheck
    }
},{
    persist:true
})