<template>
  <div class="set-mobile">
    <van-nav-bar
      left-arrow
      :title="title"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-cell-group>
      <van-cell :value="userInfo.mobile" title="手机号" value-class="mobile_text"  title-class="mobile_title" v-if="isEdit"/>
      <van-field v-model="mobile" type="tel" border :label="label" clearable placeholder="请输入您的手机号"></van-field>
      <van-field v-model="messageCode" maxlength="6" clearable placeholder="短信验证码">
        <get-code slot="button" codeType="3" :phone="mobile" @update="hasGetCode = true"> </get-code>
      </van-field>
    </van-cell-group>
    <div class="mobile-btn">
       <van-button type="info" size="large" @click="submit" :disabled="!canSubmit">{{isEdit?'更换手机号':'设置手机号'}}</van-button>
    </div>
    <p class="remark">账户需要保持唯一</p>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { NavBar, CellGroup, Cell, Button, Field } from 'vant'
import { back } from '../../shared/util'
import { isPhone, isPhoneCode } from '../../shared/validate'
import GetCode from '@/components/GetCode.vue'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    GetCode
  },
  data () {
    return {
      mobile: '',
      code: '86',
      messageCode: '',
      hasGetCode: false
    }
  },
  computed: {
    ...mapState([ 'userInfo' ]),
    isEdit () {
      return !!this.userInfo?.mobile
    },
    title () {
      return !this.isEdit ? '设置手机号' : '修改手机号'
    },
    label () {
      return !this.isEdit ? '手机号' : '新手机号'
    },
    canSubmit () {
      return isPhone(this.mobile) && isPhoneCode(this.messageCode) && this.hasGetCode
    },
    errorMessage () {
      let str = ''
      if (this.mobile && !isPhone(this.mobile)) {
        str = '手机号格式不正确'
      }
      return str
    }
  },
  methods: {
    back,
    ...mapActions([ 'updateUserInfo' ]),
    async submit () {
      const info = { phone: this.mobile, messageCode: this.messageCode, type: 3 }
      const { success } = await this.updateUserInfo(info)
      if (success) {
        this.back()
      }
    }
  }
}
</script>

<style lang="scss">
.set-mobile{
  min-height: 100vh;
  overflow: hidden;
  background: $background-color;
  .mobile_title{
    flex: initial;
    width:90px;
  }
  .mobile-btn {
    width: 90%;
    margin:30px auto 10px;
  }
  .mobile_text{
    text-align: left;
  }
  .remark{
    font-size: 16px;
    color: $remark-color;
    margin-left: 20px;
  }
  .verification_code{
    margin: 20px 0;
  }
}
</style>
