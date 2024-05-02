// 引入初始化样式文件
import '@/styles/common.scss'

// 引用懒加载插件指令并且注册
import { lazyPlugin } from '@/directives'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 引入全局组件插件
import { componentsPlugin } from '@/components'


import App from './App.vue'
import router from './router'



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentsPlugin)
app.mount('#app')



