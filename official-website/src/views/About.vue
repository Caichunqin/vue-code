<template>
  <div class="v-about">
    <p class="brand-title">公司简介</p>
    <div class="about-wrap">
      <p class="about-desc">
        上海昕誉信息科技有限公司是一家专注于协同办公一体化解决方案的供应商。对工作流程管理、
         知识文档管理、领导决策管理、 异构系统集成等有着深刻的认识和实践经验。
         对 ERP、OA 、CRM 、数据分析等软件的统一集成与信息化生态建设。
      </p>
      <p class="about-desc">
        公司的业务服务于企业信息化高端市场， 为大型客户提供管理改进和信息化方案； 提供各类管理软件的
        定制开发以及培训、实施服务。公司致力于支持企业管理的持续改进与信息化的深度融合， 致力于支持
        客户业务的持续拓展与信息化的深度融合，致力于信息化对企业发展战略和管理创新的支撑。
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.v-about {
  margin-bottom: 100px;
  min-height: 50vh;
  .brand-title {
    font-size: 30px;
    font-weight: 300;
    color: $black;
    text-align: center;
    margin-top: 50px;
  }
  .about-wrap {
    width: 80%;
    margin: 40px auto;
    .about-desc {
      font-size: 18px;
      font-weight: 300;
      line-height: 40px;
      text-indent: 1cm;
    }
  }
}
</style>
