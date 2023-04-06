<!--
<template>
  <div :class="{ command: true, active: active }" @click="$emit('click')">
    <mapgis-ui-icon :icon="widgetInfo.icon" class="icon" />
    <span class="label">{{ widgetInfo.label }}</span>
  </div>
</template>
-->
<template>
  <div
    :class="{
      'basemap-item': !this.active,
      'basemap-item-active': this.active,
    }"
    @click="$emit('click')"
  >
    <div class="item-image">
      <mapgis-ui-icon :icon="widgetInfo.icon" class="icon_css" />
    </div>
    <div class="item-name">{{ widgetInfo.label }}</div>
  </div>
</template>

<script>
import { WidgetInfoMixin } from "@mapgis/web-app-framework";

export default {
  name: "MpPanSpatialMapToolListButtonDcd",
  mixins: [WidgetInfoMixin],
  props: {
    active: { type: Boolean, default: false },
  },
  methods: {
    onMyClick() {
      // this.active = true
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.basemap-item {
  display: inline-block;
  vertical-align: top;
  margin: 5px 20px;
  width: 70px;
  text-align: center;
  cursor: pointer;
  .item-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 66.5%; /*相对于这个盒子的宽度设置的，为保证图片比例，其值=width * 80%*/
    box-sizing: border-box;
    border: 1px solid;
    border-radius: 5px;
    border-color: transparent;
    .icon_css {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // border: solid 1px @border-color;
      border-radius: 5px;
    }
    .icon_css /deep/ .icon {
      width: 100%;
      height: 100%;
      > svg {
        width: 70%;
        height: 70%;
        margin-top: 12%;
      }
    }
  }
  .item-name {
    font-size: 12px;
    text-align: center;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  &:hover {
    .item-image {
      background: $primary-color;
    }
    .item-name {
      text-decoration: underline;
    }
  }
}
.basemap-item-active {
  display: inline-block;
  vertical-align: top;
  margin: 5px 20px;
  width: 70px;
  text-align: center;
  cursor: pointer;
  .item-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 66.5%; /*相对于这个盒子的宽度设置的，为保证图片比例，其值=width * 80%*/
    box-sizing: border-box;
    background: $primary-color;
    border: 1px solid;
    border-radius: 5px;
    .icon_css {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // border: solid 1px @border-color;
      border-radius: 5px;
    }
    .icon_css /deep/ .icon {
      width: 100%;
      height: 100%;
      > svg {
        width: 70%;
        height: 70%;
        margin-top: 12%;
      }
    }
  }
  .item-name {
    font-size: 12px;
    text-align: center;
    word-wrap: break-word;
    white-space: pre-wrap;
    color: $primary-color;
  }
}
</style>
