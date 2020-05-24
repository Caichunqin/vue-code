<template>
  <div class="set-IDcard">
    <van-nav-bar
      left-arrow
      title="企业认证"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-notice-bar
      v-if="!!noticeBarText"
      :text="noticeBarText">
    </van-notice-bar>
    <van-cell-group>
      <van-field
        v-model.trim="form.companyName"
        type="text"
        border
        label="公司名称"
        maxlength="30"
        clearable
        :disabled="!canEdit"
        label-class="label-company"
        placeholder="公司中文名称">
      </van-field>
      <van-field
        v-model.trim="form.companyEmail"
        type="text"
        border
        label="公司邮箱"
        maxlength="30"
        clearable
        :disabled="!canEdit"
        label-class="label-company"
        placeholder="公司邮箱">
      </van-field>
      <van-field
        v-model.trim="form.legalName"
        type="text"
        border
        label="法人姓名"
        maxlength="6"
        clearable
        :disabled="!canEdit"
        label-class="label-company"
        placeholder="法人姓名">
      </van-field>
      <van-field
        v-model.trim="form.phone"
        type="text"
        border
        label="办公电话"
        maxlength="13"
        clearable
        :disabled="!canEdit"
        label-class="label-company"
        placeholder="如：023-1234567">
      </van-field>
      <van-field
        v-model.trim="form.socialCode"
        type="text"
        border
        label="统一社会信用代码"
        maxlength="18"
        :disabled="!canEdit"
        label-class="label-company"
        clearable
        placeholder="统一社会信用代码">
      </van-field>
      <van-cell
        title="营业执照附件"
        :center="true"
        title-class="label-company"
        value-class="uploader flex_row j_start"
        class="uploader_box">
        <template slot="default">
          <van-uploader
            :disabled="!canEdit"
            preview-image
            v-model="file"
            :after-read="afterRead"
            @delete="deleteFile"
            :max-count="1"
            class="c-p">
            <van-image
              v-if="form.licence"
              width="80"
              height="80"
              fit="cover"
              :src="downloadFile(form.licence)"
            />
          </van-uploader>
        </template>
      </van-cell>
      <div class="submit" v-if="canEdit">
        <van-button
          type="info"
          size="large"
          :disabled="!canSubmit || isLoading"
          :loading="isLoading"
          loading-text="上传中"
          @click="submit">提交
        </van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { NavBar, CellGroup, Field, Button, Uploader, Cell, Image, NoticeBar } from 'vant'
import { back } from '../../shared/util'
import { uploadFile, downloadFile } from '../../api/upload'
import { submitCompanyAuth, companyDetail } from '../../api/auth'
import { isChinessName, isEmail, isSocialCreditCode } from '../../shared/validate'

export default {
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [NoticeBar.name]: NoticeBar
  },
  data () {
    return {
      name: '',
      code: '',
      // 审核状态 0-待审核 1-审核通过 2-审核未通过 -1-未提交审核信息
      authStatus: '',
      file: [],
      form: {
        companyName: '', // 公司名称
        companyEmail: '', // 公司邮箱
        legalName: '', // 法人姓名
        licence: '', // 营业执照
        phone: '', // 办公电话
        socialCode: '' // 统一社会信用代码
      },
      detail: {},
      isLoading: false
    }
  },
  computed: {
    canSubmit () {
      const { companyName, companyEmail, legalName, licence, phone, socialCode } = this.form
      return !!companyName &&
        isEmail(companyEmail) &&
        isChinessName(legalName) &&
        !!licence &&
        !!phone &&
        isSocialCreditCode(socialCode)
    },
    canEdit () {
      const canEditAuthStatus = [2, -1]
      return canEditAuthStatus.includes(this.authStatus)
    },
    noticeBarText () {
      if (this.authStatus === 0) return '认证中，请等待'
      if (this.authStatus === 2) return '认证未通过，你可以编辑后重新提交'
      return ''
    }
  },
  methods: {
    ...mapMutations([ 'updateUserInfo' ]),
    back,
    downloadFile,
    async afterRead (data) {
      const { success, value, errorMessage } = await uploadFile(data.file) || {}
      if (success) {
        this.form.licence = value
      } else {
        this.$notify(errorMessage || '文件上传失败')
      }
    },
    deleteFile () {
      this.form.licence = ''
    },
    async submit () {
      this.isLoading = true
      let data = { ...this.form }
      if (this.detail.hasOwnProperty('id')) data.id = this.detail.id
      const { success, errorMessage } = await submitCompanyAuth(data) || {}
      setTimeout(() => { this.isLoading = false }, 300)
      if (success) {
        this.$notify('认证信息已提交')
        this.updateUserInfo({ companyAuth: 0 })
        back()
      } else {
        this.$notify(errorMessage || '提交认证信息失败')
      }
    }
  },
  async mounted () {
    const { value = [] } = await companyDetail() || {}
    this.detail = value[0] || {}
    // 赋初值
    Object.keys(this.form).forEach(key => {
      if (this.detail.hasOwnProperty(key)) {
        this.form[key] = this.detail[key]
      }
    })
    this.authStatus = 'authStatus' in this.detail ? this.detail.authStatus : -1
    this.updateUserInfo({ companyAuth: this.authStatus })
  }
}
</script>
<style lang="scss">
@import '../../style/self/index';
</style>
