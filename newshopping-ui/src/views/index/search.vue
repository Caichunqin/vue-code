<template>
  <div class="list">
    <search
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="search" v-if="!isShowProduct">
        <p>热门搜索</p>
        <div>
           <van-button round  @click="searchDoods(item)" v-for="(item,index) in searchList" :key="index" size="mini">{{item}}</van-button>
        </div>
    </div>
    <div class="search" v-if="!isShowProduct">
        <p class="history">历史搜索 <van-icon name="delete" @click="deleteName"/></p>
        <div>
           <van-button round @click="searchDoods(item)" v-for="(item,index) in historyList" :key="index" size="mini">{{item}}</van-button>
        </div>
    </div>
    <GoodsList v-if="isShowProduct" :goodsList='list' :status="status" :isShowBtn="true" @onLoad="onLoad"></GoodsList>
  </div>
</template>
<script>
import { Button, Icon } from 'vant'
import search from '@/components/search.vue'
import GoodsList from '@/components/GoodsList.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    search,
    GoodsList,
    [Button.name]: Button,
    [Icon.name]: Icon
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
      },
      searchList: ['测试', 'jjj'],
      historyList: [],
      goodsName: ''
    }
  },
  created () {
    this.historyList = JSON.parse(localStorage.getItem('historyList')) || []
  },
  methods: {
    ...mapActions([ 'queryGoods' ]),
    async onSearch (val) {
      this.goodsName = val
      this.historyList.forEach(item => {
        if (item !== val) {
          this.historyList.push(val)
        }
      })
      localStorage.setItem('historyList', JSON.stringify(this.historyList))
      this.search()
    },
    searchDoods (val) {
      this.goodsName = val
      this.search()
    },
    deleteName () {
      localStorage.removeItem('historyList')
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
   .search {
       margin: 20px;
   }
   .history {
      display: flex;
      align-items: center;
      justify-content:space-between;
   }
 }
</style>
