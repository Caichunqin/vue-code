<template>
  <div class="list">
    <GoodsList :goodsList='list'
               v-if="isShowProduct"
               :status="status"
               @onLoad="onLoad"
               :isShowBtn="true"></GoodsList>
  </div>
</template>
<script>
import GoodsList from '@/components/GoodsList.vue'
import { focusGoodsList } from '../../api/goods'
export default {
  components: {
    GoodsList
  },
  data () {
    return {
      keyValue: '',
      sortId: '',
      isShowProduct: true,
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
    this.getList()
  },
  methods: {
    async getList () {
      const { success, errorMessage, value } = await focusGoodsList(this.pageSize)
      if (success) {
        this.list = value.list
        this.total = value.total
        this.status.loading = false
        this.status.error = false
        this.status.finished = true
      } else {
        this.status.error = true
        this.$notify(errorMessage)
      }
    },
    onLoad (val) {
      this.pageSize = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  height: 100%;
}
</style>
