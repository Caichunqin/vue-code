<template>
  <div class="p-companyInfo">
    <van-nav-bar
      left-arrow
      title="企业信息"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <van-cell-group class="c-mb-20">
      <van-cell
        title="头像"
        is-link>
        <template slot="default">
          <avatar-update
            :src="form.companyAvatar"
            @update="updateAvatar">
          </avatar-update>
        </template>
      </van-cell>
      <van-cell
        title="统一社会信用代码"
        is-link
        @click="changeInfo('socialCode', '修改统一社会信用代码')"
        :value="form.socialCode || '未设置'">
      </van-cell>
      <van-cell
        title="企业地址"
        is-link
        @click="changeInfo('address', '修改企业地址')"
        :value="form.address || '未设置'">
      </van-cell>
      <van-cell
        title="联系电话"
        is-link
        @click="changeInfo('phone', '修改联系电话')"
        :value="form.phone || '未设置'">
      </van-cell>
      <van-cell
        title="企业邮箱"
        is-link
        @click="changeInfo('companyEmail', '修改企业邮箱')"
        :value="form.companyEmail || '未设置'">
      </van-cell>
      <van-cell
        title="商家公告"
        is-link
        @click="changeInfo('notice', '修改商家公告')"
        :value="form.notice || '未设置'">
      </van-cell>
      <van-cell
        title="企业图片"
        is-link
        @click="changeInfo('companyPictureEntityList', '设置企业图片')"
        :value="hasSetPicture ? '已设置' : '未设置'">
      </van-cell>
    </van-cell-group>

    <van-dialog
      v-model="dialog.show"
      :title="dialog.title"
      show-cancel-button
      @confirm="confirm">
      <van-cell v-if="dialog.formKey !== 'companyPictureEntityList'">
        <van-field
          v-model="inputVal"
          placeholder="请输入"
          :maxlength="maxlength"
        />
      </van-cell>
      <van-uploader
        v-else
        class="c-p"
        multiple
        v-model="inputVal">
      </van-uploader>
    </van-dialog>
  </div>
</template>

<script>
import { back } from '../../shared/util'
import { companyDetail } from '../../api/auth'
import { editCompany } from '../../api/company'
import { isEmail, isSocialCreditCode } from '../../shared/validate'
import {
  NavBar, Image, Icon, Field, Cell,
  CellGroup, Uploader, Button, Dialog
} from 'vant'
import { cloneDeep } from 'lodash'
import AvatarUpdate from '../../components/AvatarUpdate.vue'
import { uploadFile } from '../../api/upload'

const form = {
  companyAvatar: '', // 公司头像
  socialCode: '', // 统一信息信用代码
  address: '', // 企业地址
  phone: '', // 联系电话
  companyEmail: '', // 企业邮箱
  notice: '', // 商家公告
  companyPictureEntityList: [] // 企业图片
}
const downloadPicPath = '/authCenter/upload/downloadPic?linkKey='
export default {
  components: {
    [NavBar.name]: NavBar,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Field.name]: Field,
    AvatarUpdate
  },
  data () {
    return {
      fileList: [],
      inputVal: '',
      dialog: {
        formKey: '',
        show: false,
        title: '修改社会信用代码'
      },
      form: cloneDeep(form)
    }
  },
  computed: {
    maxlength () {
      if (this.dialog.formKey === 'socialCode') {
        return 18
      }
      return 20
    },
    hasSetPicture () {
      const pictures = this.form.companyPictureEntityList || []
      return !!pictures.length
    }
  },
  methods: {
    back,
    async updateAvatar (url) {
      this.form.companyAvatar = url
      this.submitInfo({ companyAvatar: url })
    },
    async submitInfo (data = {}) {
      const { success, errorMessage } = await editCompany(data)
      if (success) {
        this.$notify('修改成功')
      } else {
        const error = errorMessage || '修改失败'
        this.$notify(error)
        throw new Error(error)
      }
    },
    changeInfo (formKey, title) {
      if (formKey === 'companyPictureEntityList') {
        this.inputVal = (this.form.companyPictureEntityList || []).map(i => {
          return { url: downloadPicPath + i.fileKey, isImage: true }
        })
      } else {
        this.inputVal = this.form[formKey]
      }
      this.dialog = {
        formKey,
        show: true,
        title
      }
    },
    validate () {
      const key = this.dialog.formKey
      if (key === 'companyEmail' && !isEmail(this.inputVal)) {
        return '请输入正确的邮箱地址'
      }
      if (key === 'socialCode' && !isSocialCreditCode(this.inputVal)) {
        return '请输入正确的社会信用代码'
      }
      return true
    },
    async confirm () {
      const validateResult = this.validate()
      if (this.dialog.formKey === 'companyPictureEntityList') {
        const defaultFile = this.inputVal
          .filter(i => !i.file)
          .map(i => i.url.replace(downloadPicPath, ''))
        // 并行上传文件
        const res = await Promise.all(this.inputVal.filter(i => i.file).map(i => uploadFile(i.file)))
        if (!res.every(i => i.success)) return this.$notify('上传文件失败')
        this.inputVal = [...defaultFile, ...res.map(i => i.value)].map(i => ({ fileKey: i }))
      }
      if (!this.inputVal) return
      if (validateResult !== true) return this.$notify(validateResult)
      const data = {
        [this.dialog.formKey]: this.inputVal
      }
      await this.submitInfo(data)
      this.form[this.dialog.formKey] = this.inputVal
    }
  },
  async mounted () {
    const { value = [] } = await companyDetail() || {}
    const detail = value[0] || {}
    // 赋初值
    Object.keys(form).forEach(key => {
      this.form[key] = detail.hasOwnProperty(key) ? detail[key] : form[key]
    })
    this.form.companyPictureEntityList = (detail.companyPictureEntityList || []).map(i => {
      return { fileKey: i.fileKey }
    })
  }
}
</script>

<style lang="scss">
.p-companyInfo {
  .gallery {
    padding: $edge;
    background: #fff;
    &.per-mg-b {
      margin-bottom: 82px;
    }
  }
  .fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    background: #fff;
  }
}
</style>
