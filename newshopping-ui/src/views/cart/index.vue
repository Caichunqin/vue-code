<template>
  <div>
    <div class="cart-header">
      <van-nav-bar
      title="购物车"
      :right-text="rightText"
      @click-right="onClickRight"
    />
   </div>
   <div class="cart-view">
    <div class="cart-box">
      <div v-for="(item, ind) in cartList" :key="ind" class="cart-list">
        <van-row type="flex" align="center" class="cart-top-row" >
          <van-col span="6"  offset="1">
            <van-checkbox v-model="item.checked" @click="checkAllShop(item)">全选</van-checkbox>
          </van-col>
          <van-col span="12"  class="cart-pay">
            <p>{{item.storeName}}</p>
          </van-col>
        </van-row>
        <div>
          <van-row type="flex" align="center" class="cart-item" v-for="(val, index) in item.cartEntities" :key="index">
            <van-col span="2"  offset="1">
              <van-checkbox v-model="val.checked" @change="handleCheck(val, ind)"></van-checkbox>
            </van-col>
            <van-col span="20">
              <van-card
                class="cart-card"
                num="1"
                :price="val.price"
                :desc="val.goodsRemark"
                :title="val.goodsName"
                thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
              />
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
      <van-submit-bar
        v-if="!isEdit"
        :price="totalPrice*100"
        button-text="结算"
        :disabled="!totalPrice"
        @submit="onSubmit"
        :decimal-length=2
        class="cart-bottom-row"
      >
        <van-checkbox v-model="checkedAll" @change='checkAll'>全选</van-checkbox>
      </van-submit-bar>
      <van-cell class="cart-bottom-row" v-else :center="true">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <van-checkbox v-model="checkedAll" @change='checkAll'>全选</van-checkbox>
        </template>
        <template slot="default">
           <span class="cart-clear" @click="clearCart">清理</span>
           <van-button round type="danger" class="delete" size="mini" @click="deleteGoods">删除</van-button>
        </template>
      </van-cell>
  </div>
 </div>
</template>
<script>
import { Row, Col, Card, Checkbox, Button, SubmitBar, Cell, NavBar, Dialog } from 'vant'
import { mapState, mapMutations } from 'vuex'
import { deleteGoods, deleteAllGoods, getCartList } from '../../api/cart'
export default {
  components: {
    [Checkbox.name]: Checkbox,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Button.name]: Button,
    [SubmitBar.name]: SubmitBar,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell
  },
  data () {
    return {
      pageSize: 10,
      list: [],
      checkedAll: false,
      rightText: '管理',
      isEdit: false,
      buttonText: '结算',
      cartEntities: [],
      ids: []
    }
  },
  computed: {
    ...mapState({
      totalPrice: 'totalPrice',
      cartList: function (state) {
        return this.changeArr(state.cartList)
      }
    })
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    ...mapMutations([ 'setProducts' ]),
    async getGoodsList () {
      const { success, value } = await getCartList(this.pageSize, 1)
      if (success) {
        this.setProducts(value.list)
        this.getTotalPrice(this.list)
      }
    },
    async getTotalPrice (list) {
      this.$store.dispatch('getPrice', { cartEntities: list })
    },
    onClickRight () {
      this.isEdit = !this.isEdit
      this.rightText = this.isEdit ? '完成' : '编辑'
    },
    changeArr (arr) {
      arr.forEach(item => {
        this.$set(item, 'checked', false)
        if (item.cartEntities) {
          this.changeArr(item.cartEntities)
        }
      })
      return arr
    },
    // 全选
    checkAll () {
      this.cartList.forEach(item => {
        item.checked = this.checkedAll
        if (item.cartEntities) {
          item.cartEntities.forEach(citem => {
            citem.checked = this.checkedAll
          })
        }
      })
      this.getTotalPrice(this.cartList)
    },
    // 判断是否选中
    isArrCheck (arr) {
      return arr.every(item => item.checked)
    },
    // 商家全选
    checkAllShop (val) {
      val.cartEntities.forEach(item => {
        if (val.checked) {
          this.$set(item, 'checked', false)
        } else {
          this.$set(item, 'checked', true)
        }
      })
      if (this.isArrCheck(this.cartList)) {
        this.checkedAll = true
      } else {
        this.checkedAll = false
      }
      this.getTotalPrice(this.cartList)
    },
    // 商品选择框
    handleCheck (item, index) {
      var check = [] // 保存中间层是否被选中的布尔值
      this.ids.push(item.id)
      this.cartList.forEach((items, index) => {
        if (items.cartEntities) {
          let bool = this.isArrCheck(items.cartEntities)
          if (bool) {
            items.checked = true
          } else {
            items.checked = false
          }
          check.push(bool)
        }
      })
      if (check.indexOf(false) === -1) {
        this.checkedAll = true
      } else {
        this.checkedAll = false
      }
      this.getTotalPrice(this.cartList)
    },
    onSubmit () {
      this.$router.push('/orderDetail')
    },
    clearCart () {
      this.checkedAll = true
      this.deleteGoods()
    },
    deleteGoods () {
      Dialog.confirm({
        title: '提示',
        message: '确定删除吗？'
      }).then(() => {
        if (this.checkedAll) {
          deleteAllGoods().then(res => {
            if (res.success) {
              this.getGoodsList()
            }
          })
        } else {
          let ids
          if (this.getIDs(this.cartList).length) {
            ids = this.getIDs(this.licartListst)
          } else {
            ids = this.ids
          }
          deleteGoods({ ids }).then(res => {
            if (res.success) {
              this.getGoodsList()
            }
          })
        }
        this.checkedAll = false
      }).catch(() => {
        // on cancel
      })
    },
    getIDs (array) {
      let newArr = []
      let arr1 = []
      let arr = array.filter(item => item.checked)
      arr1 = arr.map(item => {
        return item.cartEntities.map(val => {
          return val.id
        })
      })
      arr1.forEach(item => {
        newArr = newArr.concat(item)
      })
      return newArr
    }
  }
}
</script>
<style lang="scss">
.tab-content {
  overflow: hidden;
}
.cart-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 333;
}
.cart-view {
  position: relative;
  padding: 20px 0;
  margin-top: 60px;
  overflow: auto;
  .cart-box {
    padding-bottom: 80px;
  }
  .cart-top-row {
    background: $white;
  }
  .cart-list {
    padding-bottom: 40px;
    .cart-item {
      background: $white;
      margin-top: 10px;
      .cart-card {
        background: $white;
        padding: 10px 0;
      }
    }
  }
  .cart-bottom-row {
    width: 100%;
    position: fixed;
    bottom: 50px;
    background: $white;
    left: 0;
    .van-checkbox {
      margin-left: 20px;
    }
    .cart-clear {
      display: inline-block;
      margin-right:60px;
    }
    .delete {
      height: 32px;
      line-height: 30px;
    }
  }
}
</style>
