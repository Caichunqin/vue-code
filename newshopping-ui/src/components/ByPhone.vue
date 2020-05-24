<template>
  <div>
    <van-cell-group>
      <van-cell :border="false" class="title-wrap">
        <template #title>
          <p class="c-fs-20 c-c-text-color title">输入验证码</p>
        </template>
        <template #label>
          <p class="c-fs-10 c-c-gray-darker">短信验证码已发送至 +86 {{phoneMask}}</p>
        </template>
      </van-cell>
      <van-field
        border
        v-model="sms"
        maxlength="6"
        clearable
        placeholder="请输入验证码">
        <get-code
          slot="button"
          codeType="2"
          :phone="phone"
          @update="hasGetCode = true">
        </get-code>
      </van-field>
    </van-cell-group>
    <van-cell>
      <van-button
        round
        class="full-width btn-large"
        :disabled="!canSubmit"
        @click="submit"
        type="info">确定
      </van-button>
    </van-cell>
  </div>
</template>

<script>
import { Field, CellGroup, Cell, Button, NavBar } from 'vant'
import GetCode from '@/components/GetCode.vue'
import { isPhone, isPhoneCode } from '@/shared/validate'
import { loginByCode } from '@/api/user'
import { back } from '../shared/util'

export default {
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    GetCode
  },
  data () {
    return {
      sms: '',
      hasGetCode: false
    }
  },
  props: ['phone'],
  computed: {
    canSubmit () {
      return isPhone(this.phone) && isPhoneCode(this.sms) && this.hasGetCode
    },
    phoneMask () {
      return this.phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    }
  },
  methods: {
    back,
    async submit () {
      const { success, errorMessage, value } = await loginByCode(this.phone, this.sms) || {}
      if (success) {
        this.$emit('update', value)
      } else {
        this.$notify(errorMessage || '登录失败')
      }
    }
  }
}
</script>

<style scoped>
.full-width {
  width: 100%;
}
.title {
  margin-bottom: 12px;
}
.title-wrap {
  padding-top: 30px;
  padding-bottom: 16px;
}
.btn-large {
  margin-top: 24px;
}
</style>
