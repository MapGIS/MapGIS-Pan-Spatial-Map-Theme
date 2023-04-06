<template>
  <mp-pan-spatial-map-header-dcd :theme-mode="themeMode">
    <div slot="header-content" class="header-menu">
      <!-- ul -->
      <mapgis-ui-menu
        class="menu"
        :theme="menuTheme"
        mode="horizontal"
        @select="onSelect"
      >
        <!-- 对应li标签 -->
        <mapgis-ui-menu-item v-for="widget in widgets" :key="widget.id">
          <!-- 头部左侧图标 -->
          <mapgis-ui-icon :icon="getWidgetIcon(widget)" class="icon" />
          <!-- 头部标题 -->
          <span>{{ getWidgetLabel(widget) }}</span>
          <!-- 加一个背景图片 -->
        </mapgis-ui-menu-item>
      </mapgis-ui-menu>
    </div>
    <template #header-right>
      <mp-pan-spatial-map-header-avatar
        v-if="isHeaderAvatarComponentExist"
        class="header-item"
      />
    </template>
  </mp-pan-spatial-map-header-dcd>
</template>

<script>
import { ThemeContentMixin, WidgetManager } from "@mapgis/web-app-framework";
import { mapState } from "vuex";
import {
  MpPanSpatialMapHeaderDcd,
  isExternalLayoutElementComponentExist,
} from "../../../../components";

export default {
  name: "MpPanSpatialMapClassicHeaderDcd",
  components: {
    MpPanSpatialMapHeaderDcd,
  },
  mixins: [ThemeContentMixin],
  data() {
    return {
      aboutWindowVisible: false,
    };
  },
  computed: {
    ...mapState("setting", { themeMode: (state) => state.theme.mode }),
    menuTheme() {
      return this.themeMode == "light" ? this.themeMode : "dark";
    },
    isHeaderAvatarComponentExist() {
      return isExternalLayoutElementComponentExist(
        "MpPanSpatialMapHeaderAvatar"
      );
    },
    isAboutComponentExist() {
      return isExternalLayoutElementComponentExist("MpPanSpatialMapAbout");
    },
  },
  methods: {
    onSelect({ key }) {
      WidgetManager.getInstance().triggerWidgetOpen(
        this.widgets.find((val) => {
          return val.id === key;
        })
      );
    },
    onShowAboutInfo() {
      this.aboutWindowVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  .header-wide {
    .header-menu {
      height: 100%;
      .menu {
        line-height: 60px;
        height: 100%;
        border: none;
        box-shadow: none;
        // background-color: #051535;
        background-color: transparent !important;
        .icon {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
