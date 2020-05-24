<template>
  <div>
    <van-contact-card
      :type="type"
      :name="name"
      :tel="address"
      :add-text="addText"
      @click="select"
  />
  <van-card
    num="2"
    price="2.00"
    desc="描述信息"
    title="商品标题"
    thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
  />
  <van-submit-bar
    :price="3050"
    button-text="提交订单"
    @submit="onSubmit"
  />
</div>
</template>
<script>
import { ContactCard, Card, SubmitBar, Toast } from 'vant'
import { getDefaultAddress } from '../../api/address'
export default {
  components: {
    [ContactCard.name]: ContactCard,
    [Card.name]: Card,
    [SubmitBar.name]: SubmitBar
  },
  data () {
    return {
      defaultAddress: null,
      type: 'type',
      addText: '',
      name: '',
      address: ''
    }
  },
  created () {
    if (sessionStorage.getItem('address')) {
      this.defaultAddress = JSON.parse(sessionStorage.getItem('address'))
      this.name = this.defaultAddress.name + ' ' + this.defaultAddress.tel
      this.address = this.defaultAddress.address
    } else {
      this.getDefault()
    }
  },
  methods: {
    onSubmit () {
      Toast('提交成功')
    },
    async getDefault () {
      const { success, value } = await getDefaultAddress()
      if (success) {
        this.defaultAddress = value
        if (!this.defaultAddress) {
          this.type = 'add'
          this.addText = '添加收货人信息'
        } else {
          this.name = this.defaultAddress.consignee + ' ' + this.defaultAddress.mobile
          this.address = this.defaultAddress.province + this.defaultAddress.city + this.defaultAddress.area + this.defaultAddress.street
          this.type = 'type'
        }
      } else {
        this.type = 'add'
        this.addText = '添加收货人信息'
      }
    },
    select () {
      console.log(!this.defaultAddress)
      if (!this.defaultAddress) {
        this.$router.push({
          path: '/addAddress',
          query: {
            type: 'orderDetail'
          }
        })
      } else {
        this.$router.push({
          path: '/addressList',
          query: {
            type: 'orderDetail'
          }
        })
      }
    }
  }
}
</script>
