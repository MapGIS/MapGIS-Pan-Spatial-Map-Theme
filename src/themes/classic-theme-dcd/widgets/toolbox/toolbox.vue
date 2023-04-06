<template>
  <div class="mp-widget-toolbox">
    <component
      :is="parseContentComponent('toolbar')"
      ref="toollistContent"
      v-bind="parseContentProps('toolbar')"
    />
  </div>
</template>

<script>
import { WidgetMixin } from "@mapgis/web-app-framework";

export default {
  name: "MpToolbox",
  mixins: [WidgetMixin],
  computed: {
    toollist() {
      return this.application.contentWidgets.groups.find((item) => {
        return item.content === "toolbar";
      });
    },
  },
  methods: {
    parseContentComponent(contentName) {
      const content = this.getContent(contentName);

      if (content) {
        return content.component;
      }

      return undefined;
    },
    parseContentProps(contentName) {
      const content = this.getContent(contentName);

      let props = {};

      if (content) {
        props = this.mergeProps(this.toollist, content);
      }

      return props;
    },
    getContent(contentName) {
      if (this.theme && this.theme.manifest && this.theme.manifest.contents) {
        const content = this.theme.manifest.contents.find(
          (c) => c.name === contentName
        );

        if (content) return content;
      }

      return undefined;
    },
    onClose() {
      this.$refs.toollistContent.closeAllWidgets();
    },
  },
};
</script>

<style lang="scss" scoped>
.mp-widget-toolbox {
}
</style>
