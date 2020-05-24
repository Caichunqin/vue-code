module.exports = {
  devServer: {
    proxy: {
      '/authCenter': {
        target: 'http://39.100.38.17:8080',
        changeOrigin: true
      },
      '/goods': {
        target: 'http://39.100.38.17:8083',
        changeOrigin: true
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // 向所有 sass 样式传入共享的全局变量
        data: `@import "~@/style/variables.scss";`
      }
    }
  }
}
