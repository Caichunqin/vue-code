<template>
  <div class="signature-wrap" ref="wrap">
    <section v-show="orientation === 'landscape'">
      <canvas ref="canvas" class="pad"></canvas>
      <div class="control c-b-t" ref="control">
        <p>请在上方空白处签字</p>
        <div class="btns">
          <van-button type="primary" @click="submit">确定</van-button>
          <van-button @click="clear">重置</van-button>
          <van-button @click="back">返回</van-button>
        </div>
      </div>
    </section>
    <section v-show="orientation !== 'landscape'" class="tip">请将手机横屏</section>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad'
import { Button } from 'vant'

const isSupportOrientation = typeof window.orientation === 'number' &&
  typeof window.onorientationchange === 'object'

export default {
  components: {
    [Button.name]: Button
  },
  data () {
    return {
      orientation: 'portrait',
      signaturePad: null
    }
  },
  methods: {
    getDeviceDirection () {
      const isLandscape = isSupportOrientation
        ? Math.abs(window.orientation) === 90
        : innerWidth > innerHeight
      this.orientation = isLandscape ? 'landscape' : 'portrait'
    },
    initSignature () {
      const canvas = this.$refs.canvas
      this.signaturePad = new SignaturePad(canvas, { backgroundColor: 'rgb(255, 255, 255)' })
    },
    clear () {
      this.signaturePad.clear()
    },
    submit () {
      this.$emit('update', this.signaturePad.toDataURL('image/jpeg'))
    },
    back () {
      this.$emit('update')
    }
  },
  mounted () {
    this.getDeviceDirection()
    addEventListener(
      isSupportOrientation ? 'orientationchange' : 'resize',
      this.getDeviceDirection
    )
    this.$nextTick(() => {
      const wrapWidth = this.$refs.wrap.offsetWidth
      const wrapHeight = this.$refs.wrap.offsetHeight
      const controlHeight = this.$refs.control.offsetHeight
      const width = Math.max(wrapWidth, wrapHeight - controlHeight)
      const height = Math.min(wrapWidth, wrapHeight - controlHeight)
      this.$refs.canvas.width = width
      this.$refs.canvas.height = height
      this.initSignature()
    })
  },
  destroyed () {
    removeEventListener(
      isSupportOrientation ? 'orientationchange' : 'resize',
      this.getDeviceDirection
    )
  }
}
</script>

<style lang="scss">
.signature-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  .pad {
    background: #fff;
  }
  .control {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;
    p {
      flex: 1;
      text-align: center;
      margin: 0;
    }
    .btns {
      > * {
        margin-left: 20px;
      }
    }
  }
  .tip {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: $red;
  }
}
</style>
