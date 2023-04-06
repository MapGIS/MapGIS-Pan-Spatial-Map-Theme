<template>
  <div class="toollist-content">
    <template v-for="widget in widgets">
      <tool-list-button-dcd
        :widget="widget"
        :key="widget.id"
        :active="isActiveWidget(widget)"
        @click="onWidgetClick(widget)"
      />
    </template>
  </div>
</template>

<script>
import {
  ThemeContentMixin,
  WidgetManager,
  WidgetState,
} from "@mapgis/web-app-framework";
import ToolListButtonDcd from "../../../../components/ToolbarButton/dcd/ToolListButton.vue";

export default {
  name: "MpPanSpatialMapClassicToolListDcd",
  components: { ToolListButtonDcd },
  mixins: [ThemeContentMixin],
  methods: {
    onWidgetClick(widget) {
      WidgetManager.getInstance().triggerWidgetOpen(widget);
    },
    isActiveWidget(widget) {
      if (widget.state !== WidgetState.CLOSED) {
        return true;
      } else {
        return false;
      }
    },
    closeAllWidgets() {
      this.widgets.forEach((widget) => {
        WidgetManager.getInstance().closeWidget(widget);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.toollist-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
