<template>
  <div>
    <van-cell-group :border="false">
      <van-cell :border="false" class="title-wrap">
        <template #title>
          <p class="c-fs-20 c-c-text-color">重置密码</p>
        </template>
      </van-cell>
      <van-field
        label="+86"
        v-model="phone"
        type="number"
        maxlength="11"
        clearable
        placeholder="请输入手机号">
      </van-field>
      <van-field
        border
        v-model="sms"
        maxlength="6"
        clearable
        placeholder="验证码">
        <get-code
          slot="button"
          codeType="4"
          :phone="phone"
          @update="hasGetCode = true">
        </get-code>
      </van-field>
      <van-field
        v-model="password"
        :error-message="errorMessage"
        clearable
        placeholder="新密码">
      </van-field>
      <p class="text">密码长度8-32位，须包含数字、字母、符号至少2种</p>
      <van-cell :border="false">
        <van-button
          round
          class="full-width btn-large"
          :disabled="!canSubmit"
          @click="submit"
          type="info">完成
        </van-button>
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { NavBar, Popup, Field, Button, Cell, CellGroup } from 'vant'
import GetCode from '@/components/GetCode.vue'
import { isPhone, isPhoneCode, isPassword } from '@/shared/validate'
import { back } from '../shared/util'
import { modifyUserPassword } from '../api/user'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    GetCode
  },
  data () {
    return {
      phone: '',
      sms: '',
      hasGetCode: false,
      password: ''
    }
  },
  computed: {
    canSubmit () {
      return isPhone(this.phone) && isPhoneCode(this.sms) && this.hasGetCode && this.password && !this.errorMessage
    },
    errorMessage () {
      let str = ''
      if (this.password && !isPassword(this.password)) {
        str = '密码格式不正确'
      }
      return str
    }
  },
  methods: {
    back,
    ...mapActions([ 'updateUserInfo' ]),
    async submit () {
      const { success, errorMessage } = await modifyUserPassword(this.phone, this.sms, this.password)
      if (success) {
        this.$emit('toByPassword')
      } else {
        this.$notify(errorMessage || '重置密码失败，请稍候再试')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
}
.title-wrap {
  padding-top: 30px;
  padding-bottom: 16px;
}
.btn-large {
  margin-top: 24px;
}
.text{
    font-size: 10px;
    color: $password-color;
    text-align: center;
    margin: 10px auto;
}
</style>
