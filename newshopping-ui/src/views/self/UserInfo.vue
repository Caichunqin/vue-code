<template>
  <div class="p-userInfo">
    <van-nav-bar
      left-arrow
      title="个人信息"
      left-text="返回"
      @click-left="back">
    </van-nav-bar>

    <section class="c-mtb-20 c-plr-15">
      <p class="c-ta-c">
        已完成<span class="c-c-orange c-fs-20">{{percentage}}%</span>，
        {{percentage >= 100 ? '真棒' : '加把劲'}}！
      </p>
      <van-progress :percentage="percentage"></van-progress>
    </section>

    <van-cell-group class="c-mb-20">
      <van-cell
        title="头像"
        is-link>
        <template slot="default">
          <avatar-update
            :src="infoObj.avatar"
            @update="updateAvatar">
          </avatar-update>
        </template>
      </van-cell>
      <van-cell
        title="用户名"
        is-link
        to="/changeUserName"
        :value="infoObj.loginName || '未设置'">
      </van-cell>
      <van-cell
        title="性别"
        is-link
        @click="showSexActionSheet = true"
        :value="infoObj.sex === 0 ? '男' : infoObj.sex === 1 ? '女' : '未设置'">
      </van-cell>
      <van-cell
        title="出生日期"
        is-link
        @click="showDatetimePicker = true"
        :value="infoObj.birthday || '未设置'">
      </van-cell>
      <van-cell
        title="个人简介"
        is-link
        to="/profile"
        :value="infoObj.introduce || '未设置'">
      </van-cell>
    </van-cell-group>

    <van-cell-group class="c-mb-20">
      <van-cell
        title="手机号"
        is-link
        to="/mobileView"
        :value="phoneText">
      </van-cell>
      <van-cell
        title="登录密码"
        is-link
        to="/setPassword"
        :value="infoObj.password ? '已设置' : '未设置'">
      </van-cell>
      <van-cell
        title="邮箱"
        is-link
        to="/email"
        :value="emailText">
      </van-cell>
      <van-cell
        title="地区"
        is-link
        to="/getCity"
        :value="infoObj.area || '未设置'">
      </van-cell>
      <van-cell
        title="收货地址"
        is-link
        :to="addressRoute"
        :value="hasAddress ? '已设置' : '未设置'">
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell
        title="实名认证"
        is-link
        to="/certification"
        :value="authText(infoObj.personAuth)">
      </van-cell>
      <van-cell
        title="企业认证"
        is-link
        to="/authentication"
        :value="authText(infoObj.companyAuth)">
      </van-cell>
      <van-cell
        title="我的关注商品"
        is-link
        to="/focusGoods">
      </van-cell>
       <van-cell
        title="我的足迹"
        is-link
        to="/footmark">
      </van-cell>
    </van-cell-group>
    <van-action-sheet
      v-model="showSexActionSheet"
      :actions="sexActions"
      @select="selectSex">
    </van-action-sheet>

    <van-popup
      v-model="showDatetimePicker"
      position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="changeDate"
        @cancel="cancelDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  NavBar, Cell, CellGroup, Uploader, Image,
  ActionSheet, Popup, DatetimePicker, Progress
} from 'vant'
import { back } from '../../shared/util'
import { getAddressList } from '../../api/address'
import AvatarUpdate from '../../components/AvatarUpdate.vue'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader,
    [Image.name]: Image,
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Progress.name]: Progress,
    AvatarUpdate
  },
  data () {
    return {
      fileList: [],
      showSexActionSheet: false,
      showDatetimePicker: false,
      sexActions: [
        { name: '男' },
        { name: '女' }
      ],
      addressRoute: { path: '/addressList', query: { type: 'userInfo' } },
      sex: 0,
      currentDate: new Date(),
      showCityBar: false,
      hasAddress: false
    }
  },
  computed: {
    ...mapState([ 'userInfo', 'token' ]),
    isLogin () {
      return !!this.token
    },
    infoObj () {
      return this.userInfo || {}
    },
    phoneText () {
      const phone = this.userInfo?.mobile || ''
      return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') || '未设置'
    },
    emailText () {
      return this.userInfo?.email || '未设置'
    },
    percentage () {
      const all = [
        !!this.infoObj.avatar,
        !!this.infoObj.loginName,
        [0, 1].includes(this.infoObj.sex),
        !!this.infoObj.birthday,
        !!this.infoObj.introduce,
        !!this.infoObj.mobile,
        !!this.infoObj.password,
        !!this.infoObj.email,
        !!this.infoObj.area,
        this.hasAddress,
        this.infoObj.personAuth === 1,
        this.infoObj.companyAuth === 1
      ]
      const complete = all.filter(i => i)

      return Number((complete.length / all.length * 100).toFixed(0))
    }
  },
  methods: {
    ...mapActions([ 'updateUserInfo' ]),
    back,
    authText (authType) {
      if (authType === 0) return '认证中'
      if (authType === 1) return '认证通过'
      if (authType === 2) return '认证未通过'
      return '未认证'
    },
    async updateAvatar (url) {
      this.userInfo.avatar = url
      const info = { avatar: this.userInfo.avatar }
      await this.updateUserInfo(info)
    },
    async selectSex (item) {
      this.sex = item.name === '男' ? 0 : 1
      const info = { sex: this.sex }
      await this.updateUserInfo(info)
      this.showSexActionSheet = false
    },
    async changeDate (date) {
      let month = Number(date.getMonth()) + 1
      const Date = date.getFullYear() + '-' + month + '-' + date.getDate()
      const info = { birthday: Date }
      await this.updateUserInfo(info)
      this.showDatetimePicker = false
    },
    async getAddList () {
      const { value } = await getAddressList(1)
      this.hasAddress = value?.list?.length > 0
    },
    async cancelDate () {
      this.showDatetimePicker = false
    }
  },
  mounted () {
    this.getAddList()
  }
}
</script>
