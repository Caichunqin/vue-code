<template>
  <div class="set-mobile">
    <van-nav-bar
      left-arrow
      title="修改手机号"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-cell-group>
      <!-- <van-cell title="国家和地区" is-link  value="中国大陆" />
      <van-field
          v-model="mobile"
          type="tel"
          border
          :label="code"
          clearable
          placeholder="请输入您的手机号">
      </van-field> -->
        <van-field
          v-model="messageCode"
          type="number"
          border
          label="验证码"
          clearable
          maxlength="6"
          placeholder="请输入您的验证码">
      </van-field>
    </van-cell-group>
    <div class="next-btn">
      <van-button type="info" size="large" @click="submit">下一步</van-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { NavBar, CellGroup, Cell, Field, Button } from 'vant'
import { back } from '../../shared/util'
import { isPhone } from '../../shared/validate'

export default {
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      messageCode: ''
    }
  },
  computed: {
    ...mapState([ 'userInfo' ]),
    errorMessage () {
      let str = ''
      if (this.mobile && !isPhone(this.mobile)) {
        str = '密码格式不正确'
      }
      return str
    }
  },
  methods: {
    back,
    ...mapActions([ 'updateUserInfo' ]),
    async submit () {
      const info = { messageCode: this.messageCode }
      info.messageCode = this.messageCode
      await this.updateUserInfo(info)
    }
  }
}
</script>

<style lang="scss">
.set-mobile {
  min-height: 100vh;
  background: $background-color;
  .full-width {
    width: 100%;
  }
  .next-btn {
    width: 90%;
    margin: 50px auto;
  }
}
</style>
