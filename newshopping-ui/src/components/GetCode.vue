<template>
  <van-button
    round
    :disabled="hasGetCode"
    size="small"
    @click="toGetCode"
    type="info">
    {{ !hasGetCode ? '获取验证码' :'重新发送' +  '(' + remainSeconds + ')' }}
  </van-button>
</template>

<script>
import { Button, Notify } from 'vant'
import { isPhone } from '../shared/validate'
import { getCode } from '../api/user'

const MAX_SECONDS = 60

export default {
  components: {
    [Button.name]: Button
  },
  props: {
    // 验证码类型 2-手机验证码登录 3-更换手机号码 4-重置密码
    codeType: {
      validator: value => ['2', '3', '4'].includes(value)
    },
    phone: [String, Number]
  },
  data () {
    return {
      hasGetCode: false,
      remainSeconds: MAX_SECONDS,
      intervalId: ''
    }
  },
  computed: {
    isPhoneRight () {
      return isPhone(this.phone)
    }
  },
  methods: {
    countdown () {
      this.intervalId = setInterval(() => {
        this.remainSeconds -= 1
        if (this.remainSeconds <= 0) {
          this.hasGetCode = false
          this.remainSeconds = MAX_SECONDS
          clearInterval(this.intervalId)
        }
      }, 1 * 1000)
    },
    async toGetCode () {
      if (this.hasGetCode || !this.isPhoneRight) return
      const { success, errorMssage } = await getCode(this.phone, this.codeType) || {}
      if (success) {
        this.hasGetCode = true
        this.$emit('update')
        this.countdown()
      } else {
        Notify(errorMssage || '获取验证失败')
      }
    }
  },
  async mounted () {
    await this.toGetCode()
  },
  destroyed () {
    clearInterval(this.intervalId)
  }
}
</script>

<style>

</style>
