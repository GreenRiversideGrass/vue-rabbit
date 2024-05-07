import { getCheckInfoAPI ,delAddressAPI } from '@/apis/checkout'
import {ref } from 'vue'

// 订单页：地址渲染以及商品渲染
export const useCheckoutIndex = () => {
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

  // 删除地址
  const delAddress =  () => {
          // 提示用户是否删除
      ElMessageBox.confirm('是否删除该地址', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async() => {
      // 1.调用删除地址接口
      await delAddressAPI(activeAddress.value.id)
      // 2.重新获取地址列表
      getCheckInfo()
      ElMessage.success('删除成功')
      // 3.关闭弹窗
      toggleFlag.value = false
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })


  }

  return {
    getCheckInfo,
    curAddress,
    checkInfo,
    toggleFlag,
    switchAddress,
    activeAddress,
    confirm,
    delAddress
  }
}
