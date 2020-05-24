<template>
  <div>
    <van-list v-if="goodsList&&goodsList.length>0"
              v-model="status.loading"
              :error.sync="status.error"
              error-text="请求失败，点击重新加载"
              @load="onLoad"
              :finished="status.finished">
      <van-card class="productCard"
                v-for="(item, index) in goodsList"
                :key="index"
                @click="goProductDetail(item.id)"
                :price="item.price"
                :desc="item.remark"
                :title="item.goodsName">
        <div slot="thumb">
          <van-image v-if="item.goodsPictures"
                     :src="item.goodsPictures[0]?downloadFile(item.goodsPictures[0].address):''"
                     height="60px"
                     width="100%"
                     fit="cover" />
        </div>
      </van-card>
    </van-list>
    <div class="noList"
         v-if="goodsList.length==0&&status.finished">
      <van-icon name="orders-o"
                class="noListIcon" />
      <p class="text">暂无数据</p>
    </div>
  </div>
</template>
<script>
import { List, Card, Icon, Button, Image } from 'vant'
import { downloadFile } from '../api/upload'
export default {
  components: {
    [List.name]: List,
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Image.name]: Image
  },
  props: {
    goodsList: {
      type: Array,
      value: []
    },
    status: {
      type: Object,
      value: {}
    },
    isShowBtn: {
      type: Boolean,
      value: false
    }
  },
  data () {
    return {
      pageSize: 10
    }
  },
  methods: {
    downloadFile,
    onLoad () {
      this.pageSize = this.pageSize + 10
      this.$emit('onLoad', this.pageSize)
    },
    goProductDetail (id) {
      this.$router.push({
        path: '/productDetail',
        query: { id }
      })
    }
  }
}
</script>

<style lang="scss">
.van-list {
  height: calc(100% - 100px);
  .productCard {
    background: $white;
  }
}
.noList {
  height: 200px;
  width: 100%;
  margin: 100px auto;
  text-align: center;
  .noListIcon {
    font-size: 60px;
    color: $text-color;
  }
  .text {
    font-size: 18px;
    color: $text-color;
  }
}
</style>
