const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: 'dist-libs',
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/theme/theme.less')],
    },
  },
  configureWebpack: {
    externals: {
      '@mapgis/web-app-framework': '@mapgis/web-app-framework',
      '@mapgis/cesium': '@mapgis/cesium',
      '@mapgis/geojson-vt': '@mapgis/geojson-vt',
      '@mapgis/mapbox-gl': '@mapgis/mapbox-gl',
      '@mapgis/mapbox-gl-compare': '@mapgis/mapbox-gl-compare',
      '@mapgis/mapbox-gl-draw': '@mapgis/mapbox-gl-draw',
      '@mapgis/mapbox-gl-draw-circle': '@mapgis/mapbox-gl-draw-circle',
      '@mapgis/mapbox-gl-draw-radius': '@mapgis/mapbox-gl-draw-radius',
      '@mapgis/mapbox-gl-draw-static-mode':
        '@mapgis/mapbox-gl-draw-static-mode',
      '@mapgis/mapbox-gl-inspect': '@mapgis/mapbox-gl-inspect',
      '@mapgis/supercluster': '@mapgis/supercluster',
      '@mapgis/webclient-cesium-plugin': '@mapgis/webclient-cesium-plugin',
      '@mapgis/webclient-common': '@mapgis/webclient-common',
      '@mapgis/webclient-es6-mapboxgl': '@mapgis/webclient-es6-mapboxgl',
      '@mapgis/webclient-es6-service': '@mapgis/webclient-es6-service',
      '@mapgis/webclient-plot': '@mapgis/webclient-plot',
      '@mapgis/webclient-store': '@mapgis/webclient-store',
      '@mapgis/webclient-vue-ui': '@mapgis/webclient-vue-ui',
      '@mapgis/webclient-vue-mapboxgl': '@mapgis/webclient-vue-mapboxgl',
      '@mapgis/webclient-vue-cesium': '@mapgis/webclient-vue-cesium',
    },
  },
  css: {
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
    },
  },
})
