// 封装倒计时逻辑

import { ref, onUnmounted, computed } from "vue"
import dayjs from "dayjs"

export const useCountDown = () => {
  let timer = null
  // 1. 定义倒计时的初始值
  const time = ref(0)
  // 格式化时间 为xx分钟xx秒
  const fromatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"))
  // 2.开启倒计时的方法
  const startTime = (correntTime) => {
    // 开始倒计时的逻辑 1.每隔一秒减少一秒 2.当时间为0时停止倒计时
    time.value = correntTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  // 3.停止倒计时的方法
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    startTime,
    fromatTime,
  }
}

// 搭配 v-img-lazy=""  使用
