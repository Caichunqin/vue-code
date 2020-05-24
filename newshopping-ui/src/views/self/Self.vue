<template>
  <div class="p-self">
    <section class="card discrible" @click="toRouter('/userInfo')">
      <template v-if="isLogin">
        <van-image
          v-if="userInfo&&userInfo.avatar"
          width="60"
          height="60"
          fit="cover"
          :src="avatar"
          class="avatar"
        />
        <div  v-if="userInfo&&userInfo.userName">{{ userInfo.userName }}</div>
        <i class="icon icon-setting" @click.stop="toRouter('/setting')"></i>
      </template>
      <template v-else>
        <p>你还未登录，请先<span class="login" @click.stop="toLogin">登录</span></p>
      </template>
    </section>
    <van-cell
      v-if="companyAuth === 1 && companyId"
      title="企业店铺"
      is-link
      @click="toCompanyStore">
    </van-cell>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { Cell, CellGroup, Image } from 'vant'
import { toLogin } from '../../shared/util'
import { downloadFile } from '../../api/upload'
import { getUserInfo } from '../../api/user'

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image
  },
  data () {
    return {
      fileList: []
    }
  },
  computed: {
    ...mapState([ 'userInfo', 'token' ]),
    isLogin () {
      return !!this.token
    },
    avatar () {
      return downloadFile(this.userInfo && this.userInfo.avatar ? this.userInfo.avatar : '')
    },
    // 企业认证状态 0-待审核 1-审核通过 2-审核未通过 -1-未提交审核信息
    companyAuth () {
      return this.userInfo?.companyAuth
    },
    companyId () {
      return this.userInfo?.companyId || ''
    }
  },
  methods: {
    ...mapMutations({
      updateUserMutation: 'updateUserInfo'
    }),
    ...mapActions([ 'logout', 'updateUserInfo' ]),
    downloadFile,
    toLogin,
    toRouter (path) {
      this.$router.push(path)
    },
    toCompanyStore () {
      const companyId = this.companyId
      if (!companyId) return
      this.$router.push({
        path: '/companyStore',
        query: { companyId }
      })
    }
  },
  async mounted () {
    const { success, value = {} } = await getUserInfo() || {}
    if (success) {
      this.updateUserMutation(value)
    }
  }
}
</script>

<style lang="scss">
.p-self {
  .card {
    background: $blue;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid $border-color;
    position: relative;
    &.discrible {
      display: flex;
      align-items: center;
      .login {
        margin-left: 10px;
      }
    }
    .avatar {
      border-radius: 50%;
      margin-right: 20px;
      margin-top: 10px;
      .van-image__img {
        border-radius: 50%;
      }
    }
    .icon-setting {
      font-size: 18px;
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
}
</style>
