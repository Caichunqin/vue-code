<template>
  <div>
    <van-cell-group>
      <van-field v-model="form.consignee" label="姓名" placeholder="请输入姓名" />
      <van-field v-model="form.mobile" label="手机号" placeholder="请输入手机号" />
      <van-field :value="address" readonly clearable label="收货地址" placeholder="请选择省市区" @click="show=true"/>
      <van-field v-model="form.street" placeholder="请输入详细地址" label="详细地址" />
      <van-cell title="设置默认地址">
        <template slot="default">
          <van-switch v-model="form.defaulted" @change="changeSwitch" active-color="#07c160"/>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="addBtn">
      <van-button type="info" size="large" @click="onSave" :disabled="isClick">保存</van-button>
      <van-button size="large" @click="onDelete" class="deleteBtn" v-if="addressId">删除</van-button>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-area :area-list="areaList" :value="form.areaCode" @cancel="show=false"  @confirm="onChangeArea"/>
    </van-popup>
  </div>
</template>
<script>
import { AddressEdit, Toast, Field, CellGroup, Switch, Cell, Popup, Area, Button, Dialog } from 'vant'
import { getAreaList, saveAddress, getAddressDetail, deleteAddress, setDefaultAddress } from '../../api/address'
import { isPhone } from '@/shared/validate'
export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Switch.name]: Switch,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [Button.name]: Button
  },
  data () {
    return {
      areaList: {},
      addressId: null,
      userId: '',
      form: {
        defaulted: false,
        consignee: '',
        mobile: '',
        street: ''
      },
      show: false,
      address: '',
      areaInfo: {},
      type: ''
    }
  },
  computed: {
    isClick () {
      let flag = false
      for (let key in this.form) {
        if (!this.form[key] && key !== 'defaulted') {
          flag = true
        }
      }
      return flag
    }
  },
  created () {
    this.form.userId = JSON.parse(localStorage.getItem('userInfo')).id
    this.getArea()
  },
  mounted () {
    if (this.$route.query.id) {
      this.addressId = Number(this.$route.query.id)
      this.type = this.$route.query.type ? this.$route.query.type : 'addAddress'
      this.getDetail()
    }
  },
  methods: {
    async onSave () {
      if (!isPhone) {
        return Toast('请输入正确的手机号')
      }
      // this.form.defaulted = this.defaulted
      let params = Object.assign(this.areaInfo, this.form)
      if (this.addressId) {
        params.id = this.addressId
      }
      const { success } = await saveAddress(params)
      if (success) {
        Toast('保存成功')
        this.$router.replace({
          path: '/addressList',
          query: {
            type: this.type
          }
        })
      }
    },
    async setDeFault (id) {
      const { success } = await setDefaultAddress(id)
      if (success) {
        Toast('设置默认地址成功')
      }
    },
    async getDetail () {
      const { success, value } = await getAddressDetail(this.addressId)
      if (success) {
        let info = value || {}
        for (let key in this.form) {
          for (let val in info) {
            if (key === val) {
              this.form[key] = info[val]
            }
          }
        }
        // this.defaulted = info.defaulted
        this.address = info.province + '/' + info.city + '/' + info.area
      }
    },
    changeSwitch (e) {
      if (this.addressId) {
        this.setDeFault(this.addressId)
      }
    },
    async onDelete () {
      Dialog.confirm({
        title: '',
        message: '确认删除吗？'
      }).then(() => {
        // on confirm
        this.delete()
      }).catch(() => {
        // on cancel
      })
    },
    async delete () {
      const { success } = await deleteAddress(this.addressId)
      if (success) {
        Toast('删除成功')
        this.$router.replace({
          path: '/addressList',
          query: {
            type: this.type
          }
        })
      }
    },
    async getArea () {
      const { success, value } = await getAreaList()
      if (success) {
        this.areaList = value
      }
    },
    onChangeArea (val) {
      this.address = val[0].name + val[1].name + val[2].name
      this.show = false
      this.areaInfo = {
        province: val[0].name,
        provinceCode: val[0].code,
        city: val[1].name,
        cityCode: val[1].code,
        area: val[2].name,
        areaCode: val[2].code
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.addBtn {
  width: 90%;
  margin: 20px auto;
  .deleteBtn {
    margin-top: 20px;
    border: none;
  }
}
</style>
