<template>
  <div class="p-store-goodslist">
    <van-tree-select
      class="comp-companySortList"
      :items="categorys"
      @click-nav="clickNav"
      height="calc(80vh - 90px)"
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
  </div>
</template>
<script>
import { TreeSelect, List, Card, Icon, Button, Image, Sidebar, SidebarItem, Tag } from 'vant'
import { downloadFile } from '../../api/upload'
import { getAllCategory } from '../../api/category'
import { queryCompanyGoods } from '../../api/companyGoods'

export default {
  components: {
    [TreeSelect.name]: TreeSelect,
    [List.name]: List,
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Image.name]: Image,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Tag.name]: Tag

  },
  data () {
    return {
      companyId: '',
      activeKey: 0,
      categorys: [],
      goodsLists: [],
      mainActiveIndex: 0,
      items: [],
      list: []
    }
  },
  computed: {
    mainActiveItem () {
      return this.categorys[this.mainActiveIndex]
    }
  },
  async mounted () {
    this.companyId = this.$route.query.companyId || ''
    await this.getSort()
  },
  methods: {
    downloadFile,
    async getSort () {
      const { success, value, errorMessage } = await getAllCategory(this.companyId)
      if (success) {
        this.categorys = (value || []).map(i => ({ id: i.id, text: i.name, children: [] }))
        if (this.categorys.length) this.clickNav(0)
      } else {
        this.$notify(errorMessage || '获取分类失败')
      }
    },
    async clickNav (index) {
      const categoryId = this.categorys[index].id
      this.mainActiveIndex = index
      if (this.categorys[index].children.length) return

      const companyId = this.$route.query?.companyId || ''
      const { list = [] } = await queryCompanyGoods(companyId, categoryId, 1000, 1)
      if (list.length) {
        this.$set(this.categorys[index], 'children', list)
      }
    },
    clickItem (item, index) {
      console.log(item, index)
      if (item.shelfStatus === 0) {
        return this.$notify('亲，该商品已下线')
      }
      this.$router.push({
        path: '/productDetail',
        query: { id: item.id }
      })
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
<style lang="scss" scoped>
.p-store-goodslist {
  .van-card {
    background: none;
  }
}
</style>
