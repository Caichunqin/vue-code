<template>
  <div class="p-email">
    <van-nav-bar
      left-arrow
      :title="title"
      left-text="返回"
      @click-left="back">
      <template slot="right">
        <van-button
          type="primary"
          size="small"
          @click="submit"
          :disabled="!canSubmit">确定
        </van-button>
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-if="isEdit"
        v-model="oldEmail"
        type="email"
        border
        clearable
        placeholder="请输入旧邮箱">
      </van-field>
      <van-field
        v-model="email"
        type="email"
        border
        clearable
        :placeholder="!isEdit ? '请输入邮箱' : '请输入新邮箱'">
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { NavBar, CellGroup, Field, Button } from 'vant'
import { back } from '../../shared/util'
import { isEmail } from '../../shared/validate'

export default {
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      email: '',
      oldEmail: ''
    }
  },
  computed: {
    ...mapState([ 'userInfo' ]),
    infoEmail () {
      return this.userInfo?.email
    },
    isEdit () {
      return !!this.infoEmail
    },
    title () {
      return !this.isEdit ? '设置邮箱' : '修改邮箱'
    },
    canSubmit () {
      if (this.isEdit) {
        return isEmail(this.email) &&
          isEmail(this.oldEmail) &&
          this.email !== this.oldEmail
      }
      return isEmail(this.email)
    }
  },
  methods: {
    back,
    ...mapActions([ 'updateUserInfo' ]),
    ...mapMutations({
      updateUserInfoMutaion: 'updateUserInfo'
    }),
    async submit () {
      const info = { email: this.email }
      if (this.isEdit) info.oldEmail = this.oldEmail
      const { success } = await this.updateUserInfo(info) || {}
      if (success) {
        this.updateUserInfoMutaion({ email: this.email })
        this.back()
      }
    }
  }
}
</script>

<style lang="scss">
.p-email {
  min-height: 100vh;
  background: $background-color;
  .full-width {
    width: 100%;
  }
}
</style>
