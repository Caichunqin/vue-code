<template>
  <div class="v-list">
    <van-nav-bar
      left-arrow
      title="商品列表"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <GoodsList :goodsList='list' :status="status"  :isShowBtn="true" @onLoad="onLoad"></GoodsList>
  </div>
</template>
<script>
import { NavBar, Search } from 'vant'
import GoodsList from '@/components/GoodsList.vue'
import { back } from '../../shared/util'
import { mapActions } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    GoodsList
  },
  data () {
    return {
      keyValue: '',
      list: [],
      total: 0,
      pageSize: 10,
      status: {
        error: false,
        loading: false,
        finished: false
      }
    }
  },
  created () {
    this.keyValue = this.$route.query.val
    this.search(this.keyValue)
  },
  methods: {
    back,
    ...mapActions([ 'queryGoods' ]),
    async search (keyValue) {
      const { value, success } = await this.queryGoods(this.keyValue, '', this.pageSize)
      this.list = value.list || []
      this.total = value.total
      this.status.loading = false
      if (success) {
        this.status.error = false
        this.status.finished = true
      }
    },
    onLoad (val) {
      this.pageSize = val
      this.search(this.keyValue)
    }
  }
}
</script>

<style lang="scss" scoped>
 .v-list {
   height: 100%;
 }
</style>
