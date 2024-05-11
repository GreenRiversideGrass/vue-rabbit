// 把 components 中的组件都进行全局化注册
// 通过插件的方式
import ImageView from "./ImageView/index.vue"
import Sku from "./XtxSku/index.vue"

export const componentsPlugin = {
  install(app) {
    // 全局注册组件 app.component('组件名', 组件)
    app.component("XtxImageView", ImageView)
    app.component("XtxSku", Sku)
  },
}
