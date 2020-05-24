<template>
  <div class="product-detail-view">
    <van-nav-bar left-arrow
                 title="商品详情"
                 left-text="返回"
                 :right-text="prductDetail&&prductDetail.focusFlag?'已关注':'关注'"
                 @click-right="onClickRight"
                 @click-left="back">
    </van-nav-bar>
    <div class="product_detail">
      <span class="price">￥ {{prductDetail.price}}</span> <span class="tag">安心优选</span>
      <van-tag type="danger">特价</van-tag>
      <p>
        <van-tag plain
          type="danger">安全</van-tag> <span class="remark">{{prductDetail.remark}}</span>
      </p>
    </div>
    <van-cell :value="prductDetail.goodsName"
              value-class="goodsName" :border="false"/>
    <van-cell-group class="commentBox">
      <van-cell :title="commentList.length?'问大家':'暂无问答'" :value="commentList.length?'查看全部':''" :is-link="commentList.length!=0" :to="{path:'commentList',query:{id:productId}}"/>
        <template>
              <div class="comment" v-for="(item, index) in commentList" :key="index" v-show="commentList.length">
                <div class="left">
                  <van-tag type="danger">问</van-tag>
                  <span class="custom-title">{{item.comment}}</span>
                </div>
                <div class="right">
                  <span class="custom-title">{{item.replyNum}}个回答</span>
                </div>
            </div>
              <div class="comment" v-if="commentList.length==0">
                <div class="left">
                  <van-tag type="danger">问大家</van-tag>
                <span class="custom-title">宝贝好不好，问下已买的人吧</span>
                </div>
                <div class="right">
                   <van-button round type="warning" size="mini" @click="$router.push({path:'commentList',query:{id:productId}})">去提问</van-button>
                </div>
            </div>
        </template>
    </van-cell-group>
    <div class="product_img_box">
      <img v-for="img in prductDetail.goodsPictures"
           v-lazy="downloadFile(img.address)"
           :key="img.address"
           class="product_bgImg">
    </div>
    <!-- <van-field v-model="comment"
               placeholder="商品讨论" /> -->
    <van-goods-action class="cart-btn"
                      :safe-area-inset-bottom='true'>
      <van-goods-action-icon icon="chat-o"
                             text="客服" />
      <van-goods-action-icon icon="cart-o"
                             text="购物车" />
      <van-goods-action-icon icon="shop-o"
                             text="店铺"
                             @click="toStore" />
      <van-goods-action-button type="warning"
                               text="加入购物车"
                               @click="addCart(prductDetail)" />
      <van-goods-action-button type="danger"
                               text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import { NavBar, Tag, cell, Button, GoodsAction, GoodsActionIcon, GoodsActionButton, Field, CellGroup } from 'vant'
import { back } from '../../shared/util'
import { queryGoodsDetail, goodsFocus, cancelFocus } from '../../api/goods'
import { getCommentList } from '../../api/comment'
import { downloadFile } from '../../api/upload'
import { mapActions } from 'vuex'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tag.name]: Tag,
    [cell.name]: cell,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
  },
  data () {
    return {
      messageCode: '',
      productId: '',
      prductDetail: {},
      isFocus: false,
      commentList: []
    }
  },
  created () {
    this.productId = this.$route.query.id
    this.getProductDetail()
    this.getComment()
  },
  methods: {
    downloadFile,
    back,
    ...mapActions(['addProductToCart']),
    async getProductDetail () {
      const { success, value } = await queryGoodsDetail(this.productId)
      if (success) {
        this.prductDetail = value
        console.log(this.prductDetail)
      }
    },
    toStore () {
      const companyId = this.prductDetail.companyId
      if (!companyId) return
      this.$router.push({
        path: '/store',
        query: { companyId }
      })
    },
    async addCart (data) {
      const { success, errorMessage } = await this.addProductToCart(data)
      if (success) {
        this.$store.dispatch('getAllProducts')
        this.$router.push('/cart')
      } else {
        this.$notify(errorMessage)
      }
    },
    async onClickRight () {
      this.isFocus = this.prductDetail.focusFlag
      if (!this.isFocus) {
        this.isFocus = true
        this.focusGoods()
      } else {
        this.isFocus = false
        this.cancelFocusGoods()
      }
    },
    async cancelFocusGoods () {
      const { success, errorMessage } = await cancelFocus(this.productId)
      if (success) {
        this.getProductDetail()
        this.$notify({ type: 'success', message: '取消关注' })
      } else {
        this.$notify(errorMessage)
      }
    },
    async focusGoods () {
      const { success, errorMessage } = await goodsFocus(this.productId)
      if (success) {
        this.getProductDetail()
        this.$notify({ type: 'success', message: '关注成功' })
      } else {
        this.$notify(errorMessage)
      }
    },
    async getComment () {
      let params = {
        goodsId: this.productId,
        pageSize: 2,
        pageNo: 1
      }
      const { success, errorMessage, value } = await getCommentList(params)
      if (success) {
        this.commentList = value.list
        console.log(this.commentList)
      } else {
        this.$notify(errorMessage)
      }
    }
  }
}
</script>

<style lang="scss">
.product-detail-view {
  padding-bottom: 50px;
}
.product_detail {
  padding: 10px 30px;
  background: $white;
  border-bottom: 1px solid $border-color;
  > p {
    margin: 0;
  }
  .price {
    color: $red;
    font-size: 27px;
    font-weight: bold;
  }
  .remark {
    font-size: 14px;
    color: $text-color;
    margin-left: 10px;
  }
  .goodsName {
    font-size: 16px;
    color: $text-color;
  }
  .tag {
    color: $tag;
    font-size: 12px;
    margin: 0 20px;
  }
}
.product_img_box {
  width: 90%;
  margin: 5px auto 50px;
}
.product_bgImg {
  max-width: 100%;
  margin-bottom: 20px;
}
.commentBox {
  margin: 20px 0;
  .van-cell__title {
    width: 80%;
  }
  .van-cell__value,.van-icon-arrow {
    color: red;
    .custom-title {
      color: #999;
    }
  }
  .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-right: 5px;
      }
    }
    .right {
      color: #999;
    }
  }
}
</style>
