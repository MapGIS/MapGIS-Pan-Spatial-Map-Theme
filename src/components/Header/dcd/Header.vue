<template>
  <a-layout-header :class="[themeMode, 'header-wrapper']">
    <div class="header-wide">
      <div class="header-left">
        <slot name="header-left">
          <div :class="['logo', themeMode]">
            <h1>{{ application.title }}</h1>
            <h2>{{ application.subtitle }}</h2>
          </div>
        </slot>
      </div>
      <div class="header-content">
        <slot name="header-content" />
      </div>
      <div :class="['header-right-dcd', themeMode]">
        <slot name="header-right" />
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { AppMixin } from "@mapgis/web-app-framework";

export default {
  name: "MpPanSpatialMapHeaderDcd",
  mixins: [AppMixin],
  props: {
    themeMode: {
      type: String,
      required: false,
      default: "dark",
    },
  },
  data() {
    return {}
  },
  computed: {
    // dark主题下header主色调与light不同
    themeStyle() {
      if (this.application.theme) {
        if (this.application.theme.style) {
          if (this.application.theme.manifest) {
            const style = this.application.theme.manifest.styles.find(
              (item) => {
                return item.name === this.application.theme.style;
              }
            );

            if (style) {
              return {
                color: style.color,
                theme: style.theme,
              };
            }
          }
        } else if (this.application.theme.customStyle) {
          return this.application.theme.customStyle;
        }
      }
      return { theme: "dark", color: "#1890ff" };
    },
  },
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  height: 64px;
  line-height: 64px;
  padding: 0;
  z-index: 1000;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  &.dark,
  &.night {
    background: $layout-header-background;
    color: white;
  }
  .header-wide {
    display: flex;
    height: 100%;
    padding-left: 0px;
    background-color: #051535;
    .header-left {
      display: flex;
      min-width: 60%;
      background-image: url("./top-bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .logo {
        position: relative;
        height: 100%;
        overflow: hidden;

        h1 {
          display: inline-block;
          margin: 0 0 0 12px;
          font-weight: 400;
          font-size: 26px;
          vertical-align: top;
          color: inherit;
          white-space: pre;
        }
        h2 {
          display: inline-block;
          margin: 0 0 0 12px;
          font-weight: 400;
          font-size: 14px;
          vertical-align: top;
          color: inherit;
        }
      }
    }
    .header-content {
      flex: 1 1 0%;
      min-width: 0;
    }
  }
}
</style>

<style lang="scss">
$theme-list: light, dark, night;
$header-right-background: (
  hover-bg-color-dark: $hover-bg-color-dark,
  hover-bg-color-light: $hover-bg-color-light,
  hover-bg-color-night: $hover-bg-color-night,
);
.header-wrapper {
  .header-wide {
    .header-right-dcd {
      display: flex;
      float: right;
      height: 64px;
      overflow: hidden;
      padding-right: 8px;
      color: inherit;
      .header-item {
        height: 100%;
        display: flex;
        align-items: center;
        color: inherit;
        padding: 0 12px;
        cursor: pointer;
        a {
          color: inherit;
          i {
            font-size: 16px;
          }
        }
      }
      @each $theme in $theme-list {
        &.#{$theme} .header-item {
          &:hover {
            background-color: map-get(
              $header-right-background,
              hover-bg-color-#{$theme}
            );
          }
        }
      }
    }
  }
}
</style>
