<template>
  <div class="v-resolution">
    <p class="brand-title">业务案例</p>
    <p class="brand-title-grey">每个案例都是你的参考</p>
    <div class="img-wrap">
      <div class="img-border">
        <img src="../assets/yidong.png" />
      </div>
      <div class="img-border">
        <img src="../assets/yongyou.png" />
      </div>
      <div class="img-border">
        <img src="../assets/jindie.png" />
      </div>
      <div class="img-border">
        <img src="../assets/guangfa.png" />
      </div>
      <div class="img-border">
        <img src="../assets/zhiyuan.png" />
      </div>
      <div class="img-border">
        <img src="../assets/fanruan.png" />
      </div>
    </div>

    <p class="brand-title">服务客户</p>
    <p class="brand-title-grey">大家的支持与认可，我们非常感谢</p>
    <div class="img-wrap">
      <div class="img-border">
        <img src="../assets/guangfa.png" />
      </div>
      <div class="img-border">
        <img src="../assets/zhiyuan.png" />
      </div>
      <div class="img-border">
        <img src="../assets/lanling.png" />
      </div>
      <div class="img-border">
        <img src="../assets/yidong.png" />
      </div>
      <div class="img-border">
        <img src="../assets/jindie.png" />
      </div>
      <div class="img-border">
        <img src="../assets/anjuke.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.v-resolution {
  margin-bottom: 100px;
  .brand-title {
    font-size: 30px;
    font-weight: 300;
    color: $black;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 5px;
  }
  .brand-title-grey {
    color: #666;
    font-size: 14px;
    text-align: center;
  }
  .img-wrap {
    display: flex;
    flex-wrap: wrap;
    max-width: 80%;
    margin: 30px auto;
    margin-bottom: 60px;
    .img-border {
      display: block;
      width: 15%;
      margin-left: 1%;
      opacity: .75;
      height: 120px;
      margin-bottom: 10px;
      border: 1px solid rgb(236, 234, 234);
      @media screen and (max-width: 960px) {
        width: 30%;
        margin-left: 2%;
      }
      @media screen and (max-width: 768px) {
        width: 44%;
        margin-left: 4%;
      }
       @media screen and (max-width: 414px) {
        width: 90%;
        margin-left: 5%;
      }
      &:hover {
        opacity: 1;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .bg-pic1 {
      background: url("../assets/fanwei.png") center no-repeat;
      background-size: contain;
    }
    .bg-pic2 {
      background: url("../assets/yongyou.png") center no-repeat;
      background-size: contain;
    }
    .bg-pic3 {
      background: url("../assets/fanruan.png") center no-repeat;
      background-size: contain;
    }
    .bg-pic4 {
      background: url("../assets/lanling.png") center no-repeat;
      background-size: contain;
    }
    .bg-pic5 {
      background: url("../assets/zhiyuan.png") center no-repeat;
      background-size: contain;
    }
    .bg-pic6 {
      background: url("../assets/jindie.png") center no-repeat;
      background-size: contain;
    }
    .bg-pic7 {
      background: url("../assets/anjuke.png") center no-repeat;
      background-size: contain;
    }
    .bg-pic8 {
      background: url("../assets/guangfa.png") center no-repeat;
      background-size: contain;
    }
    .bg-pic9 {
      background: url("../assets/yidong.png") center no-repeat;
      background-size: contain;
    }
    .bg-pic10 {
      background: url("../assets/shunfeng.png") center no-repeat;
      background-size: contain;
    }
  }
}
</style>
