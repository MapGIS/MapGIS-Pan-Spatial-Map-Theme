<template>
  <div :class="{ command: true, active: active }" @click="$emit('click')">
    <mapgis-ui-icon :icon="widgetInfo.icon" class="icon" />
    <span class="label">{{ widgetInfo.label }}</span>
  </div>
</template>

<script>
import { WidgetInfoMixin } from "@mapgis/web-app-framework";

export default {
  name: "MpPanSpatialMapToolbarButton",
  mixins: [WidgetInfoMixin],
  props: {
    active: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.command {
  display: flex;
  align-items: center;
  height: 32px;
  cursor: pointer;
  .icon {
    font-size: 16px;
    margin-right: 8px;
    height: 16px;
  }
  .label {
    font-size: 12px;
  }
  &:hover,
  &.active {
    color: $primary-color;
  }
}
</style>
