<template>
  <div class="p-companyStore">
    <van-nav-bar
      left-arrow
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <section class="card discrible">
      <template>
        <van-image
          width="60"
          height="60"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          class="avatar"
        />
        <div>
          <p>爱发科</p>
          <p class="c-fs-14 c-c-gray-light">粉丝 0</p>
        </div>
      </template>
    </section>
    <section class="c-c-text-color">
      <van-grid :border="false" :column-num="3">
        <van-grid-item>
          <span class="c-mb-10">100</span>
          <span class="c-fs-12">当月有效单数</span>
        </van-grid-item>
        <van-grid-item>
          <span class="c-mb-10">372842</span>
          <span class="c-fs-12">历史成交金额</span>
        </van-grid-item>
        <van-grid-item>
          <span class="c-mb-10">74832</span>
          <span class="c-fs-12">我的VIP</span>
        </van-grid-item>
      </van-grid>
    </section>
    <section class="c-c-text-color">
      <van-grid>
        <van-grid-item icon="setting" text="商品管理" to="/goodsManage"/>
        <van-grid-item icon="comment" text="订单管理" />
        <van-grid-item icon="chat" text="用户评价" />
        <van-grid-item icon="send-gift" text="企业信息" to="/companyInfo"/>
      </van-grid>
    </section>
  </div>
</template>

<script>
import { NavBar, Image, Grid, GridItem, Icon } from 'vant'
import { back } from '../../shared/util'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Image.name]: Image,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon
  },
  data () {
    return {}
  },
  methods: {
    back
  }
}
</script>

<style lang="scss">
.p-companyStore {
  .card {
    background: $blue;
    color: #fff;
    padding: 10px 15px;
    border-bottom: 1px solid $border-color;
    position: relative;
    &.discrible {
      display: flex;
      align-items: center;
    }
    .avatar {
      border-radius: 50%;
      margin-right: 20px;
      margin-top: 10px;
      .van-image__img {
        border-radius: 50%;
      }
    }
  }
}
</style>
