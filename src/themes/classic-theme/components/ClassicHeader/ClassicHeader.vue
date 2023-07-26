<template>
  <mp-pan-spatial-map-header :theme-mode="themeMode">
    <div slot="header-content" class="header-menu">
      <mapgis-ui-menu
        class="menu"
        :theme="menuTheme"
        mode="horizontal"
        @select="onSelect"
      >
        <mapgis-ui-menu-item v-for="widget in currentWidgets" :key="widget.id">
          <mapgis-ui-icon :icon="getWidgetIcon(widget)" class="icon" />
          <span>{{ getWidgetLabel(widget) }}</span>
        </mapgis-ui-menu-item>
      </mapgis-ui-menu>
    </div>
    <template #header-right>
      <div
        v-for="(item, index) in application.links"
        :key="index"
        class="linkItem"
      >
        <a :href="item.url" target="_blank" class="header-links">{{
          item.label
        }}</a>
      </div>
      <mp-pan-spatial-map-header-avatar
        v-if="isHeaderAvatarComponentExist"
        class="header-item"
      />
      <mapgis-ui-tooltip placement="bottom" v-if="isAboutComponentExist">
        <template slot="title">
          <span>关于</span>
        </template>
        <mapgis-ui-iconfont
          type="mapgis-info-circle"
          class="header-item"
          @click="onShowAboutInfo"
        />
        <mp-window-wrapper :visible="aboutWindowVisible">
          <template v-slot:default="slotProps">
            <mp-window
              title="关于"
              :visible.sync="aboutWindowVisible"
              :anchor="'top-center'"
              :verticalOffset="150"
              :shrink-action="false"
              :full-screen-action="false"
              v-bind="slotProps"
            >
              <template>
                <mp-pan-spatial-map-about />
              </template>
            </mp-window>
          </template>
        </mp-window-wrapper>
      </mapgis-ui-tooltip>
    </template>
  </mp-pan-spatial-map-header>
</template>

<script>
import { ThemeContentMixin, WidgetManager } from '@mapgis/web-app-framework'
import { mapState } from 'vuex'
import {
  MpPanSpatialMapHeader,
  isExternalLayoutElementComponentExist,
} from '../../../../components'

export default {
  name: 'MpPanSpatialMapClassicHeader',
  components: {
    MpPanSpatialMapHeader,
  },
  mixins: [ThemeContentMixin],
  data() {
    return {
      aboutWindowVisible: false,
    }
  },
  computed: {
    // ...mapState("setting", { themeMode: (state) => state.theme.mode }),
    themeMode() {
      return 'light'
    },
    menuTheme() {
      return this.themeMode === 'technology' ? 'dark' : this.themeMode
    },
    isHeaderAvatarComponentExist() {
      return isExternalLayoutElementComponentExist(
        'MpPanSpatialMapHeaderAvatar'
      )
    },
    isAboutComponentExist() {
      return isExternalLayoutElementComponentExist('MpPanSpatialMapAbout')
    },
    currentWidgets() {
      return this.is2DMapMode ? this.widgets2d : this.widgets3d
    },
  },
  methods: {
    onSelect({ key }) {
      WidgetManager.getInstance().triggerWidgetOpen(
        this.widgets.find((val) => {
          return val.id === key
        })
      )
    },
    onShowAboutInfo() {
      this.aboutWindowVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.header-wrapper {
  .header-wide {
    .linkItem {
      padding: 0 4px;
    }
    .header-menu {
      height: 100%;
      .menu {
        height: 100%;
        border: none;
        box-shadow: none;
        .icon {
          margin-right: 10px;
        }
      }
    }
    .header-links {
      font-size: 500;
      color: unset;
    }
  }
}
</style>
