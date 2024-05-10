// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由
import { useUserStore } from '@/stores/userStore'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Layout/Home/index.vue'
import Category from '@/views/Layout/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Layout/Detail/index.vue'
// 使用路由懒加载的形式减少首屏加载时间
const  CartList = () =>  import( '@/views/Layout/CartList/index.vue')
const  Checkout = () =>  import( '@/views/Layout/Checkout/index.vue')
const  Pay = () =>  import( '@/views/Layout/Pay/index.vue')
const  PayBack = () =>  import( '@/views/Layout/Pay/PayBack.vue')
const  Member = () =>  import( '@/views/Layout/Member/index.vue')
const  UserInfo = () =>  import( '@/views/Layout/Member/components/UserInfo.vue')
const  UserOrder = () =>  import( '@/views/Layout/Member/components/UserOrder.vue')
const  UserAddress = () =>  import( '@/views/Layout/Member/components/UserAddress.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'',
          component:Home
        },
        {
          path:'category/:id',
          component:Category
        },
        {
          path:'category/sub/:id',
          component:SubCategory
        },
        {
          path:'detail/:id',
          component:Detail
        },
        {
          path:'cartlist',
          component:CartList
        },
        // TODO:以下路由需要登录才能访问
        {
          path:'checkout',
          component:Checkout
        },
        {
          path:'pay',
          component:Pay
        },
        {
          path:'paycallback',
          component:PayBack
        },
        {
          path:'member',
          component:Member,
          children:[
            {
              path:'',
              component:UserInfo
            },
            {
              path:'order',
              component:UserOrder
            },
            {
              path:'address',
              component:UserAddress
            }
          ]
        }
      ]
    }, 
    {
      path: '/login',
      component: Login
    },
  ],
  // 路由跳转时，页面滚动到顶部
  scrollBehavior() {
    return { top: 0 }
  }
})
// 路由守卫----------------------判断是否有权限访问
router.beforeEach((to) => {
  // 如果没有token，且访问的是非登录页，拦截到登录，其他情况正常放行
  const userStore = useUserStore()
  const pathsToCheck = ['checkout', 'pay', 'paycallback', 'member', 'order', 'address']
  if (pathsToCheck.includes(to.path) && !userStore.userInfo.token && to.path !== '/login') return '/login'
})

export default router
