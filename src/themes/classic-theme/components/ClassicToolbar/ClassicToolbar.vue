<template>
  <div class="toolbar-wrapper">
    <div :class="[themeMode, 'toolbar-button-list']">
      <div class="toolbar-collapse-button" @click="collapsed = !collapsed">
        <mapgis-ui-iconfont
          :type="collapsed ? 'mapgis-chevrons-left' : 'mapgis-chevrons-right'"
        />
      </div>
      <div class="toolbar-content" v-show="!collapsed">
        <template v-for="(widget, index) in currentExpandPopularWidgets">
          <mapgis-ui-divider type="vertical" :key="index" />
          <toolbar-button
            :widget="widget"
            :key="widget.id"
            :active="selectWidgetId == widget.id"
            @click="onWidgetClick(widget)"
          />
        </template>
        <div class="toolbar-more">
          <mapgis-ui-divider type="vertical" />
          <div
            :class="{ 'toolbar-more-button': true, active: morePanel }"
            @click="onMoreButtonClick"
          >
            <mapgis-ui-iconfont type="mapgis-more" />
          </div>
        </div>
      </div>
      <mapgis-ui-collapse
        v-show="morePanel"
        class="toolbar-more-panel beauty-scroll"
      >
        <mapgis-ui-collapse-panel
          v-for="widgetGroup in currentMoreWidgets"
          :key="widgetGroup.id"
          :header="widgetGroup.label"
        >
          <mapgis-ui-list
            :grid="{ gutter: 16, column: 2 }"
            :data-source="widgetGroup.children"
          >
            <mapgis-ui-list-item slot="renderItem" slot-scope="widget">
              <toolbar-card
                v-if="!widget.type || widget.type == 'widget'"
                :widget="widget"
                :key="widget.id"
                @click="onMoreWidgetClick(widget)"
              />
            </mapgis-ui-list-item>
          </mapgis-ui-list>
        </mapgis-ui-collapse-panel>
      </mapgis-ui-collapse>
    </div>
  </div>
</template>

<script>
import {
  ThemeContentMixin,
  WidgetManager,
  WidgetState,
  UUID
} from '@mapgis/web-app-framework'
import { mapState } from 'vuex'
import ToolbarButton from '../../../../components/ToolbarButton/ToolbarButton.vue'
import ToolbarCard from '../../../../components/ToolbarCard/ToolbarCard.vue'

export default {
  name: 'MpPanSpatialMapClassicToolbar',
  components: { ToolbarButton, ToolbarCard },
  mixins: [ThemeContentMixin],
  props: {
    maxWidgets: { type: Number, default: 8 }
  },
  data() {
    return {
      collapsed: false,
      morePanel: false,
      selectWidgetId: ''
    }
  },
  computed: {
    ...mapState('setting', { themeMode: (state) => state.theme.mode }),
    currentWidgetStructure() {
      return this.is2DMapMode ? this.widgetStructure2d : this.widgetStructure3d
    },
    currentPopularWidgets() {
      return this.currentWidgetStructure.filter((widget) => {
        const { type = 'widget' } = widget
        return type == 'widget'
      })
    },
    currentNoPopularWidgets() {
      return this.currentWidgetStructure.filter((widget) => {
        const { type = 'widget' } = widget
        return type == 'folder'
      })
    },
    currentExpandPopularWidgets() {
      return this.currentPopularWidgets.slice(0, this.maxWidgets)
    },
    currentUnExpandPopularWidgets() {
      return this.currentPopularWidgets.slice(this.maxWidgets)
    },
    currentMoreWidgets() {
      const widgets = []

      if (this.currentUnExpandPopularWidgets.length > 0) {
        widgets.push({
          id: `folder_${UUID.uuid()}`,
          type: 'folder',
          label: '未分组',
          children: this.currentUnExpandPopularWidgets
        })
      }

      return widgets.concat(this.currentNoPopularWidgets)
    },
    singleWidgetsMode() {
      // 与PanelMixin逻辑保持一致
      return this.panel && (!this.panel.mode || this.panel.mode === 'single')
    }
  },
  methods: {
    onWidgetClick(widget) {
      if (this.singleWidgetsMode) {
        this.morePanel = false
      }
      WidgetManager.getInstance().triggerWidgetOpen(widget)
    },
    onMoreWidgetClick(widget) {
      if (this.singleWidgetsMode) {
        this.morePanel = false
      }
      WidgetManager.getInstance().triggerWidgetOpen(widget)
    },
    onMoreButtonClick() {
      this.morePanel = !this.morePanel
      console.warn(
        '点击更多',
        this.application,
        this.singleWidgetsMode,
        this.$props
      )
      if (this.singleWidgetsMode) {
        // 内容区域微件面板的mode属性设为single时启用下方代码
        this.widgets.forEach((widget) => {
          if (WidgetManager.getInstance().isWidgetVisible(widget)) {
            WidgetManager.getInstance().closeWidget(widget)
          }
        })
      }
    },
    onUpdateWidgetState({ widget, newState, oldState }) {
      if (newState !== WidgetState.CLOSED) {
        this.selectWidgetId = widget.id
      } else {
        if (this.selectWidgetId == widget.id) {
          this.selectWidgetId = ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar-wrapper {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  .toolbar-button-list {
    position: relative;
    box-sizing: content-box;
    padding: 0 8px;
    height: 32px;
    line-height: 16px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    background-color: $body-background;
    color: $text-color;
    box-shadow: 0px 1px 2px 0px $shadow-color;
    .toolbar-collapse-button,
    .toolbar-more-button {
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      cursor: pointer;
      &:hover,
      &.active {
        color: $primary-color;
      }
    }
    .mapgis-ui-divider-vertical {
      background: $border-color-base;
    }
    .toolbar-content,
    .toolbar-more {
      display: flex;
      align-items: center;
      .mapgis-ui-divider-vertical {
        top: 0;
      }
    }
    .toolbar-more-panel {
      position: absolute;
      right: 0;
      top: 42px;
      width: 180px;
      max-height: 400px;
      overflow-y: auto;
      &.mapgis-ui-collapse {
        background: $base-bg-color;
        box-shadow: 0px 1px 2px 0px $shadow-color;
        > .mapgis-ui-collapse-item {
          &.mapgis-ui-collapse-item-active {
            ::v-deep.mapgis-ui-collapse-header {
              border-left: none !important;
              > .mapgis-ui-collapse-arrow {
                color: $primary-color;
              }
            }
          }
        }
      }
    }
  }
  .technology {
    border: 1px solid #00cbf0;
    box-shadow: inset 0px 0px 5px #0e6777;
  }
}
</style>

<style lang="scss">
.toolbar-more-panel {
  &.mapgis-ui-collapse {
    border: none;
    border-radius: 2px;
    > .mapgis-ui-collapse-item {
      border-bottom: none;
      > .mapgis-ui-collapse-header {
        padding: 0 0 0 32px;
        line-height: 32px;
        .mapgis-ui-collapse-arrow {
          left: 10px;
        }
      }
      &:last-child {
        > .mapgis-ui-collapse-header {
          border-radius: 0;
        }
        > .mapgis-ui-collapse-content {
          padding-bottom: 10px;
        }
      }
    }
  }
  .mapgis-ui-collapse-content {
    background: none;
    border-top: none;
    > .mapgis-ui-collapse-content-box {
      padding: 0;
    }
  }
  .mapgis-ui-list-grid .mapgis-ui-col > .mapgis-ui-list-item {
    margin-bottom: 0;
  }
}
</style>
