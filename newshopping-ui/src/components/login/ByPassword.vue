<template>
  <div>
    <van-cell-group>
      <van-cell :border="false" class="title-wrap">
        <template #title>
          <p class="c-fs-20 c-c-text-color">密码登录</p>
        </template>
      </van-cell>
      <van-field
        v-model="user"
        maxlength="20"
        clearable
        placeholder="手机号/邮箱/用户名">
      </van-field>
      <van-field
        v-model="password"
        @click-right-icon="isShowPassword"
        maxlength="30"
        :right-icon="isEyeOn ? 'eye-o' : 'closed-eye'"
        :type="isPassword ? 'password' : ''"
        clearable
        placeholder="密码">
      </van-field>
    </van-cell-group>
    <van-cell :border="false">
      <van-button
        round
        class="full-width btn-large"
        :disabled="!canSubmit"
        @click="submit"
        type="info">确定
      </van-button>
    </van-cell>
    <p class="c-ta-c c-fs-12 c-c-gray-dark" @click="forget">忘记密码？</p>
  </div>
</template>

<script>
import { Field, CellGroup, Cell, Button, NavBar } from 'vant'
import { loginByPassword } from '@/api/user'
import { back } from '../../shared/util'

export default {
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      user: '',
      password: '',
      isEyeOn: false,
      isPassword: true
    }
  },
  computed: {
    canSubmit () {
      return this.user !== '' && this.password !== ''
    }
  },
  methods: {
    back,
    async submit () {
      const { success, errorMessage, value } = await loginByPassword(this.user, this.password) || {}
      if (success) {
        this.$emit('update', value)
      } else {
        this.$notify(errorMessage || '登录失败')
      }
    },
    forget () {
      this.$emit('forgetPassword', 4)
    },
    isShowPassword () {
      this.isPassword = !this.isPassword
      this.isEyeOn = !this.isEyeOn
    }
  }
}
</script>

<style scoped>
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
</style>
