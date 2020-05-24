<template>
  <van-address-addressList
    v-model="chosenAddressId"
    :addressList="addressList"
    @add="onAdd"
    @select="select"
    @edit="onEdit"
  />
</template>
<script>
import { AddressList, Toast } from 'vant'
import { getAddressList, setDefaultAddress } from '../../api/address'
export default {
  components: {
    [AddressList.name]: AddressList
  },
  data () {
    return {
      chosenAddressId: '1',
      addressList: [],
      pageNo: 1,
      type: '',
      newList: []
    }
  },
  created () {
    this.type = this.$route.query.type
    this.getList()
  },
  methods: {
    onAdd () {
      console.log(1)
      this.$router.push({
        path: '/addAddress',
        query: {
          type: this.type
        }
      })
    },
    onEdit (item, index) {
      this.$router.push({
        path: '/addAddress',
        query: {
          id: item.id,
          type: this.type
        }
      })
    },
    select (val) {
      if (this.type === 'userInfo') {
        if (!val.defaulted) {
          this.setDeFault(val.id)
        }
        return
      }
      this.$router.push({
        path: this.type,
        query: {
          id: val.id
        }
      })
      sessionStorage.setItem('address', JSON.stringify(val))
    },
    async setDeFault (id) {
      const { success } = await setDefaultAddress(id)
      if (success) {
        Toast('设置默认地址成功')
      }
    },
    async getList () {
      const { success, value } = await getAddressList(this.pageNo)
      if (success) {
        this.addressList = (value?.list || []).map(i => {
          if (i.defaulted) {
            this.chosenAddressId = i.id
          }
          return {
            id: i.id,
            name: i.consignee,
            tel: i.mobile,
            address: i.province + i.city + i.area + i.street
          }
        })
      }
    }
  }
}
</script>
