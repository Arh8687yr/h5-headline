module.export = {
  publicPath: process.env.Node === 'production' ? './' : '/', // 解决打包上线时，文件路径变为绝对路径，显示空白，线上路径为 './'  不设置时默认为生产环境 '/'
  devServer: {
    host: 'localhost',
    port: 8090,
    https: false,
    hotOnly: false,
    proxy: {
      '/app': {
        target: 'http://ttapi.research.itcast.cn',
        changeOrign: true,
        pathRewrite: {
          '^app': '/'
        }
      }
    },
    before: app => {

    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ..
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none'
      return args
    })
  }
}
