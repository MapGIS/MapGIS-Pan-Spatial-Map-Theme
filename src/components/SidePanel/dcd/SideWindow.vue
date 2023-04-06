<template>
  <mapgis-ui-layout-sider
    theme="light"
    :class="[themeMode, 'side-panel-wrapper']"
    :width="currentWidth"
    v-show="syncedVisible"
  >
    <mapgis-ui-adjust-line
      v-if="!isFullScreen"
      direction="left"
      :resize-button="false"
      @line-move="onPanelLineMove"
    />
    <mapgis-ui-card
      v-if="component !== 'MpDataCatalog'"
      size="small"
      :title="title"
      class="window-wrapper"
      :headStyle="{ height: '36px' }"
      :bodyStyle="bodyStyle"
    >
      <mapgis-ui-iconfont
        class="close-button"
        type="mapgis-close"
        slot="extra"
        @click="onClose"
      />
      <div class="beauty-scroll window-content">
        <slot />
      </div>
    </mapgis-ui-card>
    <mapgis-ui-card
      v-if="component === 'MpDataCatalog'"
      size="small"
      :tab-list="tabList"
      class="window-wrapper"
      :headStyle="{ height: '36px' }"
      :bodyStyle="bodyStyle"
      @tabChange="changeTab"
    >
      <mapgis-ui-iconfont
        class="close-button"
        type="mapgis-close"
        slot="tabBarExtraContent"
        @click="onClose"
      />
      <div class="beauty-scroll window-content">
        <slot />
      </div>
    </mapgis-ui-card>
  </mapgis-ui-layout-sider>
</template>

<script>
import { mapState } from "vuex";
import { events, eventBus } from "@mapgis/web-app-framework";

export default {
  name: "MpPanSpatialMapSideWindowDcd",
  props: {
    // 显示标题
    title: { type: String, default: "Title" },
    // 显示图标
    icon: { type: String, required: false },
    // 是否显示
    visible: { type: Boolean, default: false },
    // 内容宽度
    width: { type: Number, default: 280 },
    // 是否全屏
    isFullScreen: { type: Boolean, default: false },
    // 是否有边距
    hasPadding: { type: Boolean, default: true },
    // 最大宽度，支持数值和函数，函数必须返回数值
    maxWidth: { type: [Number, Function] },
    // 当前组件名称，展示数据目录中收藏夹功能使用该属性
    component: { type: String, default: "" },
  },
  data() {
    return {
      resizeWidth: this.width,
    };
  },
  computed: {
    ...mapState("setting", ["theme"]),
    themeMode() {
      return this.theme.mode;
    },
    // 同步属性visible
    syncedVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      },
    },
    currentWidth() {
      if (this.isFullScreen) {
        const width = this.getMaxWidth();
        if (width) {
          return width;
        }
      }

      return this.resizeWidth;
    },
    bodyStyle() {
      return {
        height: "calc(100% - 36px)",
        padding: this.hasPadding ? "12px" : "0px",
      };
    },
    tabList() {
      return [
        {
          key: events.DATA_CATALOG_TAB,
          tab: "数据目录",
        },
        {
          key: events.BOOKMARK_TAB,
          tab: "收藏夹",
        },
      ];
    },
  },
  methods: {
    // 获取地图容器元素
    getMaxWidth() {
      if (!this.maxWidth) return null;

      const type = typeof this.maxWidth;
      if (type === "function") {
        return this.maxWidth();
      } else if (type === "number") {
        return this.maxWidth;
      }
      return null;
    },
    onPanelLineMove(offset) {
      this.resizeWidth += offset;
      if (this.resizeWidth < 2) {
        this.resizeWidth = 2;
      } else {
        const maxWidth = this.getMaxWidth();

        if (maxWidth && this.resizeWidth >= maxWidth) {
          this.resizeWidth = maxWidth;
        }
      }
    },
    // 关闭事件
    onClose() {
      this.syncedVisible = false;
    },
    changeTab(val) {
      eventBus.$emit(val);
    },
  },
};
</script>

<style lang="scss">
.side-panel-wrapper {
  .mapgis-ui-layout-sider-children {
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: flex-end;
    background: transparent;
  }
}
</style>

<style lang="scss" scoped>
.side-panel-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 500;
  height: 100%;
  background: transparent;
  .window-wrapper {
    flex: auto;
    transition: none;
    border: none;
    overflow: hidden;
    background: transparent;
    // overflow-x: hidden;
    .close-button {
      cursor: pointer;
      &:hover {
        color: $primary-color;
      }
    }
    .window-content {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
    ::v-deep .mapgis-ui-tabs-extra-content {
      line-height: 36px;
    }
    ::v-deep .mapgis-ui-tabs-nav-container {
      height: 36px;
      line-height: 5px;
    }
    ::v-deep .mapgis-ui-tabs-tab {
      font-size: 14px;
    }
    ::v-deep .mapgis-ui-card-head {
      background-color: rgba(20, 20, 20, 1);
    }
    ::v-deep .mapgis-ui-card-body {
      background-color: rgba(38, 42, 48, 0.8);
    }
  }
}
</style>
