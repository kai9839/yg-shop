const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 哪些文件自动引入，使用绝对路径
      // 需要是path.join来拼接完整路径
      patterns: [
        path.join(__dirname, './src/assets/styles/variavles.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))
    // 这个是给webpack-dev-server开启可IP和域名访问权限。
    config.devServer.disableHostCheck(true)
  },
  // 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
}
