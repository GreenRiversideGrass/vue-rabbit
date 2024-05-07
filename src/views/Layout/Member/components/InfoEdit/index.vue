<script setup >
import { getLikeListAPI } from "@/apis/user"
import { ref ,onMounted} from "vue"
import GoodsItem from "@/views/Layout/Home/componets/Goodsitem.vue"

const likeList = ref([])
const getLikeList = async () => {
  const res = await getLikeListAPI({limit: 4})
  likeList.value = res.result
}

onMounted(() => {
  getLikeList()
})

</script>
<template>
    <div class="home-panel" ref="onEdist" >
      <div class="header">
        <h4 data-v-bcb266e0="">猜你喜欢</h4>
      </div>
      <div class="goods-list">
        <GoodsItem v-for="good in likeList" :key="good.id" :good="good" />
      </div>
    </div>
</template>

<style scoped lang="scss">

.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;

  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h4 {
      font-size: 22px;
      font-weight: 400;
    }

  }

  .goods-list {
    display: flex;
    justify-content: space-around;
  }
}



</style>