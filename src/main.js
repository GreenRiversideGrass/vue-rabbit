// 引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useIntersectionObserver } from '@vueuse/core'

import App from './App.vue'
import router from './router'



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 定义全局指令
app.directive('img-lazy',{
    mounted(el,binding){
        // el:指令绑定的那个元素 img
        // binding: binding.value 指令等于号后面绑定的表达式的值 图片的地址url
        useIntersectionObserver(
            el,
            // isIntersecting 是否在可视区域内
            ([{ isIntersecting }]) => {
              console.log(isIntersecting)
              if(isIntersecting){
                // 加载图片
                el.src = binding.value
            }
            })
        }
})

