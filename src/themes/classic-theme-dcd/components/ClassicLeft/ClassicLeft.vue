<template>
  <div style="height: 100%; float: left">
    <mapgis-ui-layout-sider
      theme="light"
      :class="[themeMode, 'left-panel-wrapper', 'beauty-scroll']"
      :width="width"
      v-show="show"
      style="height: calc(100%); float: left"
    >
      <div class="beauty-scroll window-content" style="padding-bottom: 20px">
        <component :is="widgets[0].manifest.component" :widget="widgets[0]" />
      </div>
    </mapgis-ui-layout-sider>

    <button
      id="btExpand"
      style="color: #fff"
      :style="styleObj"
      @click="showDataCatalog"
    >
      数<br />据<br />目<br />录
    </button>
  </div>
</template>

<script>
import { ThemeContentMixin } from "@mapgis/web-app-framework";
import { mapState } from "vuex";
import expandImage from "./ico_expand.png";

export default {
  name: "MpPanSpatialMapClassicLeftDcd",
  mixins: [ThemeContentMixin],
  props: {
    widgets: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      width: 280,
      show: true,
      styleObj: {
        "background-image": `url(${expandImage})`,
      },
    };
  },
  computed: {
    ...mapState("setting", { themeMode: (state) => state.theme.mode }),
  },
  mounted() {
    this.$emit("update-width");
  },
  methods: {
    showDataCatalog: function () {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.left-panel-wrapper {
  z-index: 1000;
  padding: 12px;
  // background-color: rgba(50, 50, 50, 0.8);
  background-color: rgba(38, 42, 48, 0.8);
}
.window-content {
  height: 100%;
}
#btExpand {
  width: auto;
  height: 130px;
  position: absolute;
  float: left;
  z-index: 20001;
  margin-top: -65px;
  top: 50%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: transparent;
  border: none;
}
</style>
