<template>
  <div class="p-setting">
    <van-nav-bar
      left-arrow
      title="设置"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-cell-group class="c-mt">
      <van-cell class="ta-c">
        <van-button size="large" type="info" @click="handleLogout">退出登录</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Cell, CellGroup, NavBar, Button } from 'vant'
import { back } from '../../shared/util'

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  data () {
    return {
    }
  },
  methods: {
    back,
    ...mapActions([ 'logout' ]),
    async handleLogout () {
      await this.logout()
      this.back()
    }
  }
}
</script>

<style lang="scss">
.p-setting {
}
</style>
