<template>
  <div class="v-friends">
    <p class="brand-title">合作品牌</p>
    <div class="img-wrap">
      <div class="img-border">
        <img src="../assets/fanwei.png" />
      </div>
      <div class="img-border">
        <img src="../assets/fanruan.png" />
      </div>
      <div class="img-border">
        <img src="../assets/lanling.png" />
      </div>
      <div class="img-border">
        <img src="../assets/jindie.png" />
      </div>
      <div class="img-border">
        <img src="../assets/zhiyuan.png" />
      </div>
      <div class="img-border">
        <img src="../assets/yongyou.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.v-friends {
  margin-bottom: 100px;
  min-height: 50vh;
  .brand-title {
    font-size: 30px;
    font-weight: 300;
    color: $black;
    text-align: center;
    margin-top: 50px;
  }
  .img-wrap {
    display: flex;
    flex-wrap: wrap;
    max-width: 80%;
    margin: 30px auto;
    .img-border {
      display: block;
      width: 15%;
      margin-left: 1%;
      opacity: .75;
      height: 120px;
      margin-bottom: 10px;
      border: 1px solid rgb(236, 234, 234);
      @media screen and (max-width: 1150px) {
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
  }
}
</style>
