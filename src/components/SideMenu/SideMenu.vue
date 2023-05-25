<template>
  <mapgis-ui-layout-sider
    :theme="sideTheme"
    :class="[themeMode, 'side-menu-wrapper']"
    v-model="collapsedVal"
    :collapsedWidth="collapsedWidth"
    :collapsible="collapsible"
    :collapsed="true"
    :trigger="null"
    :width="width"
  >
    <div class="side-menu beauty-scroll">
      <mapgis-ui-menu
        class="menu"
        :theme="sideTheme"
        @click="onClick"
        mode="inline"
        v-model="selectedKeys"
      >
        <mapgis-ui-menu-item
          v-for="widget in widgetStructureSider"
          :key="widget.id"
        >
          <mapgis-ui-icon :icon="getWidgetIcon(widget)" class="icon" />
          <span>{{ getWidgetLabel(widget) }}</span>
        </mapgis-ui-menu-item>
      </mapgis-ui-menu>
    </div>
    <div class="side-links" v-if="collapsible">
      <mapgis-ui-menu
        class="menu"
        :theme="sideTheme"
        :inlineIndent="16"
        :selectedKeys="[]"
        :openKeys="[]"
        mode="inline"
      >
        <mapgis-ui-menu-item
          class="side-collapsed-button"
          title=""
          @click="collapsedVal = !collapsedVal"
        >
          <mapgis-ui-icon :type="collapsedVal ? 'menu-unfold' : 'menu-fold'" />
        </mapgis-ui-menu-item>
      </mapgis-ui-menu>
    </div>
  </mapgis-ui-layout-sider>
</template>

<script>
import {
  ThemeContentMixin,
  WidgetManager,
  WidgetState,
  MultiChildController
} from '@mapgis/web-app-framework'

export default {
  name: 'MpPanSpatialMapSideMenu',
  mixins: [ThemeContentMixin],
  props: {
    width: {
      type: Number,
      default: 208
    },
    // 是否可收起
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    // 当前收起状态
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsedWidth: {
      type: Number,
      default: 48
    },
    themeMode: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  data() {
    return {
      collapsedVal: this.collapsed,
      selectedKeys: []
    }
  },
  computed: {
    sideTheme() {
      return 'light'
    }
  },
  methods: {
    onClick({ key }) {
      if (this.selectedKeys[0] === key) {
        this.selectedKeys = []
      }
      let widgetStructure
      if (this.widgetStructure.length === 0) {
        widgetStructure = this.widgets
      } else {
        widgetStructure = this.widgetStructure
      }
      const currentWidget = widgetStructure.find(widget => widget.id === key)

      if (currentWidget) {
        let activeWidget
        if (currentWidget.children && currentWidget.children.length > 1) {
          MultiChildController.setCurrentTabs(currentWidget.id)
          activeWidget = this.widgets.find(
            widget =>
              widget.id === MultiChildController.getCurrentTabs().initKey
          )
        } else if(currentWidget.children && currentWidget.children.length === 1) {
          const currentWidgetKey = currentWidget.children[0].id
          activeWidget = this.widgets.find(
            widget => widget.id === currentWidgetKey
          )
          this.widgets.forEach(widget => {
            if (widget.id !== currentWidgetKey) {
              WidgetManager.getInstance().closeWidget(widget)
            }
          })
        } else {
          activeWidget = this.widgets.find(
            widget => widget.id === currentWidget.id
          )

          this.widgets.forEach(widget => {
            if (widget.id !== currentWidget.id) {
              WidgetManager.getInstance().closeWidget(widget)
            }
          })
        }

        WidgetManager.getInstance().triggerWidgetOpen(activeWidget)
      }
    },
    onUpdateWidgetState({ widget, newState }) {
      if (
        newState == WidgetState.CLOSED &&
        this.selectedKeys[0] === widget.id
      ) {
        this.selectedKeys = []
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../index.scss';
.side-menu-wrapper {
  .mapgis-ui-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>

<style lang="scss" scoped>
.side-menu-wrapper {
  display: flex;
  flex-direction: column;
  overflow: auto;
  z-index: 1000;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  .side-collapsed-button {
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    .anticon {
      font-size: 16px;
    }
  }
  &.light {
    .side-collapsed-button {
      border-top: 1px solid $border-color;
    }
  }
  .side-menu {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    .menu {
      box-shadow: none;
      .icon {
        margin-right: 10px;
      }
    }
  }
  .side-links {
    background: transparent;
  }
  .anticon anticon-menu-fold {
    background: transparent;
  }
}
</style>
