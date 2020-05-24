<template>
  <div class="pdf-viewer" v-show="visible">
    <van-nav-bar
      left-arrow
      left-text="返回"
      title="PDF预览"
      @click-left="back"
    />
    <iframe :src="src"></iframe>
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    file: {
      type: String,
      required: true
    },
    visible: Boolean
  },
  computed: {
    src () {
      const basePath = 'http://39.100.38.17:3000/pdf-reader/web/viewer.html'
      return `${basePath}?file=${encodeURIComponent(this.file)}`
    }
  },
  methods: {
    back () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.pdf-viewer {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: #fff;
  iframe {
    flex: 1;
    border: 0;
  }
}
</style>
