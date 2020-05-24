<template>
  <van-popup
    v-model="visible"
    transition="van-slide-up"
    class="login"
    :overlay="false"
    position="top"
    :duration=".2"
    @closed="closed">
    <van-nav-bar
      left-arrow
      left-text="返回"
      @click-left="back"
      @click-right="isByPhone = !isByPhone"
    />
    <van-cell-group v-if="pageIndex == 1" :border="false">
      <van-cell :border="false" class="title-wrap">
        <template #title>
          <p class="c-fs-20 c-c-text-color title">你好，</p>
          <p class="c-fs-20 c-c-text-color">欢迎来到罗宾</p>
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
      <van-cell>
        <van-button
          round
          class="full-width btn-large"
          :disabled="!canSubmit"
          @click="showPage(2)"
          type="info">获取验证码
        </van-button>
        <p class="c-ta-c c-fs-14 c-c-gray-dark" @click="showPage(3)">密码登录</p>
      </van-cell>
    </van-cell-group>
    <by-phone v-if="pageIndex == 2" :phone="phone" @update="update"></by-phone>
    <by-password v-if="pageIndex == 3" @forgetPassword="showPage" @update="update"></by-password>
    <forget-password v-if="pageIndex == 4" @toByPassword="showPage(3)"></forget-password>

  </van-popup>
</template>

<script>
import { NavBar, Popup, CellGroup, Field, Cell, Button } from 'vant'
import store from '../../store'
import { getUserInfo } from '../../api/user'
import { isPhone } from '@/shared/validate'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    ByPhone: () => import('../ByPhone.vue'),
    ByPassword: () => import('./ByPassword.vue'),
    ForgetPassword: () => import('../ForgetPassword.vue')
  },
  data () {
    return {
      isByPhone: true,
      visible: false,
      phone: '',
      sms: '',
      hasGetCode: false,
      pageIndex: 1
    }
  },
  computed: {
    canSubmit () {
      return isPhone(this.phone)
    }
  },
  methods: {
    async update (token) {
      store.commit('setToken', token)
      const { success, value = {}, errorMessage } = await getUserInfo() || {}
      if (success) {
        store.commit('updateUserInfo', value)
        this.back()
      } else {
        this.$notify(errorMessage || '获取用户信息失败，请稍候再试')
      }
    },
    showPage (index) {
      // index: 1-index, 2-byPhone, 3-byPassword, 4-forgetPassword
      this.pageIndex = index
    },
    back () {
      this.visible = false
    },
    closed () {
      this.$el.parentNode.removeChild(this.$el)
      this.$destroy()
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
.title {
  margin-bottom: 14px;
}
.titles {
  margin-bottom: 20px;
}
.btn-large {
  margin-top: 24px;
  margin-bottom: 10px;
}
.login {
  width: 100vw;
  height: 100vh;
}
</style>
