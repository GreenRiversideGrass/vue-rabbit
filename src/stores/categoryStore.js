import { defineStore } from "pinia"
import { getCategoryAPI } from "@/apis/layout"
import { ref } from "vue"
export const useCategoryStore = defineStore("category", () => {
  // 导航列表的逻辑
  // state 导航列表数据
  const categoryLsit = ref([])

  // action 获取导航数据的方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryLsit.value = res.result
  }
  return {
    categoryLsit,
    getCategory,
  }
})
