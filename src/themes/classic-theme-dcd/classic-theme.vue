<template>
  <mapgis-ui-layout class="pan-spatial-map-wrapper">
    <component
      :is="headerContentComponent"
      ref="headerContent"
      v-bind="parseContentProps('header')"
    />
    <mapgis-ui-layout ref="bodyContent">
      <component
        :is="leftContentComponent"
        ref="leftContent"
        v-if="mapInitialized"
        v-bind="parseContentProps('left')"
        :widgets="left.widgets"
        @update-width="onLeftWidthUpdate"
      />
      <mapgis-ui-layout class="main-wrapper">
        <mapgis-ui-layout-content class="content-wrapper">
          <slot v-if="mapInitialized" name="map" />
        </mapgis-ui-layout-content>
        <component
          :is="footerContentComponent"
          v-bind="parseContentProps('footer')"
          :max-view-height="maxFooterHeight"
        />
      </mapgis-ui-layout>
      <mp-pan-spatial-map-side-panel-dcd
        v-if="maxSidePanelWidth && mapInitialized"
        v-bind="right.panel"
        :widgets="right.widgets"
        :max-width="maxSidePanelWidth"
        @update-widget-state="onUpdateWidgetState('right', $event)"
      />
      <component
        :is="rightContentComponent"
        ref="rightContent"
        v-bind="parseContentProps('right')"
      />
      <mp-map-container
        v-if="configInitialized"
        class="map-wrapper"
        :cesium-lib-path="publicPath + 'cesium/Cesium.js'"
        :cesium-plugin-path="publicPath + 'cesium/webclient-cesium-plugin.js'"
        :map-options="mapOptions"
      />
    </mapgis-ui-layout>
  </mapgis-ui-layout>
</template>

<script>
import {
  ThemeMixin,
  baseConfigInstance,
  loadConfigs,
} from "@mapgis/web-app-framework";
import { mapState } from "vuex";
import MpPanSpatialMapSidePanelDcd from "../../components/SidePanel/dcd/SidePanel.vue";

export default {
  name: "MpPanSpatialMapClassicThemeDcd",
  components: {
    MpPanSpatialMapSidePanelDcd,
  },
  mixins: [ThemeMixin],
  props: {
    header: Object,
    left: Object,
    right: Object,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      maxFooterHeight: 0,
      maxSidePanelWidth: 0,
      showSetting: false,
      configInitialized: false,
    };
  },
  computed: {
    ...mapState("setting", ["hideSetting"]),
    headerContentComponent() {
      // 根据名称获取组件
      return this.parseContentComponent("header");
    },
    leftContentComponent() {
      return this.parseContentComponent("left");
    },
    rightContentComponent() {
      return this.parseContentComponent("right");
    },
    footerContentComponent() {
      return this.parseContentComponent("footer");
    },
    mapOptions() {
      const lnglat = baseConfigInstance.config.center.split(",");
      return {
        center: { lng: Number(lnglat[0]), lat: Number(lnglat[1]) },
        zoom: baseConfigInstance.config.initZoom,
        mapStyle: {
          glyphs: `http://${baseConfigInstance.config.ip}:${baseConfigInstance.config.port}/igs/rest/mrms/vtiles/fonts/{fontstack}/{range}.pbf`,
        },
      };
    },
  },
  mounted() {
    this.calcMaxFooterHeight();
    this.calcMaxSidePanelWidth();
    this.watchWindowSize();
  },
  async created() {
    await loadConfigs();
    this.configInitialized = true;
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    calcMaxFooterHeight() {
      this.maxFooterHeight =
        window.innerHeight - this.$refs.headerContent.$el.offsetHeight;
    },
    calcMaxSidePanelWidth() {
      this.maxSidePanelWidth =
        this.$refs.bodyContent.$el.clientWidth -
        this.$refs.rightContent.$el.clientWidth -
        (this.$refs.leftContent ? this.$refs.leftContent.$el.clientWidth : 0);
    },
    watchWindowSize() {
      window.onresize = () => {
        this.calcMaxFooterHeight();
        this.calcMaxSidePanelWidth();
      };
    },
    onLeftWidthUpdate() {
      this.calcMaxSidePanelWidth();
    },
  },
};
</script>

<style lang="scss" scoped>
.pan-spatial-map-wrapper {
  height: 100vh;
  position: relative;
  .main-wrapper {
    overflow-y: hidden;
    .content-wrapper {
      position: relative;
      padding: 0;
    }
  }
  .map-wrapper {
    position: absolute;
    top: 64px;
    right: 48px;
    width: calc(100% - 48px);
    height: calc(100% - 64px);
    z-index: 0;
    ::v-deep .mapboxgl-map {
      .statebardiv {
        background-color: rgba(79, 83, 86, 0.75);
        width: 100%;
        position: absolute;
        height: -webkit-fit-content;
        height: -moz-fit-content;
        height: fit-content;
        bottom: 0px;
        display: flex;
        justify-content: center;
        text-align: center;
        z-index: 9999;
        color: #ffffff;
        line-height: 25px;
        font-size: 100%;
        // left: 50%;
        // margin-left: -8.5%;
        // padding: 2px 10px;
        // border-radius: 8px;
        // font-weight: 500;
        // white-space: nowrap;
      }
    }
    ::v-deep .cesium-map-wrapper {
      .statebardiv {
        background-color: rgba(79, 83, 86, 0.75);
        width: 100%;
        position: absolute;
        height: -webkit-fit-content;
        height: -moz-fit-content;
        height: fit-content;
        bottom: 0px;
        display: flex;
        justify-content: center;
        text-align: center;
        z-index: 9999;
        color: #ffffff;
        line-height: 25px;
        font-size: 100%;
        // left: 50%;
        // padding: 2px 10px;
        // border-radius: 8px;
        // font-weight: 500;
        // white-space: nowrap;
      }
    }
  }
}
</style>
