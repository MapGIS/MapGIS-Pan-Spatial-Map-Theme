<template>
  <mp-pan-spatial-map-side-window
    ref="sideWindow"
    :title="getWidgetTitle(widgetInfo)"
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
        :is="getComponent(widget)"
        :widget="getWidget(widget)"
        @update-widget-state="$emit('update-widget-state', $event)"
      />
    </template>
    <template v-if="hasTabs">
      <!-- <component
        v-for="widgetChildren in widget.children"
        v-show="showComponent(widgetChildren)"
        :is="widgetChildren.manifest.component"
        :key="widgetChildren.manifest.component"
        :widget="widgetChildren"
        @update-widget-state="$emit('update-widget-state', $event)"
      /> -->
      <keep-alive>
        <component
          :is="getActiveComponent"
          :key="getActiveKey"
          :widget="getActiveWidget"
          @update-widget-state="$emit('update-widget-state', $event)"
        />
      </keep-alive>
    </template>
  </mp-pan-spatial-map-side-window>
</template>

<script>
import {
  WidgetInfoMixin,
  WidgetManager,
  MultiChildController,
} from '@mapgis/web-app-framework'
import MpPanSpatialMapSideWindow from './SideWindow.vue'

export default {
  name: 'MpPanSpatialMapSideCard',
  components: { MpPanSpatialMapSideWindow },
  mixins: [WidgetInfoMixin],
  props: {
    visible: { type: Boolean, default: true },
    maxWidth: { type: [Number, Function] },
  },
  data() {
    return {
      multiChildController: MultiChildController,
      activeWidget: null,
    }
  },
  computed: {
    getActiveWidget() {
      return this.activeWidget || null
    },
    getActiveComponent() {
      return this.activeWidget ? this.activeWidget.manifest.component : ''
    },
    getActiveKey() {
      return this.activeWidget ? this.activeWidget.id : ''
    },
    getWidgetTitle() {
      return (widgetInfo) => {
        if (this.widget.children) {
          return this.widget.children[0].manifest.name || ''
        } else {
          return widgetInfo.label
        }
      }
    },
    getWidget() {
      return (widget) => {
        return widget.children ? widget.children[0] : widget
      }
    },
    getComponent() {
      return (widget) => {
        return widget.children
          ? widget.children[0].manifest.component
          : widget.manifest.component
      }
    },
    showComponent() {
      return (widgetChildren) => {
        return widgetChildren.id === this.multiChildController.getActiveId()
      }
    },
    hasTabs() {
      return this.widget.children && this.widget.children.length > 1
    },
    isFullScreen() {
      // 若有chilren则默认其中第一个微件的配置,下同
      return (widgetInfo) => {
        return this.hasTabs
          ? this.widget.children[0].manifest.properties.windowSize === 'max'
          : widgetInfo.properties.windowSize === 'max'
      }
    },
    getWidth() {
      return (widgetInfo) => {
        return this.hasTabs
          ? this.widget.children[0].manifest.properties.customWidth
          : widgetInfo.properties.customWidth
      }
    },
    hasPadding() {
      return (widgetInfo) => {
        return this.hasTabs
          ? this.widget.children[0].manifest.properties.hasPadding
          : widgetInfo.properties.hasPadding
      }
    },
    getTabs() {
      const tabs = []
      if (this.hasTabs) {
        this.widget.children.forEach((item) => {
          const data = {
            key: item.id,
            tab: item.manifest.name,
          }
          tabs.push(data)
        })
      }
      return tabs
    },
    showActiveWidget() {
      return (widget) => {
        return WidgetManager.getInstance().isWidgetActive(widget)
      }
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.activeWidget = null
        this.$nextTick(() => {
          MultiChildController.getCurrentFolderId() === this.widget.id &&
            this.changeTab(MultiChildController.getActiveId())
        })
      }
    },
  },
  mounted() {
    if (
      this.widget &&
      this.widget.children &&
      this.widget.children.length > 1
    ) {
      this.activeWidget = this.widget.children[0]
    }
  },
  methods: {
    onUpdateVisible(value) {
      this.$emit('update:visible', value)
    },

    changeTab(val) {
      const widget = this.widget.children.find((item) => item.id === val)
      this.activeWidget = widget
      if (widget) {
        WidgetManager.getInstance().operateWidget(this.widget.children, val)
        MultiChildController.setActiveId(widget.id)
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
