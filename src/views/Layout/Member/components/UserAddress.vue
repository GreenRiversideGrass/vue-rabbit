<script setup>
import checkoutAdd from '@/views/Layout/Checkout/components/CheckoutAdd.vue'
// import { getCheckInfoAPI  } from '@/apis/checkout'
import { useAddressStore } from '@/stores/addressStore'
import { ref , onMounted} from 'vue'

const addressStore = useAddressStore()


onMounted(() => {
    addressStore.getAddressList()
})


// 删除地址操作
const del = () => {
  addressStore.delAddress()
 }

const open = ref() // 添加地址 弹窗
const onAdd = () => {
    open.value.open({})
}


// 编辑地址
const onEdit = (row) => {
    open.value.open(row)
}


</script>

<template>
          <!-- 地址管理 -->
    <div>
      <div>地址管理</div>
      <div class="header">
        <div class="addressWrapper">
          <div class="text item " 
          :class="{ 'active': addressStore.activeAddress.id === item.id}"
           @click="addressStore.switchAddress(item)" v-for="item in addressStore.addressList"  :key="item.id">
            <ul >
              <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
              <li><span>联系方式：</span>{{ item.contact }}</li>
              <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
            </ul>
            <div>
                <span class="dialog-footer">
                  <el-button :class="{'defult': item.isDefault === 0}" @click="addressStore.setDefaultAddress(item)">{{item.isDefault ? '非默认地址' : '默认地址'}}</el-button>
                  <el-button 
                   @click="onEdit(item)">编辑</el-button>
                  <el-button @click="del">删除</el-button>
                </span>
            </div>
          </div>
        </div>
        <div class="onAddress">
          <el-button  @click="onAdd">新增地址</el-button>
          <!-- 添加地址 -->
          <checkoutAdd ref="open"  ></checkoutAdd>
        </div>
    </div>
    </div>
</template>

<style scoped lang="scss">
    // 地址管理
    .header{
        display: flex;
        flex-direction: column;
        padding: 20px;
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
                padding: 10px;

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
    }
    // 默认地址按钮样式
      .defult{
        background: $helpColor;
        color: #f5f5f5;
        border: 1px solid #f5f5f5;
      }

</style>