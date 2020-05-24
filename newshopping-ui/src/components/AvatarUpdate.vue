<template>
  <div class="comp-avatarUpdate" @click="clickHandle">
    <img
      v-if="avatar"
      :src="avatar"
      :style="{ width: width + 'px', height: height + 'px' }"
    />
    <span v-else>{{ placeholder }}</span>
    <input type="file" accept="image/*" ref="file" @change="changeFile" />
  </div>
</template>

<script>
import { downloadFile, uploadFile } from '../api/upload'
export default {
  data () {
    return {
      imgDataUrl: ''
    }
  },
  props: {
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    },
    src: String,
    placeholder: {
      type: String,
      default: '未设置'
    }
  },
  computed: {
    avatar () {
      const path = '/authCenter/upload/downloadPic?linkKey='
      if (this.imgDataUrl) return this.imgDataUrl
      if (this.src) {
        return this.src.startsWith(path) ? this.src : downloadFile(this.src)
      }
      return ''
    }
  },
  methods: {
    clickHandle () {
      const file = this.$refs.file
      file.value = ''
      file.click()
    },
    async changeFile (e) {
      const file = e.target.files
      if (!file[0]) return
      const fileReader = new FileReader()
      fileReader.onload = () => { this.imgDataUrl = fileReader.result }
      fileReader.readAsDataURL(file[0])
      const { success, value, errorMessage } = await uploadFile(file[0]) || {}
      if (success) {
        this.$emit('update', value)
      } else {
        this.$notify(errorMessage || '文件上传失败')
      }
    }
  }
}
</script>

<style lang="scss">
.comp-avatarUpdate {
  position: relative;
  img {
    object-fit: cover;
    vertical-align: top;
  }
  input {
    position: absolute;
    display: none;
  }
}
</style>
