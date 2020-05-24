<template>
    <div class="commentList">
<van-list
  v-model="loading"
  :finished="finished"
  @load="onLoad"
  class="list"
  finished-text="没有更多了"
>
  <van-cell
    v-for="item in commentList"
    :key="item.comment"
    :title="item.comment" :to="{path:'commentDetail',query:{id:item.id}}">
     <template slot="label">
        <span class="custom-title">全部{{item.replyNum}}个回答</span>
    </template>
   </van-cell>
</van-list>
  <div class="inputBox">
      <van-field
      @focus="show=true"
      placeholder="向买家提问?" />
      <van-button round type="warning" size="small">去提问</van-button>
  </div>
  <van-overlay :show="show" @click="show = false">
    <van-sticky>
      <div class="inputBox" @click.stop>
      <van-field
      v-model="comment"
      @input="changeInput"
      placeholder="向买家提问?" />
      <van-button round type="warning" @click="saveCommentInfo" size="small">去提问</van-button>
  </div>
    </van-sticky>
  </van-overlay>
</div>
</template>
<script>
import { List, cell, Field, Overlay, Sticky, Button } from 'vant'
import { getCommentList, saveComment } from '../../api/comment'
export default {
  components: {
    [List.name]: List,
    [cell.name]: cell,
    [Field.name]: Field,
    [Overlay.name]: Overlay,
    [Sticky.name]: Sticky,
    [Button.name]: Button
  },
  data () {
    return {
      commentList: [],
      goodsId: '',
      loading: false,
      finished: false,
      comment: '',
      show: false
    }
  },
  created () {
    this.goodsId = this.$route.query.id
    // this.onLoad()
  },
  methods: {
    async onLoad () {
      let params = {
        goodsId: this.goodsId,
        pageSize: 20,
        pageNo: 1
      }
      this.loading = false
      const { success, errorMessage, value } = await getCommentList(params)
      if (success) {
        this.finished = true
        this.commentList = value.list
        console.log(this.commentList)
      } else {
        this.$notify(errorMessage)
      }
    },
    changeInput () {

    },
    async saveCommentInfo () {
      let params = {
        comment: this.comment,
        goodsId: this.goodsId
      }
      const { success, errorMessage, value } = await saveComment(params)
      if (success) {
        console.log(value)
        this.onLoad()
        this.show = false
      } else {
        this.$notify(errorMessage)
      }
    }
  }
}
</script>
<style lang="scss">
 .commentList {
    height: 100%;
    .list {
      height: calc(100% - 60px);
    }
    .inputBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      padding: 0 20px;
      border-top:1px solid #f9f9f9;
      background: #fff;
      .van-cell {
        border: 1px solid #ebedf0;
        border-radius: 20px;
        padding: 4px 30px;
        margin-right: 10px;
      }
      .van-cell:not(:last-child)::after {
        border-bottom: none;
      }
    }
 }
</style>
