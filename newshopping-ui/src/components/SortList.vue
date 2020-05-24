<template>
  <div>
    <van-tree-select
      :items="items"
      :height='clientHeight'
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onNavClick"
      class="list"
   />
    <div class="childBox">
      <ul class="childrenList">
        <li span="8" v-for="(item, index) in childrenList"
        :key="index" class="childrenItem" @click="handleItemClick(index, item)">
          <img src="../assets/logo.png" alt="图片" class="sortIcon">
          <p class="sortName" :class="{'active': index==currentIndex}">{{item.text}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { TreeSelect } from 'vant'
import { getSortList } from '../api/sort'
import { getNodePathFromTree } from '../shared/treeUtil'

export default {
  components: {
    [TreeSelect.name]: TreeSelect
  },
  props: {
    value: [String, Number]
  },
  data () {
    return {
      items: [],
      mainActiveIndex: 0,
      level: '2',
      busActiveId: '',
      clientHeight: 500,
      childrenList: [],
      list: [],
      currentIndex: -1
    }
  },
  computed: {
    activeId: {
      get () {
        return this.busActiveId
      },
      set (v) {
        let path = []
        let item = {}
        path = getNodePathFromTree(v, this.items)
        item = path[1]
        if (path.length === 0) {
          path = getNodePathFromTree(v, this.childrenList)
          item = path[0]
        }
        this.busActiveId = v
        this.$emit('input', v)
        this.$emit('change', v, item, path)
      }
    }
  },
  watch: {
    value (v) {
      this.init()
    }
  },
  async created () {
    await this.getSort()
    this.init()
  },
  mounted () {
    this.clientHeight = document.documentElement.clientHeight - 105
  },
  methods: {
    async getSort () {
      const { success, value, errorMessage } = await getSortList(this.level)
      if (success) {
        this.list = JSON.parse(JSON.stringify(value))
        let arr = this.list[0].childrenList
        this.childrenList = this.parseValue(arr)
        this.items = this.parseValue(value)
      } else {
        this.$notify(errorMessage)
      }
    },
    parseValue (source = []) {
      return source.map(item => {
        const { sortName, level, id } = item
        let child = item.childrenList || []
        let children = []
        if (level < 2) {
          children = this.parseValue(children) || []
        }
        const disabled = !(child.length > 0)
        return {
          id,
          children,
          level,
          text: sortName,
          disabled
        }
      })
    },
    onNavClick (index) {
      this.mainActiveIndex = index
      this.currentIndex = -1
      let arr = this.list[index].childrenList
      this.childrenList = this.parseValue(arr)
    },
    handleItemClick (index, data) {
      this.currentIndex = index
      this.activeId = data.id
      this.$emit('change', data.id, data)
    },
    init () {
      const path = getNodePathFromTree(this.value, this.items)
      if (!path.length) return
      const mainActiveItem = path[0]
      this.mainActiveIndex = this.items.findIndex(i => mainActiveItem.id === i.id)
      this.busActiveId = this.value
    }
  }
}
</script>
<style lang="scss" scoped>
.childBox {
  position: absolute;
  top: 55px;
  right: 0;
  width: 66%;
  z-index: 999;
  .childrenList {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .childrenItem{
      width: 33.3%;
      text-align: center;
    }
    .sortIcon {
      margin-top: 10px;
      height: 20px;
      width: 60px;
    }
    .sortName {
      margin: 5px;
      &.active {
        color: red;
      }
    }
  }
}
</style>
