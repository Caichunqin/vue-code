<template>
    <div class="commentList">
      <p class="title">
        <van-tag type="danger">问</van-tag>
        {{detail.comment}}</p>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      class="list"
    >
      <!-- <van-cell
        v-for="item in commentList"
        :key="item.comment"
        :title="item.comment">
        <template slot="label">
            <span class="custom-title">全部{{item.replyNum}}个回答</span>
        </template>
      </van-cell> -->
      <van-panel v-for="item in commentList"
        :key="item.comment" :title="item.creator" :desc="item.created">
        <div class="content">{{item.comment}}</div>
      </van-panel>
    </van-list>
      <div class="inputBox">
          <van-field
          @focus="show=true"
          placeholder="随机用户回答" />
          <van-button round type="warning" size="small">发送</van-button>
      </div>
      <van-overlay :show="show" @click="show = false">
        <van-sticky>
          <div class="inputBox" @click.stop>
          <van-field
          v-model="comment"
          placeholder="随机用户回答" />
          <van-button round type="warning" @click="saveCommentInfo" size="small">发送</van-button>
      </div>
    </van-sticky>
  </van-overlay>
</div>
</template>
<script>
import { List, cell, Field, Overlay, Sticky, Button, Tag, Panel } from 'vant'
import { getChildList, saveComment, getCommentDetail } from '../../api/comment'
export default {
  components: {
    [List.name]: List,
    [cell.name]: cell,
    [Field.name]: Field,
    [Overlay.name]: Overlay,
    [Sticky.name]: Sticky,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Panel.name]: Panel
  },
  data () {
    return {
      commentList: [],
      goodsId: '',
      loading: false,
      finished: false,
      comment: '',
      show: false,
      id: '',
      detail: {}
    }
  },
  created () {
    console.log(this.$route.query)
    this.id = this.$route.query.id
    // this.onLoad()
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const { success, errorMessage, value } = await getCommentDetail(this.id)
      if (success) {
        console.log(value)
        this.detail = value
      } else {
        this.$notify(errorMessage)
      }
    },
    async onLoad () {
      let params = {
        id: this.id,
        pageSize: 20,
        pageNo: 1
      }
      this.loading = false
      const { success, errorMessage, value } = await getChildList(params)
      if (success) {
        this.finished = true
        this.commentList = value.list
      } else {
        this.$notify(errorMessage)
      }
    },
    async saveCommentInfo () {
      console.log(this.id)
      let params = {
        comment: this.comment,
        goodsId: this.detail.goodsId,
        parentId: this.id
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
    overflow: hidden;
    .title {
      margin: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        margin-right: 5px;
      }
    }
    .list {
      height: calc(100% - 120px);
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
    .content {
      margin: 0 20px;
      padding: 10px 0 30px;
    }
 }
</style>
