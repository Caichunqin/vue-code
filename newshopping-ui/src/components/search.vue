<template>
  <van-search
    v-model="keyValue"
    placeholder="请输入搜索关键词"
    show-action
    clearable
    @search="onSearch"
    @cancel="onCancel">
    <div slot="action" @click="onSearch" v-if="!isShow">搜索</div>
    <div slot="action" @click="onCancel" v-if="isShow">取消</div>
  </van-search>
</template>
<script>
import { Search } from 'vant'
export default {
  components: {
    [Search.name]: Search
  },
  data () {
    return {
      keyValue: '',
      isShow: false
    }
  },
  methods: {
    onSearch () {
      this.$emit('search', this.keyValue)
      this.isShow = true
      this.keyValue = ''
    },
    onCancel () {
      this.isShow = false
      this.$emit('cancel')
    }
  }
}
</script>
