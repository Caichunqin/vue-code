<template>
  <div>
    <keep-alive>
      <router-view class="tab-content"></router-view>
    </keep-alive>
    <van-tabbar route>
      <van-tabbar-item to="/index">
        <span>首页</span>
        <i slot="icon" class="icon icon-home"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/sort">
        <span>分类</span>
        <i slot="icon" class="icon icon-search"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/publish">
        <span>发布</span>
        <i slot="icon" class="icon icon-explore"></i>
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o"  to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item to="/self">
        <span>我的</span>
        <i slot="icon" class="icon icon-self"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'Tabs',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>

<style lang="scss" scoped>
.tab-content {
  min-height: calc(100vh - 50px);
  padding-bottom: 50px;
  background: $background-color;
}
</style>
