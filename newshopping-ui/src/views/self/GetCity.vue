<template>
  <div>
    <van-nav-bar
      left-arrow
      title="修改地区"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-index-bar>
      <van-index-anchor v-for="item in cityList" :index="item.letter" :key="item.letter">
        {{item.letter}}
        <van-cell v-for="i in item.detail" :title="i.name" :key="i.code" @click="selectCity(i)" />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { IndexBar, IndexAnchor, Cell, CellGroup, NavBar } from 'vant'
import { back } from '../../shared/util'
import { getCitys } from '../../api/area'
export default {
  components: {
    [NavBar.name]: NavBar,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      cityList: []
    }
  },
  methods: {
    ...mapActions([ 'updateUserInfo' ]),
    back,
    async getCityList () {
      const { success, value } = await getCitys()
      if (success) {
        this.cityList = JSON.parse(value).places || []
        console.log('city', this.cityList)
      }
    },
    async selectCity (city) {
      const { code, name } = city
      const info = { area: name }
      await this.updateUserInfo(info)
      console.log(name, code)
      this.back()
    }
  },
  mounted () {
    this.getCityList()
  }
}
</script>
