const { defineConfig } = require('@vue/cli-service')

// vant 按需自动导入
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
})
//变成全局样式   就不需要 @import url(./style/commons.scss);这样一个一个文件导入了，这个东西导入了只能在自己文件使用不管你scoped
//commjs的导出可以多次使用   es6 export default 只能使用一次
const path = require('path');
module.exports = {
  // vant 按需自动导入
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  
  pluginOptions: {
    //style-resources-loader 配置项的作用是将样式资源文件加载到项目中，并将其转换为 CSS 样式。
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 这个是绝对路径,不能使用 alias 中配置的别名路径，如@表示的src
        path.resolve(__dirname, './src/style/commons.scss')
      ]
    }
  }
}