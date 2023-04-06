const { defineConfig } = require('@vue/cli-service')
const path=require('path')
module.exports = defineConfig({
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: 'dist-libs',
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/theme/theme.less')]
    }
  },
  configureWebpack:{
    externals:{
      '@mapgis/web-app-framework': '@mapgis/web-app-framework',
    }
  },
  css:{
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
      scss: {
        additionalData: '@import "./src/theme/mapgis-ui/index.scss";',
      },
  }
}
})
