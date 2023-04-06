<template>
  <mp-pan-spatial-map-side-window-dcd
    ref="sideWindow"
    :title="widgetInfo.label"
    :icon="widgetInfo.icon"
    :component="widgetInfo.component"
    :is-full-screen="widgetInfo.properties.windowSize === 'max'"
    :width="widgetInfo.properties.customWidth"
    :has-padding="widgetInfo.properties.hasPadding"
    :max-width="maxWidth"
    :visible="visible"
    @update:visible="onUpdateVisible"
  >
    <template>
      <component
        :is="widget.manifest.component"
        :widget="widget"
        @update-widget-state="$emit('update-widget-state', $event)"
      />
    </template>
  </mp-pan-spatial-map-side-window-dcd>
</template>

<script>
import { WidgetInfoMixin } from "@mapgis/web-app-framework";
import MpPanSpatialMapSideWindowDcd from "./SideWindow.vue";

export default {
  name: "MpPanSpatialMapSideCardDcd",
  components: { MpPanSpatialMapSideWindowDcd },
  mixins: [WidgetInfoMixin],
  props: {
    visible: { type: Boolean, default: true },
    maxWidth: { type: [Number, Function] },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    onUpdateVisible(value) {
      this.$emit("update:visible", value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
