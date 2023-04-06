import {
  setExternalLayoutElementComponents,
  MpPanSpatialMapHeader,
  MpPanSpatialMapSideMenu,
  MpPanSpatialMapFooter,
  MpPanSpatialMapHeaderDcd,
  MpPanSpatialMapSideMenuDcd,
  MpPanSpatialMapToolListButtonDcd,
} from "./components";

import {
  MpPanSpatialMapClassicTheme,
  MpPanSpatialMapClassicHeader,
  MpPanSpatialMapClassicLeft,
  MpPanSpatialMapClassicToolbar,
  MpPanSpatialMapClassicThemeDcd,
  MpPanSpatialMapClassicHeaderDcd,
  MpPanSpatialMapClassicLeftDcd,
  MpPanSpatialMapClassicRightDcd,
  MpPanSpatialMapClassicToolListDcd,
  MpToolbox,
} from "./themes";

const components = [
  MpPanSpatialMapHeader,
  MpPanSpatialMapSideMenu,
  MpPanSpatialMapFooter,
  MpPanSpatialMapHeaderDcd,
  MpPanSpatialMapSideMenuDcd,
  MpPanSpatialMapToolListButtonDcd,
  MpPanSpatialMapClassicTheme,
  MpPanSpatialMapClassicHeader,
  MpPanSpatialMapClassicLeft,
  MpPanSpatialMapClassicToolbar,
  MpPanSpatialMapClassicThemeDcd,
  MpPanSpatialMapClassicHeaderDcd,
  MpPanSpatialMapClassicLeftDcd,
  MpPanSpatialMapClassicRightDcd,
  MpPanSpatialMapClassicToolListDcd,
  MpToolbox,
];

const install = (Vue, opts = {}) => {
  components.forEach((component) => {
    Vue.component(
      (component.options && component.options.name) || component.name,
      component
    );
  });

  if (opts.components) {
    for (const key in opts.components) {
      if (Object.hasOwnProperty.call(opts.components, key)) {
        const component = opts.components[key];
        Vue.component(key, component);
      }
    }

    setExternalLayoutElementComponents(opts.components);
  }
};

export default {
  install,
};
