<template>
  <div class="v-ability">
    <div class="area-intro">
      <p class="brand-title">产品简介</p>
      <p class="intro-text">昕誉 DataMagic 是昕誉信息科技自主研发的一款数据融合产品，无需任何代码，
        通过可视化图形配置界面只需 5 分钟即可自服务部署一条实时数据管道，并提供丰富的管理功能：
        数据批流一体、数据质量管控、数据任务流管理，可视化运维管理、错误队列管理、用户管理、元数据管理等，
        帮助客户实现高效地连接复杂的异构数据源和目的地，大数据量高并发数据同步，可视化实时监测保障数据质量
        等价值，为客户灵活的数据消费需求提供强有力的技术驱动。
      </p>
      <img class="img" src="../assets/data.png">
    </div>
    <div class="area-function">
      <p class="brand-title">功能介绍</p>
      <ul class="function-wrap">
        <li class="function-item">
          数据源和目的地读写
          <p class="item-desc">
            可批量选择数据读取对象，系统自动匹配异构数据源之间的表结构，并支持可视化配置
            所有属性。核心功能：读写个性化设置（读写方式、频率、速率等），自动匹配映射关系。
          </p>
        </li>
        <li class="function-item">
          数据清洗
          <p class="item-desc">通过数据清洗组件实现轻量化数据清洗，同时提供高级清洗组件，
            满足大部分数据处理需求。核心功能：可视化清洗组件，高级清洗组件表结构修改工具。
          </p>
        </li>
        <li class="function-item">
          数据质量
          <p class="item-desc">支持针对静态数据库数据定时进行数据质量检核。提供可视化工具配置
            数据质量检核逻辑，并支持复杂的自定义检核逻辑。核心功能：数据质量任务、度量规则、检核方法。
          </p>
        </li>
        <li class="function-item">
          元数据管理
          <p class="item-desc">可查看或修改已连接 DataMagic 的所有数据源的技术元数据、业务元数据、
            样例数据。核心功能：技术元数据、业务元数据、样例数据、历史表结构变化。
          </p>
        </li>
      </ul>
      <img class="img" src="../assets/data-1.png">
    </div>
    <div class="area-product">
      <p class="brand-title">产品特点</p>
      <p class="title-desc">B/S架构/自定义表单/自定义流程/简化工作/移动端构建</p>
      <section class="fast card">
        <div class="item">
          <div class="circle">Browser</div>
          <div>
            <p class="title">B/S架构</p>
            <p class="desc">网页登录方便无需客户端安装，随时随地进行操作效率，提升90%。</p>
          </div>
        </div>
        <div class="item">
          <div class="circle">Form</div>
          <div>
            <p class="title">自定义表单</p>
            <p class="desc">浏览器自定义配置表单，拖拉拽即可实现构建模板</p>
          </div>
        </div>
        <div class="item">
          <div class="circle">Activiti</div>
          <div>
            <p class="title">自定义流程</p>
            <p class="desc">业务流程组装，规范各个部门的流程，进行高效率提升</p>
          </div>
        </div>
        <div class="item">
          <div class="circle">Efficiency</div>
          <div>
            <p class="title">简化工作</p>
            <p class="desc">操作简单数据，安全简便易用，使得员工操作不再出错，工作效率倍增</p>
          </div>
        </div>
        <div class="item">
          <div class="circle">Function</div>
          <div>
            <p class="title">功能打造</p>
            <p class="desc">综合各大行业市场调查整合功能，使用频率进行结合而成</p>
          </div>
        </div>
        <div class="item">
          <div class="circle">Mobile</div>
          <div>
            <p class="title">移动端构建</p>
            <p class="desc">电脑端，移动端，一体化建造，可接通钉钉，微信端口等等。</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.v-ability {
  margin-bottom: 100px;
  .brand-title {
    font-size: 30px;
    font-weight: 300;
    text-align: center;
    margin-top: 50px;
  }
  .img {
    display: block;
    width: 80%;
    margin: 20px auto;
  }
  .area-intro {
    .intro-text {
      font-size: 18px;
      font-weight: 300;
      line-height: 40px;
      text-indent: 1cm;
      width: 80%;
      margin: 0 auto;
      margin-top: 30px;
    }
  }
  .function-wrap {
    width: 72%;
    margin: 0 auto;
    padding-top: 30px;
    font-size: 20px;
    font-weight: 300;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .function-item {
      width: 45%;
      margin-bottom: 30px;
      padding: 10px;
      &:hover {
        background: #fff;
        box-shadow: 0 10px 30px 0 rgba(70, 100, 180, .1);
      }
      @media screen and (max-width: 576px) {
        width: 98%;
      }
    }
    .item-desc {
      color: #666;
      font-size: 14px;
      line-height: 30px;
    }
  }
  .area-product {
    .title-desc {
      color: #666;
      font-size: 14px;
      text-align: center;
    }
    .card {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .item {
        display: flex;
        width: 90%;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 30px 15px;
        margin: 10px auto;
        &:hover {
          background: #fff;
          box-shadow: 0 10px 30px 0 rgba(70, 100, 180, .1);
        }
        @media (min-width: 768px) {
          &.item {
            margin: 10px 0;
            width: 45%;
          }
        }
        @media (min-width: 1200px) {
          &.item {
            width: 15%;
          }
        }
        .title {
          font-size: 14px;
          margin-bottom: 5px;
          color: #333;
        }
        .desc {
          color: #666;
          font-size: 14px;
          margin-bottom: 0;
        }
        .circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #265ffcec;
          font-size: 10px;
          color: white;
          opacity: .8;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
