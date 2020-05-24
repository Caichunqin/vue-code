<template>
  <div>
    <van-nav-bar
      left-arrow
      title="修改个人简介"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-field
      v-model="profile"
      type="textarea"
      border
      clearable
      placeholder="请输入个人简介">
    </van-field>
    <div class="c-p">
      <van-button
        type="info"
        size="large"
        @click="submit"
        :disabled="isLoading">
        确认提交
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { NavBar, Field, Button } from 'vant'
import { back } from '../../shared/util'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      profile: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions([ 'updateUserInfo' ]),
    back,
    async submit () {
      this.isLoading = true
      const info = { introduce: this.profile }
      const { success } = await this.updateUserInfo(info)
      setTimeout(() => { this.isLoading = false }, 300)
      if (success) {
        this.back()
      }
    }
  },
  mounted () {
    const introduce = JSON.parse(localStorage.getItem('userInfo')).introduce || ''
    this.profile = introduce
  }
}
</script>

<style>

</style>
