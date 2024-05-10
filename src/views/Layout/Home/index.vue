<script setup>
import HomeCategory from './componets/HomeCategory.vue'
import HomeBanner from './componets/HomeBanner.vue'
import HomeNew from './componets/HomeNew.vue'
import HomeHot from './componets/HomeHot.vue'
import HomeProduct from './componets/HomeProduct.vue'
// import HomePanel from './componets/HomePanel.vue'
</script>
<template>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <homeProduct />
    <!-- 测试面板组件 -->
    <!-- <HomePanel title="新鲜好物" subTitle="新鲜好物 好多商品">

    </HomePanel> -->
    <!-- <HomePanel title="人气推荐" subTitle="人气推荐 好多商品">

    </HomePanel> -->
  </template>