import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAddressAPI ,setDefaultAddressAPI,delAddressAPI} from '@/apis/checkout'

export const useAddressStore = defineStore('address', () => {

    // 1.定义state - addressList
    // const defaultAddress = ref({})
    const addressList = ref({})
    // 获取地址列表
    const getAddressList = async () => {
        const res = await getAddressAPI()
        addressList.value = res.result
        // 对地址列表进行排序，将isDefault值为0的项目放在列表的顶部
        addressList.value.sort((a, b) => a.isDefault - b.isDefault)

    }

    // 点击的列表项
    const activeAddress = ref({}) // 选中的列表项存储

    const switchAddress = (item) => { // 点击切换地址
        activeAddress.value = item
        // console.log(activeAddress.value );
    }

    

// 当点击某个项目时，设置该项目的isDefault值为0，其余项目的isDefault值为1
const setDefaultAddress = async (item) => {
    // 遍历地址列表
    addressList.value.forEach(async (address) => {
        // 如果当前项目与点击的项目相同，则设置isDefault为0，否则设置为1
        if (address === item) {
            address.isDefault = 0;
        } else {
            address.isDefault = 1;
        }
        // 调用接口修改默认地址
        await setDefaultAddressAPI(address)
    })

    // 重新获取地址列表
    getAddressList()
    // 重置激活地址，使得样式不再出现
    activeAddress.value = {}

}

// TODO---------------------------------------------------删除地址
const delAddress = () => {
        // 提示用户是否删除
        ElMessageBox.confirm('是否删除该地址', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async() => {
        // 1.调用删除地址接口
        await delAddressAPI(activeAddress.value.id)
        // 2.重新获取地址列表
        getAddressList()
        ElMessage.success('删除成功')
    })
    .catch(() => {
        ElMessage({
        type: 'info',
        message: '已取消删除',
        })
    })
        
}





    return{
        addressList,
        getAddressList,
        switchAddress,
        activeAddress,
        setDefaultAddress,
        delAddress
    }
    
})