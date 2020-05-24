<template>
  <div class="p-publish">
    <van-nav-bar
      left-arrow
      :title="title"
      left-text="取消"
      @click-left="back">
    </van-nav-bar>
    <section class="gallery mb">
      <van-uploader
        v-model="goodsPictures"
        preview-image
        multiple
        :max-count="10">
      </van-uploader>
    </section>

    <van-cell-group class="mb">
      <van-field
        v-model="form.goodsName"
        maxlength="30"
        clearable
        placeholder="宝贝标题 品牌型号">
      </van-field>
      <van-field
        v-model="form.remark"
        clearable
        maxlength="200"
        type="textarea"
        autosize
        placeholder="在这里详细描述一下宝贝的信息">
      </van-field>
    </van-cell-group>

    <van-cell-group>
      <van-cell
        title="分类"
        :value="sortText"
        @click="popup(0)"
        is-link>
      </van-cell>
      <van-cell
        title="自定义分类"
        :value="categoryText"
        @click="popup(1)"
        is-link>
      </van-cell>
      <van-cell
        @click="visibleKeyboardPrice = true"
        title="价格"
        :value="form.price"
        is-link>
      </van-cell>
      <van-cell
        @click="visibleKeyboardReserve = true"
        title="预付款"
        :value="form.reserve"
        is-link>
      </van-cell>
    </van-cell-group>

    <van-cell>
      <van-button
        class="c-w-100"
        :disabled="!canSubmit || isLoading"
        @click="submit"
        :loading="isLoading"
        :loading-text="goodsId ? '编辑中' : '发布中'"
        type="info">{{ goodsId ? '编辑' : '发布' }}
      </van-button>
    </van-cell>

    <van-number-keyboard
      v-model="form.price"
      @blur="visibleKeyboardPrice = false"
      :show="visibleKeyboardPrice">
    </van-number-keyboard>
    <van-number-keyboard
      v-model="form.reserve"
      @blur="visibleKeyboardReserve = false"
      :show="visibleKeyboardReserve">
    </van-number-keyboard>

    <van-popup
      v-model="showPopup"
      :class="{ 'full-size-popup': popupType === 0 }"
      :position="popupType === 0 ? 'top' : 'bottom'"
      transition="van-slide-up">
      <van-nav-bar
        v-if="popupType === 0"
        left-arrow
        title="选择分类"
        left-text="返回"
        @click-left="showPopup = false">
      </van-nav-bar>
      <sort-list
        v-if="popupType === 0"
        v-model="form.sortId"
        @change="changeSort">
      </sort-list>
      <van-picker
        v-if="popupType === 1"
        show-toolbar
        title="选择自定义分类"
        :columns="categoryPopupList"
        @cancel="showPopup = false"
        @confirm="confirmCategory">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import { NavBar, Uploader, CellGroup, Field, Cell, NumberKeyboard, Button, Popup, Picker } from 'vant'
import { back } from '../shared/util'
import { getNodeFromTree } from '../shared/treeUtil'
import { uploadFile } from '../api/upload'
import { addGoods, queryGoodsDetail } from '../api/goods'
import { getAllCategory } from '../api/category'
import { getSortList } from '../api/sort'

const downloadPicPath = '/authCenter/upload/downloadPic?linkKey='

export default {
  components: {
    [NavBar.name]: NavBar,
    [Uploader.name]: Uploader,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [NumberKeyboard.name]: NumberKeyboard,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    SortList: () => import('@/components/SortList.vue')
  },
  data () {
    return {
      title: '发布宝贝',
      form: {
        goodsName: '',
        goodsPictures: [],
        price: '',
        reserve: '',
        remark: '',
        sortId: '',
        companyCategoryId: ''
      },
      showPopup: false,
      popupType: 0, // 弹窗类型 0-选择分类 1-选择自定义分类
      isLoading: false,
      visibleKeyboardPrice: false,
      visibleKeyboardReserve: false,
      sortText: '',
      categoryText: '',
      goodsPictures: [],
      categorys: [],
      goodsId: '',
      sorts: [],
      goodsInfo: {}
    }
  },
  computed: {
    canSubmit () {
      const { goodsName, price, remark, sortId, companyCategoryId } = this.form
      return this.goodsPictures.length &&
        goodsName &&
        price &&
        remark &&
        sortId &&
        companyCategoryId
    },
    categoryPopupList () {
      return this.categorys.map(i => i.name)
    }
  },
  methods: {
    back,
    async submit () {
      this.isLoading = true
      const action = this.form.id ? '商品编辑' : '商品发布'
      const defaultFile = this.goodsPictures
        .filter(i => !i.file)
        .map(i => i.url.replace(downloadPicPath, ''))
      const files = await Promise.all(this.goodsPictures.filter(i => i.file).map(i => uploadFile(i.file)))
      if (!files.every(i => i.success)) {
        return this.$notify('文件上传失败,请稍候再试')
      }
      this.form.goodsPictures = [...defaultFile, ...files.map(i => i.value)].map(i => ({ address: i }))
      if (this.goodsId) this.form.id = this.goodsId

      const { success, errorMessage } = await addGoods(this.form) || {}
      if (success) {
        this.$notify(`${action}成功`)
        this.back()
      } else {
        this.$$notify(errorMessage || `${action}失败`)
      }
      setTimeout(() => { this.isLoading = false }, 300)
    },
    async popup (type) {
      if (type === 1 && !this.categorys.length) {
        await this.getCategoryInfo()
      }
      this.showPopup = true
      this.popupType = type
    },
    changeSort (value, item) {
      this.sortText = item.text
      this.showPopup = false
      this.popupType = 0
    },
    confirmCategory (value, index) {
      this.showPopup = false
      this.categoryText = value
      this.form.companyCategoryId = this.categorys[index].id
    },
    async getGoodsInfo () {
      const { success, value = {}, errorMessage } = await queryGoodsDetail(this.goodsId)
      if (success) {
        console.log(value)
        this.goodsInfo = value
        const { sortId, companyCategoryId } = value
        // 赋初值
        Object.keys(this.form).forEach(key => { this.form[key] = value[key] || this.form[key] })
        // 部分字段特殊处理
        this.goodsPictures = (this.form.goodsPictures || []).map(i => {
          return { url: downloadPicPath + i.address, isImage: true }
        })
        const sortItem = getNodeFromTree(sortId, this.sorts, 'id', 'childrenList') || {}
        this.sortText = sortItem.sortName || ''
        const categoryItem = this.categorys.find(i => i.id === companyCategoryId) || {}
        this.categoryText = categoryItem.name || ''
      } else {
        this.$notify(errorMessage || '获取商品详情失败')
      }
    },
    async getSortInfo () {
      const { success, value, errorMessage } = await getSortList(2)
      if (success) {
        this.sorts = value || []
      } else {
        this.$notify(errorMessage || '获取商品分类失败')
      }
    },
    async getCategoryInfo () {
      const { value, success, errorMessage } = await getAllCategory()
      if (success) {
        this.categorys = value || []
      } else {
        this.$notify(errorMessage || '获取自定义分类失败')
      }
    }
  },
  async mounted () {
    const { id } = this.$route.query
    this.goodsId = id || ''
    if (this.goodsId) {
      this.title = '编辑宝贝'
      await Promise.all([ this.getSortInfo(), this.getCategoryInfo() ])
      await this.getGoodsInfo()
    }
  }
}
</script>

<style lang="scss">
.p-publish {
  min-height: 100vh;
  background: $background-color;
  .gallery {
    padding: $edge;
    background: #fff;
  }
  .mb {
    margin-bottom: 15px;
  }
  .full-size-popup {
    width: 100vw;
    height: 100vh;
  }
}
</style>
