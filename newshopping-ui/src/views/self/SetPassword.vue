<template>
  <div class="set-password">
    <van-nav-bar
      left-arrow
      :title="title"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="password"
        type="text"
        border
        clearable
        :error-message="errorMessage"
        placeholder="请输入密码">
      </van-field>
      <van-field
        v-model="rePassword"
        type="text"
        border
        :error-message="errorMessagePas"
        clearable
        placeholder="确认密码">
      </van-field>
    </van-cell-group>
     <p class="text">密码长度8-32位，须包含数字、字母、符号至少2种</p>
     <div class="next-btn">
       <van-button type="info" size="large" @click="submit" :disabled="canSubmit">确认提交</van-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { NavBar, CellGroup, Field, Button } from 'vant'
import { back } from '../../shared/util'
import { isPassword } from '../../shared/validate'
export default {
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      password: '',
      rePassword: ''
    }
  },
  created () {
    console.log(isPassword(1122))
  },
  computed: {
    ...mapState([ 'userInfo' ]),
    isEdit () {
      return !!this.userInfo?.password
    },
    title () {
      return !this.isEdit ? '设置密码' : '修改密码'
    },
    canSubmit () {
      return this.password && this.rePassword && this.password !== this.rePassword
    },
    errorMessage () {
      let str = ''
      if (this.password && !isPassword(this.password)) {
        str = '密码格式不正确'
      }
      return str
    },
    errorMessagePas () {
      let str = ''
      if (this.rePassword && this.password !== this.rePassword) {
        str = '密码不一致'
      }
      return str
    }
  },
  methods: {
    back,
    ...mapActions([ 'updateUserInfo' ]),
    async submit () {
      const info = { password: this.password }
      const { success } = await this.updateUserInfo(info)
      if (success) {
        this.$router.push('/self')
      }
    }
  }
}
</script>

<style lang="scss">
.set-password {
  min-height: 100vh;
  background: $background-color;
  .full-width {
    width: 100%;
  }
  .text{
    font-size: 10px;
    color: $password-color;
    width: 90%;
    margin: 10px auto;
  }
  .next-btn {
    width: 90%;
    margin: 50px auto;
  }
}
</style>
