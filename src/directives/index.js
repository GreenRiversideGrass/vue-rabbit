import { useIntersectionObserver } from '@vueuse/core'

// 定义懒加载插件
export const lazyPlugin = {
    install(app) {
        //  定义全局指令 懒加载指令逻辑
        app.directive('img-lazy',{
            mounted(el,binding){
                // el:指令绑定的那个元素 img
                // binding: binding.value 指令等于号后面绑定的表达式的值 图片的地址url
              const { stop } = useIntersectionObserver(
                    el,
                    // isIntersecting 是否在可视区域内
                    ([{ isIntersecting }]) => {
                      console.log(isIntersecting)
                      if(isIntersecting){
                        // 加载图片
                        el.src = binding.value
                        stop()
                    }
                    })
                }
        })
        
    }
}