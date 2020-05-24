<template>
  <div class="v-homepage">
    <van-nav-bar
      left-arrow
      left-text="返回"
      @click-left="back">
    </van-nav-bar>
    <div class="store-head">
      <img :src="storeImage" alt="">
      <div class="store-head-desc">
        <p class="item">{{companyName}}</p>
        <ul class="c-d-f c-fs-12">
          <li class="c-d-f c-ai-c c-c-orange-dark item">
            <van-icon name="like" size="14px"/>
            <span>优选商户</span>
          </li>
          <li class="c-d-f c-ai-c c-c-blue item">
            <van-icon name="diamond" size="15px"/>
            <span>极速退款</span>
          </li>
        </ul>
        <van-notice-bar
          :text="storeNotice || '...'"
          left-icon="volume"
          background="transparent"
          class="notify"
        />
      </div>
    </div>
    <van-tabs v-model="activeName1">
      <van-tab title="设备商品" name="a">
        <StoreGoodsList></StoreGoodsList>
      </van-tab>
      <van-tab :title="'评价' + discussScore.count" name="b">
        <section class="c-fs-14 store-discuss">
          <div class="c-d-f c-ta-c store-score">
            <div class="c-d-f c-jc-sa score-border">
              <div class="c-d-f c-fd-c c-jc-c">
                <span class="c-fs-20 c-fw-b">{{discussScore.score || ''}}</span>
                <span>商家评分</span>
              </div>
              <div class="c-d-f c-fd-c c-jc-sb">
                <div class="c-d-f c-ai-c">
                  <span class="c-fs-14">诚实</span>
                  <van-rate allow-half :value="discussScore.honestScore" size="16px" color="#ed6a0c" class="c-mlr-10 home-fs-0" readonly></van-rate>
                  <span class="c-fs-14">{{discussScore.honestScore}}</span>
                </div>
                <div class="c-d-f c-ai-c">
                  <span class="c-fs-14">质量</span>
                  <van-rate allow-half :value="discussScore.qualityScore" size="16px" color="#ed6a0c" class="c-mlr-10 home-fs-0" readonly></van-rate>
                  <span class="c-fs-14">{{discussScore.qualityScore}}</span>
                </div>
              </div>
            </div>
            <div class="c-d-f c-fd-c c-ai-c c-jc-c cm-flex-3 c-c-gray-dark">
              <span class="c-fs-20">{{discussScore.satisfaction || ''}}%</span><span>服务满意度</span>
            </div>
          </div>
          <div>
            <van-tabs v-model="activeName2">
              <van-tab title="全部" name="a">
                <div v-for="item in discussList" :key="item.userName" class="c-d-f c-mt-10 c-mlr-10">
                  <van-image
                    round
                    width="3rem"
                    height="3rem"
                    :src="item.avatar"
                    class="c-noshrink"
                  />
                  <ul class="c-fs-12 c-ml-10 c-mb-20">
                    <li>{{item.userName}}</li>
                    <li class="c-d-f c-ai-c c-mt-5">
                      <span class="c-mr-5 c-c-gray-dark c-fs-12">评分</span>
                      <van-rate allow-half :value="item.score" size="14px" color="#ed6a0c" class="home-fs-0" readonly></van-rate>
                    </li>
                    <p class="c-c-text-color c-mt-10">{{item.comment}}</p>
                  </ul>
                </div>
              </van-tab>
              <van-tab title="图片" name="b">
                <div v-for="item in picDiscussList" :key="item.userName" class="c-d-f c-mt-10 c-mlr-10">
                  <van-image
                    round
                    width="3rem"
                    height="3rem"
                    :src="downloadFile(item.avatar) || ''"
                    class="c-noshrink"
                  />
                  <ul class="c-fs-12 c-ml-10 c-mb-20">
                    <li>{{item.userName}}</li>
                    <li class="c-d-f c-ai-c c-mt-5">
                      <span class="c-mr-5 c-c-gray-dark c-fs-12">评分</span>
                      <van-rate allow-half :value="item.score" size="14px" color="#ed6a0c" class="home-fs-0" readonly></van-rate>
                    </li>
                    <p class="c-c-text-color c-mt-10">{{item.comment}}</p>
                  </ul>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </section>
      </van-tab>
      <van-tab title="商家" name="c">
        <div class="store-info">
          <van-cell-group class="c-fs-14">
            <van-cell :title="companyAddress || '无'" class="c-ptb-15">
              <van-icon
                slot="right-icon"
                name="phone"
                size="24px"
                color="#1989fa"
                style="line-height: inherit;"
              />
            </van-cell>
            <van-cell>
              <div class="img-scroll">
                <div v-for="(item, index) in images" :key="index" class="img-style">
                  <img :src="item.key" @click="onChangePic(images, index)"/>
                </div>
              </div>
            </van-cell>
            <van-cell title="查看企业安全档案" icon="coupon" class="c-ptb-15"></van-cell>
            <van-cell title="企业公告：" :label="storeNotice || '无'" class="c-ptb-15"></van-cell>
            <van-cell title="优选商户，信任合作商户" icon="diamond" class="c-ptb-15"></van-cell>
          </van-cell-group>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  NavBar, Tab, Tabs, Card, Rate, Image,
  Cell, CellGroup, Icon, ImagePreview,
  NoticeBar, Search
} from 'vant'
import StoreGoodsList from './HomepageCompanyList.vue'
import { back } from '../../shared/util'
import { downloadFile } from '../../api/upload'
import {
  getCompanyDetail, getCompanyScore,
  getDiscussList, getPicDiscussList
} from '../../api/company'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [Rate.name]: Rate,
    [Image.name]: Image,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NoticeBar.name]: NoticeBar,
    [Search.name]: Search,
    StoreGoodsList
  },
  data () {
    return {
      activeName1: 'a',
      activeName2: 'a',
      isShowProduct: true,
      total: 0,
      pageSize: 10,
      storeImage: 'https://cn.bing.com/th?id=OIP.MduJjhjTRhTnQH0fwwis_AHaFj&pid=PersonalBing&rs=1',
      searchKey: '',
      companyId: '',
      companyCategoryId: '',
      images: [],
      storeNotice: '',
      companyName: '',
      companyAddress: '',
      list: [],
      discussScore: {},
      discussList: [],
      picDiscussList: []
    }
  },
  methods: {
    ...mapActions([ 'queryGoods' ]),
    back,
    downloadFile,
    // add
    onChangePic (images, index) {
      ImagePreview({
        images: images,
        showIndex: true,
        startPosition: index
      })
    },
    async getComDetail () {
      const { value } = await getCompanyDetail()
      console.log(value)
      let picList = value.companyPictureEntityList || []
      this.images = picList
      this.storeNotice = value.notice || ''
      this.companyName = value.companyName
      this.companyAddress = value.address || ''
    },
    async getCompanyScore () {
      const { value } = await getCompanyScore()
      this.discussScore = value
    },
    async getEvaluationList () {
      const { value } = await getDiscussList()
      console.log(value)
    },
    async getPicEvaluationList () {
      const { value } = await getPicDiscussList()
      this.picDiscussList = value
    }
  },
  mounted () {
    this.getComDetail()
    this.getCompanyScore()
    this.getEvaluationList()
    this.getPicEvaluationList()
    // this.getCategoryList()
  }
}
</script>

<style lang="scss">
.v-homepage {
  .store-head {
    position: relative;
    height: 20vh;
    >img {
      width: 100%;
      height: 100%;
      opacity: .6;
      filter: blur(1px);
    }
    .store-head-desc {
      position: absolute;
      bottom: 0;
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(250,250,250,0.6);
      .item {
        margin-left: 16px;
      }
      .notify {
        font-size: 12px!important;
      }
    }
  }
  .store-discuss {
    .home-fs-0 {
      font-size: 0px;
    }
    .store-score {
      margin: 10px 0px;
      .score-border {
        padding: 4px;
        border-right: 1px solid $gray-light;
        flex: 0.75;
        color: $orange-dark;
      }
      .cm-flex-3 {
        flex: 0.25;
      }
    }
  }
  .store-info {
    .img-scroll {
      width: 100vw;
      height: 80px;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      .img-style {
        width: 20%;
        max-height: 100px;
        display: inline-block;
        border: 1px solid $gray;
        margin: 5px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

</style>
