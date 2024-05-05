<script setup>
import { getCheckInfoAPI ,createOrderAPI ,addAddressAPI,delAddressAPI} from '@/apis/checkout'
import {ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { userCartStore } from '@/stores/cartStore'

const cartStore = userCartStore()
const router = useRouter()
const curAddress = ref({})  // 默认地址
const checkInfo = ref({})  // 订单对象
const getCheckInfo = async () => {
  const res = await getCheckInfoAPI()
  checkInfo.value = res.result
  // 适配地址
  // 从地址列表中筛选出来 isDefault  === 0 那一项
  const item = checkInfo.value.userAddresses.find(item => item.isDefault === 0)
  curAddress.value = item
}

onMounted(() => getCheckInfo())

const toggleFlag = ref(false)  // 切换地址弹窗

const activeAddress = ref({})  // 选中的地址
const switchAddress = (item) => {
  activeAddress.value = item
}
const confirm = () => {
  curAddress.value = activeAddress.value
  toggleFlag.value = false
  activeAddress.value = {}
}

const del = async () => {
  // 删除地址
  // 1.调用删除地址接口
  await delAddressAPI(activeAddress.value.id)
  // 2.重新获取地址列表
  getCheckInfo()
  // 3.关闭弹窗
  toggleFlag.value = false
}

// 创建订单
const createOrder = async () => {
  const res = await createOrderAPI({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods:checkInfo.value.goods.map(item => {
      return {
        skuId: item.skuId,
        count: item.count
      }
    }),
    addressId: curAddress.value.id
  })
    // 跳转到支付页面
    router.push({
      path: '/pay',
      query: {
        id: res.result.id
      }
    })
    // 更新购物车
    cartStore.updateNewList()
}

// 添加地址
const addFlag = ref(false)    // 切换弹窗
const formRef = ref(null)   // 表单实例
const addressForm = ref({
  receiver: '',   //收货人-姓名
  contact: '',    //收货人-联系方式
  provinceCode: '',   //省份编码
  cityCode: '',     //城市编码
  countyCode: '', //地区编码
  address:'',   //详细地址
  postalCode:'',  //邮政编码
  addressTags:'', //地址标签
  isDefault: 0,     //货地址是否默认  1-否 0-是
  fullLocation:'', //完整地址
  // location:'' //拼接地址
})

const rules = {
  receiver:[
    {required:true, message:'长度不超过25字符',trigger:'blur'},
    {
      pattern: /^(?![\d]+$)([\u4e00-\u9fa5a-zA-Z0-9]){2,25}$/,
      message: '长度需要在2-25非空字符之间，不能包含特殊字符',
      trigger: 'blur'
    }
  ],
  contact:[
  {required:true, message:'电话号码，手机号码必须填一项',trigger:'blur'},
  {
    pattern:/^1[3,9]\d{9}$/,
    message:'收手机号码不能为空',
  }
  ],
  address:[
    {required:true, message:'请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息',trigger:'blur'},
    {
      pattern:/^\S(?![\d]+$)([\u4e00-\u9fa5a-zA-Z0-9]){2,120}$/,
      message:'详细地址长度需要在2-120汉字或字符之间，不能包含特殊字符',
      trigger:'blur'
    }
  ],
  location:[{required:true, message:'请选择所在地区',trigger:'change'}],
  postalCode:[
    {required:true, message:'请输入邮政编码',trigger:'blur'},
    {
      pattern:/^[1-9]\d{5}$/,
      message:'邮政编码格式不正确',
      trigger:'blur'
    }
  ]
}

const options = ref([
  {
    value: '210000',
    label: '辽宁省',
    children: [
      {
        value:'210200',
        label:'大连市',
        children:[
          {
            value:'111006',
            label:'中山区'
          }
        ]
      }
    ]
  },
  {
    value: '520000',
    label: '贵州省',
    children: [
      {
        value:'550000',
        label:'贵阳市',
        children:[
          {
            value:'550025',
            label:'花溪区'
          }
        ]
      }
    ]
  }
])
// 下拉框获取值 通过ref获取
const cascaderRef = ref()
const handleLocationChange = (val) => {
  // 获取省市区编码
  addressForm.value.provinceCode = val[0],
  addressForm.value.cityCode = val[1],
  addressForm.value.countyCode = val[2]
  // 拼接地址
  // addressForm.value.location = cascaderRef.value.getCheckedNodes()[0].pathLabels.join('')
}

// 默认地址
const isD = ref(false)
const isEsit = () => {
  // 默认地址取反得到 true 或 false
  isD.value = !isD.value
  // 判断重新赋值
  addressForm.value.isDefault = isD.value ? 1 : 0
}

const addAddress =  () => {
  // 表单校验
  formRef.value.validate(async valid => {
    if (!valid) return
    // 添加地址
    await addAddressAPI({
      receiver: addressForm.value.receiver,
      contact: addressForm.value.contact,
      provinceCode: addressForm.value.provinceCode,
      cityCode: addressForm.value.cityCode,
      countyCode: addressForm.value.countyCode,
      address: addressForm.value.address,
      postalCode: addressForm.value.postalCode,
      isDefault: addressForm.value.isDefault,
    })
    console.log(addressForm.value);
    // 关闭弹窗
    ElMessage.success('添加成功')
    addFlag.value = false
    // 重新获取地址列表
    getCheckInfo()
  })
}



</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
              <ul v-else>
                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="toggleFlag = true">切换地址</el-button>
              <el-button size="large" @click="addFlag = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.price }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color:#999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large" @click="createOrder" >提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="toggleFlag" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item" :class="{active: activeAddress.id === item.id}" @click="switchAddress(item)" v-for="item in checkInfo.userAddresses"  :key="item.id">
        <ul>""
        <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="del">删除</el-button>
        <el-button>取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
  <el-dialog  v-model="addFlag" title="添加收货地址" width="50%" center>
    <el-form ref="formRef" :model="addressForm" :rules="rules" label-position="right"   label-width="80px" >
      <el-form-item  label="收货人" prop="receiver">
        <el-input v-model="addressForm.receiver"></el-input>
      </el-form-item>
      <el-form-item  label="联系方式" prop="contact">
        <el-input v-model="addressForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="所在地区" prop="location">
        <el-cascader
          ref="cascaderRef"
          :options="options"
          v-model="addressForm.location"
          @change=" handleLocationChange"
          placeholder="请选择所在地区">
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="addressForm.address"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="postalCode">
        <el-input v-model="addressForm.postalCode"></el-input>
      </el-form-item>
      <el-form-item ref="isD" >
      <el-radio-group v-model="addressForm.isDefault">
        <el-radio @click="isEsit" value="1">默认设置收货地址</el-radio>
      </el-radio-group>
    </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="addAddress">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

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
</style>