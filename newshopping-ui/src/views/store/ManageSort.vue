<template>
  <div class="">
    <van-nav-bar
      left-arrow
      title="管理分类"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <draggable v-model="allCategory" ghost-class="ghost" handle=".icon-sort" class="draggable">
      <transition-group type="transition" name="flip-list">
        <div
          class="van-cell c-ai-c"
          v-for="(i, index) in allCategory"
          :key="i.id">
          <div class="van-cell__title" @click="editSort(1, i)">
            <span>{{ i.name }}</span>
          </div>
          <van-icon name="close" class="c-mr c-c-gray-dark" @click.stop="delItem(i, index)" />
          <i class="van-icon van-cell__right-icon icon icon-sort" @click.stop></i>
        </div>
      </transition-group>
    </draggable>

    <div class="fixed c-p c-b-t">
      <van-button
        size="large"
        type="info"
        @click="editSort(0)">新建分类
      </van-button>
    </div>

    <van-dialog
      v-model="dialog.show"
      :title="dialog.title"
      show-cancel-button
      @confirm="confirmSortName">
      <van-cell>
        <van-field
          v-model="sortName"
          placeholder="请输入分类名"
        />
      </van-cell>
    </van-dialog>
  </div>
</template>

<script>
import { NavBar, Field, Button, Cell, Dialog, Icon } from 'vant'
import draggable from 'vuedraggable'
import { back } from '../../shared/util'
import { getAllCategory, deleteCategory, addCategory, updateCategory } from '../../api/category'

export default {
  components: {
    draggable,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon
  },
  data () {
    return {
      allCategory: [],
      tempItem: {},
      dialog: {
        type: 0, // 0-新建分类 1-修改分类名
        show: false,
        title: '新建分类'
      },
      sortName: ''
    }
  },
  methods: {
    back,
    editSort (type, item) {
      this.dialog = {
        type,
        show: true,
        title: type === 0 ? '新建分类' : '修改分类'
      }
      this.sortName = ''
      if (item) this.tempItem = item
    },
    async delItem (item, index) {
      await this.$dialog.confirm({ message: '确认删除该分类？' })
      const { success, errorMessage } = await deleteCategory(item.id) || {}
      if (success) {
        this.allCategory.splice(index, 1)
      } else {
        this.$notify(errorMessage || '删除分类失败')
      }
    },
    async getInfo () {
      const { value = [] } = await getAllCategory() || {}
      this.allCategory = value
    },
    async confirmSortName () {
      if (!this.sortName || this.allCategory.some(i => i.name === this.sortName)) return
      const isUpdate = this.dialog.type === 1
      const { success, errorMessage } = isUpdate
        ? await updateCategory(this.tempItem.id, this.sortName)
        : await addCategory(this.sortName)
      if (success) {
        this.getInfo()
      } else {
        this.$notify(errorMessage || `${isUpdate ? '更新' : '新增'}失败`)
      }
    }
  },
  async mounted () {
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.draggable {
  padding-bottom: 81px;
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
</style>
