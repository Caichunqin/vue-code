module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 向所有 sass 样式传入共享的全局变量，mixins,functions
        data: `
          @import "@/style/_mixins.scss";
          @import "@/style/_functions.scss";
          @import "@/style/_variables.scss";
        `
      }
    }
  }
}
