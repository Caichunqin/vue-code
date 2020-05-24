<template>
  <div class="list">
    <search
      @search="onSearch"
      @cancel="onCancel"
    />
    <SortList @change="onItemClick" v-if="!isShowProduct"></SortList>
    <GoodsList v-if="isShowProduct" :goodsList='list' :status="status" :isShowBtn="true" @onLoad="onLoad"></GoodsList>
  </div>
</template>
<script>
import SortList from '@/components/SortList.vue'
import search from '@/components/search.vue'
import GoodsList from '@/components/GoodsList.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    search,
    SortList,
    GoodsList
  },
  data () {
    return {
      keyValue: '',
      sortId: '',
      isShowProduct: false,
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
  methods: {
    ...mapActions([ 'queryGoods' ]),
    async onSearch (val) {
      this.keyValue = val
      this.search()
    },
    async onItemClick (data) {
      this.sortId = data.id
      this.search()
    },
    async search () {
      this.isShowProduct = true
      const { value, success } = await this.queryGoods(this.goodsName, this.sortId, this.pageSize)
      this.list = value.list || []
      this.total = value.total
      this.status.loading = false
      if (success) {
        this.status.error = false
        this.status.finished = true
      } else {
        this.status.error = true
      }
    },
    onCancel () {
      this.keyValue = ''
      this.sortId = ''
      this.isShowProduct = false
    },
    onLoad (val) {
      this.pageSize = val
      this.search()
    }
  },
  beforeRouteLeave (to, form, next) {
    this.onCancel()
    next()
  }
}
</script>

<style lang="scss" scoped>
 .list {
   height: 100%;
 }
</style>
