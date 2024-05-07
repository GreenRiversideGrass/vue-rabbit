<script setup>
import {addAddressAPI ,editAddressAPI  } from '@/apis/checkout'
import { useUserStore } from '@/stores/userStore';
import router from "@/router"
import { ref } from 'vue'

const formRef = ref()   // 表单实例验证
// const addAddressStore = useAddressStore()
const userStore = useUserStore()

defineProps({
  title:{
    type:String
  }
})

const addFla = ref(false)    // 切换弹窗
const addflag = ref()
const open = async(row) => {
  addflag.value = addFla.value
  addressForm.value = {...row}  // 添加 -> 重置了表单内容， 编辑 -> 存储了需要回显的数据
  // console.log(addressForm.value);
// 设置 cascaderValue 的值
  selectedValues.value.value = [row.provinceCode, row.cityCode, row.countyCode]
  if(row.fullLocation){
    selectedValues.value.label = row.fullLocation.split('/')
  }

}




const selectedValues = ref([
{
    value: '',
    label: '',
    children: [
      {
        value:'',
        label:'',
        children:[
          {
            value:'',
            label:''
          }
        ]
      }
    ]
  }
])

const addressForm = ref({
  receiver: '',   //收货人-姓名
  contact: '',    //收货人-联系方式
  provinceCode: '',   //省份编码
  cityCode: '',     //城市编码
  countyCode: '', //地区编码
  address:'',   //详细地址
  postalCode:'',  //邮政编码
  addressTags:'', //地址标签
  isDefault: 1,     //货地址是否默认  1-否 0-是
  fullLocation: '', //完整地址
  id: ''  //地址id
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
  if(val.length === 3){
    addressForm.value.provinceCode = val[0],
    addressForm.value.cityCode = val[1],
    addressForm.value.countyCode = val[2]
  }
  // 拼接地址
    addressForm.value.fullLocation = cascaderRef.value.getCheckedNodes()[0].pathLabels.join('') 
     
}

// 默认地址
const isD = ref(true)
const isEsit = () => {
  // 默认地址取反得到 true 或 false
  isD.value = !isD.value
  // 判断重新赋值
  addressForm.value.isDefault = isD.value ? 1 : 0
  
}

// TODO-----------------------------------------------------------------
// 添加和编辑地址未解决，存在请求问题？？？？？？

const onSubmit = async () => {
  const  token =  userStore.userInfo.token
  formRef.value.validate()
  const isEdit = addressForm.value.id
  if(isEdit && token){
    // 判断isEdit是否存在，存在则编辑地址
    await editAddressAPI(addressForm.value.id, addressForm.value)
    ElMessage.success('编辑成功')
    // 关闭弹窗
    addflag.value = false
  }else{
      // 添加地址
    await addAddressAPI(addressForm.value)
    ElMessage.success('添加成功')
        // 关闭弹窗
    addflag.value = false
  }

  ElMessage.error('请登录后再添加地址')
    // 跳转到登录页面
    router.push('/login')
}



defineExpose({
  open,
  isEsit,
})

</script>
<template>
  {{ selectedValues.label }}
    <el-dialog class="addAddress " ref="addFla" :title="addressForm.id  ? '编辑收货地址' : '添加收货地址'" v-model="addflag"   width="30%"  center>
    <el-form  ref="formRef" :model="addressForm" :rules="rules" label-position="right" style="max-width: 600px"   label-width="auto">
      <el-form-item  label="收  货  人" prop="receiver">
        <el-input v-model="addressForm.receiver"></el-input>
      </el-form-item>
      <el-form-item  label="联系方式" prop="contact">
        <el-input v-model="addressForm.contact"></el-input>
      </el-form-item>
      <el-form-item label="所在地区" >
        <el-cascader
          ref="cascaderRef"
          :options="options"
          v-model="selectedValues"
          :props="{ value: 'value', label: 'label', children: 'children' }"
          @change=" handleLocationChange"
          :show-all-levels="true"
          placeholder="请选择所在地区">
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="addressForm.address"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="postalCode">
        <el-input v-model="addressForm.postalCode"></el-input>
      </el-form-item>
      <!-- <el-form-item label="完整地址" >
        <el-input v-model="addressForm.fullLocation"></el-input>
      </el-form-item> -->
      <el-form-item label="地址标签">
        <el-input v-model="addressForm.addressTags"></el-input>
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

        <el-button type="primary"  @click="onSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss">

.addAddress {
  .el-form{
    margin: 0 auto;
  }
  .el-form-item {
    margin-bottom: 20px;
    padding: 0 25px;
  }
}

</style>