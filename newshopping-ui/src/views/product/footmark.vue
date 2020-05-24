<template>
  <div class="list">
    <van-list
      v-model="loading"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="20"
      :error.sync="error"
    >
    <van-steps :active="0" direction="vertical">
      <van-step v-for="(item,index) in list" :key="index">
         <h3>{{item.browsingTime}}</h3>
         <div class="goodsImg">
           <div v-for="(val, ind) in item.goodsEntities" :key="ind" class="item">
              <van-image
                  @click="goProductDetail(val.goodsPictures[0].goodsId)"
                  width="100"
                  height="100"
                  :src="downloadFile(val.goodsPictures[0].address)"
                />
                <p>¥{{val.price}}</p>
           </div>
         </div>
      </van-step>
    </van-steps>
    </van-list>
  </div>
</template>
<script>
import { browHistory } from '../../api/goods'
import { List, Cell, Step, Steps, Image } from 'vant'
import { downloadFile } from '../../api/upload'
export default {
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Image.name]: Image
  },
  data () {
    return {
      isShowProduct: true,
      list: [],
      total: 0,
      pageSize: 10,
      error: false,
      loading: false,
      finished: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    downloadFile,
    async getList () {
      const { success, value, errorMessage } = await browHistory(this.pageSize)
      if (success) {
        this.list = value.list
        this.total = value.total
        this.loading = false
        this.error = true
        this.finished = true
      } else {
        this.error = true
        this.finished = false
        this.$notify(errorMessage)
      }
    },
    goProductDetail (id) {
      this.$router.push({
        path: '/productDetail',
        query: { id }
      })
    },
    onLoad () {
      this.pageSize = this.pageSize + 20
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  height: 100%;
}
.goodsImg {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .item {
    margin-right: 5px;
  }
}
</style>
