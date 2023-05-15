<template>
  <mp-pan-spatial-map-side-window
    ref="sideWindow"
    :title="widgetInfo.label"
    :has-tabs="hasTabs"
    :tab-list="getTabs"
    :icon="widgetInfo.icon"
    :is-full-screen="isFullScreen(widgetInfo)"
    :width="getWidth(widgetInfo)"
    :has-padding="hasPadding(widgetInfo)"
    :max-width="maxWidth"
    :visible="visible"
    @update:visible="onUpdateVisible"
    @changeTab="changeTab"
  >
    <template v-if="!hasTabs">
      <component
        :is="widget.manifest.component"
        :widget="widget"
        @update-widget-state="$emit('update-widget-state', $event)"
      />
    </template>
    <template v-if="hasTabs">
      <component
        v-for="widgetChildren in widget.children"
        v-show="widgetChildren.id === multiChildController.getActiveId()"
        :is="widgetChildren.manifest.component"
        :key="widgetChildren.manifest.component"
        :widget="widgetChildren"
        @update-widget-state="$emit('update-widget-state', $event)"
      />
    </template>
  </mp-pan-spatial-map-side-window>
</template>

<script>
import {
  WidgetInfoMixin,
  WidgetManager,
  MultiChildController,
} from "@mapgis/web-app-framework";
import MpPanSpatialMapSideWindow from "./SideWindow.vue";

export default {
  name: "MpPanSpatialMapSideCard",
  components: { MpPanSpatialMapSideWindow },
  mixins: [WidgetInfoMixin],
  props: {
    visible: { type: Boolean, default: true },
    maxWidth: { type: [Number, Function] },
  },
  data() {
    return {
      multiChildController: MultiChildController,
    };
  },
  computed: {
    hasTabs() {
      return this.widget.children && this.widget.children.length > 0;
    },
    isFullScreen() {
      // 若有chilren则默认其中第一个微件的配置,下同
      return (widgetInfo) => {
        return this.hasTabs
          ? this.widget.children[0].manifest.properties.windowSize === "max"
          : widgetInfo.properties.windowSize === "max";
      };
    },
    getWidth() {
      return (widgetInfo) => {
        return this.hasTabs
          ? this.widget.children[0].manifest.properties.customWidth
          : widgetInfo.properties.customWidth;
      };
    },
    hasPadding() {
      return (widgetInfo) => {
        return this.hasTabs
          ? this.widget.children[0].manifest.properties.hasPadding
          : widgetInfo.properties.hasPadding;
      };
    },
    getTabs() {
      const tabs = [];
      if (this.hasTabs) {
        this.widget.children.forEach((item) => {
          const data = {
            key: item.id,
            tab: item.manifest.name,
          };
          tabs.push(data);
        });
      }
      return tabs;
    },
    showActiveWidget() {
      return (widget) => {
        return WidgetManager.getInstance().isWidgetActive(widget);
      };
    },
  },
  watch: {
    visible(val) {
      if (val) {
        MultiChildController.isMultiTabsChild(this.widget.id) &&
          this.changeTab(MultiChildController.getActiveId());
      }
    },
  },
  methods: {
    onUpdateVisible(value) {
      this.$emit("update:visible", value);
    },

    changeTab(val) {
      const widget = this.widget.children.find((item) => item.id === val);
      if (widget) {
        WidgetManager.getInstance().operateWidget(this.widget.children, val);
        MultiChildController.setActiveId(widget.id);
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
