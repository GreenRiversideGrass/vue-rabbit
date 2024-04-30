<script setup>
import HomeCategory from './componets/HomeCategory.vue'
import HomeBanner from './componets/HomeBanner.vue'
import HomeNew from './componets/HomeNew.vue'
import HomeHot from './componets/HomeHot.vue'
import HomeProduct from './componets/HomeProduct.vue'
</script>
<template>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <homeProduct />
  </template>