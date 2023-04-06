<template>
  <mp-pan-spatial-map-side-menu-dcd
    :theme-mode="sideTheme"
    :collapsible="false"
    :collapsed="true"
    :content="content"
    :widgets="widgets"
    :widgetStructure="widgetStructure"
    :panel="panel"
    ref="sideMenu"
    class="right_panel_menu_dcd"
  />
</template>

<script>
import { ThemeContentMixin } from "@mapgis/web-app-framework";
import { mapState } from "vuex";
import MpPanSpatialMapSideMenuDcd from "../../../../components/SideMenu/dcd/SideMenu.vue";

export default {
  name: "MpPanSpatialMapClassicRightDcd",
  components: { MpPanSpatialMapSideMenuDcd },
  mixins: [ThemeContentMixin],
  computed: {
    ...mapState("setting", { themeMode: (state) => state.theme.mode }),
    sideTheme() {
      if (this.themeMode == "dark") {
        return "light";
      }
      return this.themeMode;
    },
  },
  methods: {
    onUpdateWidgetState(e) {
      this.$refs.sideMenu.onUpdateWidgetState(e);
    },
  },
};
</script>
