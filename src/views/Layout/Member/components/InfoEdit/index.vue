<script setup >
import { getLikeListAPI } from "@/apis/user"
import { ref ,onMounted} from "vue"
import GoodsItem from "@/views/Layout/Home/componets/Goodsitem.vue"
import { useCheckoutIndex } from '@/views/Layout/Checkout/composables/CheckoutIndex.js'

const checkindex = useCheckoutIndex()
const checkInfo = checkindex.checkInfo

checkindex.getCheckInfo()

console.log(checkInfo);

const likeList = ref([])
const getLikeList = async () => {
  const res = await getLikeListAPI({limit: 4})
  likeList.value = res.result
}

onMounted(() => {
  getLikeList()
})

// 通过ref暴露给父组件的方法
const onEdist = ref(true)

const edist = ref()
const onAddress = () => {
  // 将edist的值取反
  onEdist.value = !onEdist.value
  // 将edist的值赋给edist
  edist.value = onEdist.value
}

defineExpose({
  onAddress
})


</script>
<template>
    <div class="home-panel" ref="onEdist" v-if="edist !== '' && edist ? false : true" >
      <div class="header">
        <h4 data-v-bcb266e0="">猜你喜欢</h4>
      </div>
      <div class="goods-list">
        <GoodsItem v-for="good in likeList" :key="good.id" :good="good" />
      </div>
    </div>
      <!-- 地址管理 -->
    <div v-else>
      <div>地址管理</div>
      <div class="header">
        <div class="addressWrapper">
          <div class="text item" :class="{active: checkindex.activeAddress.id === item.id}"
           @click="checkindex.switchAddress(item)" v-for="item in checkInfo.userAddresses"  :key="item.id">
            <ul>
              <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
              <li><span>联系方式：</span>{{ item.contact }}</li>
              <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
            </ul>
            <div>
                <span class="dialog-footer">
                  <el-button>设为默认</el-button>
                  <el-button @click="checkindex.confirm">编辑</el-button>
                  <el-button @click="del">删除</el-button>
                </span>
            </div>
          </div>
        </div>
        <div class="onAddress">
          <el-button  @click="onAddress">新增地址</el-button>
        </div>
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

// 地址管理
.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}

.onAddress{
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  & button{
    font-size: 18px;
  }
}

</style>