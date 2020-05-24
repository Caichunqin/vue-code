<template>
  <div class="p-contract">
    <van-nav-bar
      left-arrow
      title="填写合同"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-cell-group>
      <van-field
        clearable
        v-model="form.contractName"
        label="合同名称">
      </van-field>
    </van-cell-group>
    <van-cell-group title="乙方">
      <van-field
        clearable
        v-model="form.companyNamePartB"
        label="企业名称">
      </van-field>
      <van-field
        clearable
        v-model="form.signUserNamePartB"
        label="签署人员">
      </van-field>
      <van-field
        clearable
        v-model="form.idCartPartB"
        label="证件号码">
      </van-field>
      <van-field
        clearable
        v-model="form.mobilePartB"
        maxlength="11"
        label="联系电话">
      </van-field>
    </van-cell-group>
    <van-cell-group title="甲方">
      <van-field
        clearable
        v-model="form.companyNamePartA"
        label="公司名称">
      </van-field>
      <van-field
        clearable
        v-model="form.signUserNamePartA"
        label="签署人员">
      </van-field>
      <van-field
        clearable
        v-model="form.mobilePartA"
        maxlength="11"
        label="联系电话">
      </van-field>
      <van-field
        clearable
        v-model="form.goodsAddressPartA"
        label="收货地址">
      </van-field>
    </van-cell-group>
    <van-cell-group title="合同内容" class="c-mb" v-if="false">
      <van-field
        clearable
        label="开始时间">
      </van-field>
      <van-field
        clearable
        label="结束时间">
      </van-field>
      <van-field
        clearable
        label="付款方式">
      </van-field>
      <van-field
        clearable
        label="分期规则">
      </van-field>
    </van-cell-group>
    <van-cell>
      <van-button
        class="c-w-100"
        type="primary"
        @click="toSignature">签名
      </van-button>
    </van-cell>
    <van-cell>
      <van-button
        class="c-w-100"
        :disabled="!form.file"
        @click="preview"
        type="primary">预览合同
      </van-button>
    </van-cell>

    <div class="mask" v-if="showOverlay">
      <signature @update="updateSignature"></signature>
    </div>

    <pdf-viewer
      :visible.sync="showPdf"
      :file="pdfFile">
    </pdf-viewer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { NavBar, CellGroup, Cell, Button, Field } from 'vant'
import { back } from '../../shared/util'
import { sign, getOrderContractUrl } from '../../api/contract'
const form = {
  contractName: '',
  companyNamePartA: '',
  goodsAddressPartA: '',
  signUserNamePartA: '',
  mobilePartA: '',
  companyNamePartB: '',
  signUserNamePartB: '',
  idCartPartB: '',
  mobilePartB: '',
  file: '',
  orderNo: '110'
}

export default {
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    signature: () => import('../../components/Signature.vue'),
    'pdf-viewer': () => import('../../components/PdfViewer.vue')
  },
  data () {
    return {
      form: { ...form },
      showOverlay: false,
      showPdf: false,
      pdfFile: '',
      tempOverflowStyle: ''
    }
  },
  computed: {
    ...mapState([ 'token' ])
  },
  methods: {
    back,
    async updateSignature (imgBase64) {
      this.closeOverlay()
      if (imgBase64) {
        this.form.file = imgBase64
      }
    },
    async preview () {
      const { success } = await sign(this.form)
      if (success) {
        this.showPdf = true
        this.pdfFile = getOrderContractUrl('110')
      }
    },
    closeOverlay () {
      this.showOverlay = false
      document.body.style.overflow = this.tempOverflowStyle
    },
    toSignature () {
      const style = document.body.style
      this.showOverlay = true
      this.tempOverflowStyle = style.overflow

      // 锁定背景，防止滚动
      style.overflow = 'hidden'
    }
  }
}
</script>

<style lang="scss">
.p-contract {
  background: $background-color;
  min-height: 100vh;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    background: #fff;
    width: 100vw;
    height: 100vh;
  }
}
</style>
