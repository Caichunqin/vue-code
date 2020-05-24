<template>
  <div class="set-IDcard">
    <van-nav-bar
      left-arrow
      title="实名认证"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-notice-bar
      v-if="!!noticeBarText"
      :text="noticeBarText">
    </van-notice-bar>
    <van-cell-group>
      <van-field
        v-model.trim="form.userName"
        type="text"
        border
        label="姓名"
        maxlength="6"
        clearable
        :disabled="!canEdit"
        placeholder="中文名称">
      </van-field>
      <van-field
        v-model.trim="form.idCardNo"
        type="text"
        border
        label="身份证号"
        maxlength="18"
        clearable
        :disabled="!canEdit"
        placeholder="身份证号">
      </van-field>
      <van-cell
        title="身份证正面"
        :center="true"
        title-class="ID_card"
        value-class="flex_row j_around">
        <template slot="default">
          <van-uploader
            class="c-p"
            :disabled="!canEdit"
            preview-image
            v-model="idCardFileFront"
            :after-read="v => afterRead(1, v)"
            @delete="deleteFile(1)"
            :max-count="1">
            <van-image
              v-if="form.idCardFront"
              width="80"
              height="80"
              fit="cover"
              :src="downloadFile(form.idCardFront)"
            />
          </van-uploader>
        </template>
      </van-cell>
      <van-cell
        title="身份证反面"
        :center="true"
        title-class="ID_card"
        value-class="uploader flex_row j_around"
        class="uploader_box">
        <template slot="default">
          <van-uploader
            class="c-p"
            :disabled="!canEdit"
            preview-image
            v-model="idCardFileReverse"
            :after-read="v => afterRead(0, v)"
            @delete="deleteFile(0)"
            :max-count="1">
            <van-image
              v-if="form.idCardReverse"
              width="80"
              height="80"
              fit="cover"
              :src="downloadFile(form.idCardReverse)"
            />
          </van-uploader>
        </template>
      </van-cell>
       <!-- <p>请上传本人照片一张，</p> -->
       <van-cell
        title="个人照片"
        :center="true"
        title-class="ID_card"
        value-class="flex_row j_around">
        <template slot="default">
          <van-uploader
            class="c-p"
            :disabled="!canEdit"
            preview-image
            v-model="photoFileFront"
            :after-read="v => afterRead(2, v)"
            @delete="deleteFile(2)"
            :max-count="1">
            <van-image
              v-if="form.photoUrl"
              width="80"
              height="80"
              fit="cover"
              :src="downloadFile(form.photoUrl)"
            />
            <van-icon name="user-o" size="100" v-if="!form.photoUrl"/>
          </van-uploader>
        </template>
      </van-cell>
      <div class="c-p" v-if="canEdit">
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
import { NavBar, CellGroup, Field, Button, Uploader, Cell, Image, NoticeBar, Icon } from 'vant'
import { back } from '../../shared/util'
import { isIDCard, isChinessName } from '../../shared/validate'
import { uploadFile, downloadFile } from '../../api/upload'
import { submitPersonAuth, personDetail } from '../../api/auth'

export default {
  components: {
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [NoticeBar.name]: NoticeBar,
    [Icon.name]: Icon
  },
  data () {
    return {
      mobile: '',
      // 审核状态 0-待审核 1-审核通过 2-审核未通过 -1-未提交审核信息
      authStatus: '',
      idCardFileFront: [],
      idCardFileReverse: [],
      photoFileFront: [],
      form: {
        idCardFront: '', // 身份证正面
        idCardNo: '', // 身份证号
        idCardReverse: '', // 身份证反面
        userName: '', // 真实姓名
        photoUrl: ''
      },
      detail: {},
      isLoading: false
    }
  },
  computed: {
    canSubmit () {
      const { userName, idCardNo, idCardFront, idCardReverse, photoUrl } = this.form
      return isChinessName(userName) &&
        isIDCard(idCardNo) &&
        idCardFront !== '' &&
        idCardReverse !== '' && photoUrl !== ''
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
    async afterRead (type, data) {
      const { success, value, errorMessage } = await uploadFile(data.file) || {}
      if (success) {
        this.form[type === 0 ? 'idCardReverse' : type === 1 ? 'idCardFront' : 'photoUrl'] = value
      } else {
        this.$notify(errorMessage || '文件上传失败')
      }
    },
    deleteFile (type) {
      this.form[type === 0 ? 'idCardReverse' : 'idCardFront'] = ''
    },
    async submit () {
      this.isLoading = true
      let data = { ...this.form }
      if (this.detail.hasOwnProperty('id')) data.id = this.detail.id
      const { success, errorMessage } = await submitPersonAuth(data) || {}
      setTimeout(() => { this.isLoading = false }, 300)
      if (success) {
        this.$notify('认证信息已提交')
        this.updateUserInfo({ personAuth: 0 })
        back()
      } else {
        this.$notify(errorMessage || '提交认证信息失败')
      }
    }
  },
  async mounted () {
    const { value } = await personDetail() || {}
    this.detail = value || {}
    // 赋初值
    Object.keys(this.form).forEach(key => {
      if (this.detail.hasOwnProperty(key)) {
        this.form[key] = this.detail[key]
      }
    })
    this.authStatus = 'personAuth' in this.detail ? this.detail.personAuth : -1
    this.updateUserInfo({ personAuth: this.authStatus })
  }
}
</script>
<style lang="scss">
@import '../../style/self/index';
</style>
