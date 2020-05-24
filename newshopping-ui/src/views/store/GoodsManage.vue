<template>
  <div class="p-goodsManage">
    <van-nav-bar
      left-arrow
      title="商品管理"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-tree-select
      class="comp-companySortList"
      :items="categorys"
      @click-nav="clickNav"
      height="calc(100vh - 127px)"
      :main-active-index.sync="mainActiveIndex">
      <template slot="content" v-if="mainActiveItem">
        <van-card
          v-for="(i, index) in mainActiveItem.children"
          :key="i.id"
          :num="i.counts"
          :price="i.price"
          :desc="i.remark"
          :title="i.goodsName"
          @click="clickItem(i, index)"
          :thumb="i.goodsPictures[0] ? downloadFile(i.goodsPictures[0].address): ''">
          <div slot="tags">
            <van-tag plain v-if="i.shelfStatus === 0">已下架</van-tag>
          </div>
        </van-card>
      </template>
    </van-tree-select>
    <div class="fixed c-p c-b-t">
      <van-button size="large" type="info" to="/manageSort" class="c-mr">管理分类</van-button>
      <van-button size="large" type="info" to="/publish">发布商品</van-button>
    </div>
    <van-action-sheet
      :round="false"
      close-on-click-action
      v-model="actionSheet.show"
      :actions="actionSheet.actions"
      @select="onSelect">
    </van-action-sheet>
    <van-dialog
      v-model="goodsCount.show"
      title="修改库存"
      @confirm="confirmGoodsCount"
      show-cancel-button>
      <van-field v-model="goodsCount.count" type="number" placeholder="请输入库存数量"/>
    </van-dialog>
  </div>
</template>

<script>
import {
  NavBar, Image, Grid, GridItem, Icon, Sticky,
  Button, ActionSheet, TreeSelect, Card, Tag,
  Dialog, Field
} from 'vant'
import { back } from '../../shared/util'
import { queryCompanyGoods, setGoodsSelfStatus, setGoodsCount } from '../../api/companyGoods'
import { getAllCategory } from '../../api/category'
import { downloadFile } from '../../api/upload'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Image.name]: Image,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Icon.name]: Icon,
    [Sticky.name]: Sticky,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [TreeSelect.name]: TreeSelect,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Dialog.name]: Dialog,
    [Field.name]: Field
  },
  data () {
    return {
      categorys: [],
      mainActiveIndex: 0,
      subActiveIndex: 0,
      actionSheet: {
        show: false,
        actions: []
      },
      goodsCount: {
        show: false,
        count: 0
      }
    }
  },
  computed: {
    mainActiveItem () {
      return this.categorys[this.mainActiveIndex]
    },
    subActiveItem () {
      const children = this.mainActiveItem.children || []
      return children.length ? children[this.subActiveIndex] : {}
    },
    categoryId () {
      return this.mainActiveItem.id || ''
    },
    goodsId () {
      return this.subActiveItem.id || ''
    }
  },
  methods: {
    back,
    downloadFile,
    async clickNav (index) {
      const categoryId = this.categorys[index].id
      this.mainActiveIndex = index
      this.$emit('selectNav', categoryId, index)
      if (this.categorys[index].children.length) return

      const companyId = this.$store.state?.userInfo?.companyId || ''
      const { list = [] } = await queryCompanyGoods(companyId, categoryId, 1000, 1)
      if (list.length) {
        this.$set(this.categorys[index], 'children', list)
      }
    },
    clickItem (item, index) {
      this.subActiveIndex = index
      this.actionSheet.show = true
      this.actionSheet.actions = [
        { name: '修改库存' },
        { name: '修改详情' },
        { name: `${item.shelfStatus === 0 ? '上架' : '下架'}商品` }
      ]
    },
    async onSelect ({ name }) {
      const { shelfStatus, counts, id } = this.subActiveItem
      if (name === '下架商品' || name === '上架商品') {
        const status = shelfStatus === 0 ? 1 : 0
        const statusName = status === 1 ? '上架' : '下架'
        await this.$dialog.confirm({ message: `确认${statusName}此商品？` })
        await setGoodsSelfStatus(this.goodsId, this.categoryId, status)
        this.$set(this.subActiveItem, 'shelfStatus', status)
        this.$notify(`${statusName}成功`)
      }
      if (name === '修改库存') {
        this.goodsCount = {
          show: true,
          count: counts || ''
        }
      }
      if (name === '修改详情') {
        this.$router.push({
          path: '/publish',
          query: { id }
        })
      }
    },
    async confirmGoodsCount () {
      if (!/\d+/.test(this.goodsCount.count)) return
      await setGoodsCount(this.goodsId, this.categoryId, this.goodsCount.count)
      this.$notify('修改库存成功')
      this.goodsCount.show = false
      this.$set(this.subActiveItem, 'counts', this.goodsCount.count)
    },
    async init () {
      const { success, value, errorMessage } = await getAllCategory()
      if (success) {
        this.categorys = (value || []).map(i => ({ id: i.id, text: i.name, children: [] }))
        if (this.categorys.length) this.clickNav(0)
      } else {
        this.$notify(errorMessage || '获取分类失败')
      }
    }
  },
  async mounted () {
    this.init()
  }
}
</script>

<style lang="scss">
.p-goodsManage {
  .footer-btn {
    width: 100%;
    padding: 2px 0px;
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: space-around;
  }
  .fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    background: #fff;
  }
  .comp-companySortList {
    .van-card {
      background: none;
    }
  }
}
</style>
