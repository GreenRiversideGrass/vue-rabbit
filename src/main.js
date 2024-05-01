// 引入初始化样式文件
import '@/styles/common.scss'

// 引用懒加载插件指令并且注册
import { lazyPlugin } from '@/directives'

import { createApp } from 'vue'
import { createPinia } from 'pinia'




import App from './App.vue'
import router from './router'



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')



