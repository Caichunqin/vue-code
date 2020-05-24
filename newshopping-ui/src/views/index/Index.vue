<template>
  <div class="v-home">
    <van-search
      placeholder="请输入搜索关键词"
      @focus="onSearch"
    />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index" @click="$router.push({path:'/productDetail',query:{id:item.goodsId}})" >
        <img v-lazy="downloadFile(item.picAddress)" height="180" width="100%" class="lazy-img"/>
      </van-swipe-item>
    </van-swipe>
    <van-row class="col-2">
      <van-col class="row-3" span="4" v-for="(item,index) in sortList" :key="index">
        <div>
          <van-icon name="gift-o" size="30px" />
          <span>{{item.sortName}}</span>
        </div>
      </van-col>
    </van-row>
    <div ref="recommend">
      <p class="title">为你推荐</p>
      <GoodsList :goodsList="list" :status="status"></GoodsList>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, row, col, Icon, Search } from 'vant'
import { getSortList } from '../../api/sort'
import { getBanner } from '../../api/home'
import GoodsList from '@/components/GoodsList.vue'
import { mapActions } from 'vuex'
import { downloadFile } from '../../api/upload'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [row.name]: row,
    [col.name]: col,
    [Icon.name]: Icon,
    [Search.name]: Search,
    GoodsList
  },
  data () {
    return {
      images: [],
      sortList: [],
      level: '1',
      pageSize: 10,
      pageNo: 1,
      list: [],
      status: {
        error: false,
        loading: false,
        finished: false
      },
      height: 500
    }
  },
  created () {
    this.getBannerList()
    this.getSort()
  },
  mounted () {
    this.getProduct()
  },
  methods: {
    downloadFile,
    ...mapActions(['queryGoods']),
    async getSort () {
      const { success, value, errorMessage } = await getSortList(this.level)
      if (success) {
        this.sortList = value
      } else {
        this.$notify(errorMessage)
      }
    },
    async getBannerList () {
      const { success, value } = await getBanner()
      if (success) {
        this.images = value
      }
    },
    onSearch () {
      this.$router.push({
        path: '/search'
      })
    },
    async getProduct () {
      const { value, success } = await this.queryGoods()
      this.status.loading = false
      this.list = value.list || []
      let dom = this.$refs.recommend
      let len = this.list.length / 2
      dom.style.height = len * 190 + 'px'
      if (success) {
        this.status.error = false
        this.status.finished = true
      } else {
        this.status.error = true
      }
    }
  }
}
</script>

<style lang="scss">
.v-home {
  height: 100%;
  .col-2 {
    background: $white;
  }
  .row-3 {
    margin-top: 20px;
    margin-left: 5px;
    height: 70px;
    width: 70px;
    text-align: center;
    span {
      display: block;
      color: $text-color;
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
  .lazy-img {
    object-fit: cover;
  }
  .title {
    margin-left: 10px;
  }
  .van-card__header {
    display: block;
    .van-image__img {
      width:100%;
      height: 80px;
    }
    .van-card__content {
      min-height: 60px;
    }
  }
  .van-card {
    height: 165px;
    background: $white;
    width: 46%;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
  }
}
</style>
