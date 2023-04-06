<template>
  <mapgis-ui-layout-footer class="footer-wrapper">
    <mp-exhibition-panel :max-view-height="maxViewHeight" />
  </mapgis-ui-layout-footer>
</template>

<script>
import { ThemeContentMixin } from "@mapgis/web-app-framework";

export default {
  name: "MpPanSpatialMapFooter",
  mixins: [ThemeContentMixin],
  props: { maxViewHeight: Number },
};
</script>

<style lang="less" scoped>
.footer-wrapper {
  z-index: 500;
  padding: 0;
}
</style>
