/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import {Layout, Options, LayoutRoot} from "./navigation";
import {
  NavConfig,
  TrackerInterface,
  TrackingProperties,
  LogLevel,
  PermissionKind,
  PermissionStatus,
  BaseProfile,
  TrackingConfig,
  UnifiedTheme,
  UnifiedThemeConfig,
} from "./Common";

const DEFAULT_FONT = "Cochin";
const DEFAULT_BOLD_FONT = "Cochin";

const DefaultTheme: UnifiedTheme = {
  // Primary colors
  red: "#bd081c",
  white: "#fdfdfd",
  lightGray: "#efefef",
  gray: "#8e8e8e",
  darkGray: "#111",
  // secondary colors
  green: "#0fa573",
  pine: "#0a6955",
  olive: "#364a4c",
  blue: "#4a90e2",
  navy: "#004b91",
  midnight: "#133a5e",
  purple: "#b469eb",
  orchid: "#8046a5",
  eggplant: "#5b2677",
  maroon: "#6e0f3c",
  watermelon: "#f13535",
  orange: "#e3780c",

  primaryLighter: "#4ED456",
  primaryLight: "#28CA32",
  primary: "#00BD0C",
  primaryDark: "#00960A",
  primaryDarker: "#007508",

  secondaryLighter: "#41AAAE",
  secondaryLight: "#20989D",
  secondary: "#018B91",
  secondaryDark: "#016E73",
  secondaryDarker: "#00565A",

  accentLighter: "#FF625D",
  accentLight: "#FF3732",
  accent: "#F00600",
  accentDark: "#BE0500",
  accentDarker: "#950400",

  tertiaryLighter: "#FFCF67",
  tertiaryLight: "#FFC23E",
  tertiary: "#FFB109",
  tertiaryDark: "#CA8A00",
  tertiaryDarker: "#9F6D00",

  // From the Atlassian templates
  neutral900: "#091E42",
  neutral800: "#172B4D",
  neutral700: "#253858",
  neutral600: "#344563",
  neutral500: "#42526E",
  neutral400: "#505F79",
  neutral300: "#5E6C84",
  neutral200: "#6B778C",
  neutral100: "#7A869A",
  neutral90: "#8993A4",
  neutral80: "#97A0AF",
  neutral70: "#A5ADBA",
  neutral60: "#B3BAC5",
  neutral50: "#C1C7D0",
  neutral40: "#DFE1E6",
  neutral30: "#EBECF0",
  neutral20: "#F4F5F7",
  neutral10: "#FAFBFC",

  primaryFont: DEFAULT_FONT,
  primaryBoldFont: DEFAULT_BOLD_FONT,

  secondaryFont: DEFAULT_FONT,
  secondaryBoldFont: DEFAULT_BOLD_FONT,

  accentFont: DEFAULT_FONT,
  accentBoldFont: DEFAULT_BOLD_FONT,

  buttonFont: DEFAULT_FONT,
  titleFont: DEFAULT_FONT,
};

export type UnifiedLayout = Layout;
export type UnifiedLayoutOptions = Options;
export type UnifiedLayoutRoot = LayoutRoot;

export interface UnifiedLayoutConfig {
  main: UnifiedLayoutRoot;
  auth: UnifiedLayoutRoot;
  payment: UnifiedLayoutRoot;
}

export interface UnifiedStorage {
  getItem: (key: string) => Promise<any>;
  setItem: (key: string, item: any) => void;
}

const StubStorage: UnifiedStorage = {
  getItem: async () => {},
  setItem: () => {},
};

export type PlatformOS = "ios" | "android" | "web";
export interface UnifiedUtils {
  dismissKeyboard: () => void;
  dimensions: () => {height: number; width: number};
  copyToClipboard: (text: string) => void;
  requestPermissions: (permission: PermissionKind) => Promise<PermissionStatus>;
  makePurchase: (profile: any, sku: any) => void;
  PaymentService: any;
  vibrate: (pattern?: number[]) => void;
  haptic: () => void;
  openUrl: (url: string) => Promise<void>;
  platform: () => PlatformOS;
}

const StubLayout: UnifiedLayoutConfig = {
  auth: {root: {}},
  main: {root: {}},
  payment: {root: {}},
};

const StubUtils: UnifiedUtils = {
  dismissKeyboard: () => {},
  dimensions: () => {
    console.warn("[unifier] Using stub dimensions, this is probably not what you want.");
    return {height: 0, width: 0};
  },
  copyToClipboard: (text: string) => {},
  requestPermissions: async (permission: PermissionKind) => "denied",
  makePurchase: (profile: any, sku: any) => {},
  PaymentService: {},
  vibrate: (pattern?: number[]) => {},
  haptic: () => {},
  openUrl: async (url: string) => {},
  platform: () => "web",
};

const StubTracking: TrackerInterface = {
  initFinished: true,
  init: (config: TrackingConfig) => {
    console.warn("Initializing stub tracking.");
  },
  trackPages: () => {},
  setUser: (user: BaseProfile) => {},
  setUserProperty: (property: string, value: string | object) => {},
  track: (eventName: string, properties?: TrackingProperties) => {},
  trackNavigation: (screen: string, properties?: TrackingProperties) => {},
  trackLogin: (method: string, success: boolean, properties?: TrackingProperties) => {},
  log: (message: string, properties?: TrackingProperties, level?: LogLevel) => {},
  error: (message: string, properties?: TrackingProperties) => {},
  debug: (message: string, properties?: TrackingProperties) => {},
  warn: (message: string, properties?: TrackingProperties) => {},
  trackSignup: (method: string, success: boolean, properties?: TrackingProperties) => {},
  handleErrorAlert: (text: string, exception?: Error, showAlert?: boolean) => {},
  trackPermission: (kind: PermissionKind, status: PermissionStatus, requested: boolean) => {},
  updateAppInfo: () => {},
};

const StubNav = {
  bindComponent: (component: React.Component<any>, componentId?: string) => {},
  registerScreen: (
    componentName: string,
    component: React.ComponentType<any>,
    config?: NavConfig
  ) => {
    throw new Error("Tried to register with stub.");
  },
  registerActionSheet: (
    componentName: string,
    component: React.ComponentType<any>,
    config?: NavConfig
  ) => {
    throw new Error("Tried to register action sheet with stub.");
  },
  setRoot: async (layout: UnifiedLayoutRoot) => {},
  setDefaultOptions: (options: UnifiedLayoutOptions) => {},
  mergeOptions: (componentId: string, layout: UnifiedLayoutOptions) => {},
  push: async (componentId: string, passProps?: any) => {},
  pop: async (componentId: string) => {},
  popToRoot: async (componentId: string) => {},
  showOverlay: async (layout: UnifiedLayout) => {},
  dismissOverlay: async (componentId: string) => {},
  showModal: async (layout: UnifiedLayout) => {},
  dismissModal: async (componentId: string) => {},
  dismissAllModals: async () => {},
  goToAuth: () => {},
  goToMain: () => {},
  goToPayment: () => {},
  // TODO figure out something better here.
  clearNotificationsForTab: (tab: "log" | "feed" | "chat" | "profile") => {},
};

export interface UnifiedNavigation {
  bindComponent: (t: any) => void;
  registerScreen: (
    componentName: string,
    component: React.ComponentType<any>,
    config?: NavConfig
  ) => void;
  registerActionSheet: (
    componentName: string,
    component: React.ComponentType<any>,
    config?: NavConfig
  ) => void;
  setRoot: (layout: UnifiedLayoutRoot) => Promise<any>;
  setDefaultOptions: (options: UnifiedLayoutOptions) => void;
  mergeOptions: (componentId: string, layout: UnifiedLayoutOptions) => void;
  push: (componentId: string, passProps?: any) => Promise<any>;
  pop: (componentId: string) => Promise<any>;
  popToRoot: (componentId: string) => Promise<any>;
  showOverlay: (layout: UnifiedLayout) => Promise<any>;
  dismissOverlay: (componentId: string) => Promise<any>;
  showModal: (layout: UnifiedLayout) => Promise<any>;
  dismissModal: (componentId: string) => Promise<any>;
  dismissAllModals: () => Promise<any>;
  goToAuth: () => void;
  goToMain: () => void;
  goToPayment: () => void;
  // TODO figure out something better here.
  clearNotificationsForTab: (tab: "log" | "feed" | "chat" | "profile") => void;
}

export interface AppConfig {
  web?: boolean;
  dev?: boolean;
  theme?: UnifiedThemeConfig;
  navigation: UnifiedNavigation;
  tracking: TrackerInterface;
  utils: UnifiedUtils;
  storage: UnifiedStorage;
  layout?: UnifiedLayoutConfig;
}

class UnifierClass {
  private _nav?: UnifiedNavigation;
  private _theme?: UnifiedThemeConfig;
  private _tracking?: TrackerInterface;
  private _utils?: UnifiedUtils;
  private _storage?: UnifiedStorage;
  private _layout?: UnifiedLayoutConfig;
  private _web = false;
  private _dev = false;

  get web(): boolean {
    return this._web;
  }

  get dev(): boolean {
    return this._dev;
  }

  get theme(): UnifiedTheme {
    return {
      ...DefaultTheme,
      // Custom per project
      primaryLighter: this._theme?.primaryLighter || this._theme?.primary || DefaultTheme.primary,
      primaryLight: this._theme?.primaryLight || this._theme?.primary || DefaultTheme.primary,
      primary: this._theme?.primary || this._theme?.primary || DefaultTheme.primary,
      primaryDark: this._theme?.primaryDark || this._theme?.primary || DefaultTheme.primary,
      primaryDarker: this._theme?.primaryDarker || this._theme?.primary || DefaultTheme.primary,

      secondaryLighter:
        this._theme?.secondaryLighter || this._theme?.secondary || DefaultTheme.secondary,
      secondaryLight:
        this._theme?.secondaryLight || this._theme?.secondary || DefaultTheme.secondary,
      secondary: this._theme?.secondary || this._theme?.secondary || DefaultTheme.secondary,
      secondaryDark: this._theme?.secondaryDark || this._theme?.secondary || DefaultTheme.secondary,
      secondaryDarker:
        this._theme?.secondaryDarker || this._theme?.secondary || DefaultTheme.secondary,

      accentLighter: this._theme?.accentLighter || this._theme?.accent || DefaultTheme.accent,
      accentLight: this._theme?.accentLight || this._theme?.accent || DefaultTheme.accent,
      accent: this._theme?.accent || this._theme?.accent || DefaultTheme.accent,
      accentDark: this._theme?.accentDark || this._theme?.accent || DefaultTheme.accent,
      accentDarker: this._theme?.accentDarker || this._theme?.accent || DefaultTheme.accent,

      tertiaryLighter: this._theme?.tertiaryLighter || this._theme?.accent || DefaultTheme.accent,
      tertiaryLight: this._theme?.tertiaryLight || this._theme?.accent || DefaultTheme.accent,
      tertiary: this._theme?.tertiary || this._theme?.accent || DefaultTheme.accent,
      tertiaryDark: this._theme?.tertiaryDark || this._theme?.accent || DefaultTheme.accent,
      tertiaryDarker: this._theme?.tertiaryDarker || this._theme?.accent || DefaultTheme.accent,

      primaryFont: this._theme?.primaryFont || DefaultTheme.primaryFont,
      primaryBoldFont:
        this._theme?.primaryBoldFont || this._theme?.primaryFont || DefaultTheme.primaryBoldFont,
      secondaryFont:
        this._theme?.secondaryFont || this._theme?.primaryFont || DefaultTheme.secondaryFont,
      secondaryBoldFont:
        this._theme?.secondaryBoldFont ||
        this._theme?.primaryFont ||
        DefaultTheme.secondaryBoldFont,
      buttonFont: this._theme?.buttonFont || this._theme?.primaryFont || DefaultTheme.buttonFont,
      accentFont: this._theme?.accentFont || this._theme?.primaryFont || DefaultTheme.accentFont,
      accentBoldFont:
        this._theme?.accentBoldFont || this._theme?.primaryFont || DefaultTheme.accentBoldFont,
      titleFont: this._theme?.titleFont || this._theme?.primaryFont || DefaultTheme.titleFont,
    };
  }

  get navigation(): UnifiedNavigation {
    if (!this._nav) {
      console.warn("[unifier] Using stub navigation");
      // throw new Error("[unifier] You must call setConfig before using navigation.");
      return StubNav;
    }
    return this._nav;
  }

  get tracking(): TrackerInterface {
    if (!this._tracking) {
      // throw new Error("[unifier] You must call setConfig before using tracking.");
      return StubTracking;
    }
    return this._tracking;
  }

  get utils(): UnifiedUtils {
    if (!this._utils) {
      // throw new Error("[unifier] You must call setConfig before using navigation.");
      return StubUtils;
    }
    // if (!this._utils) {
    //   throw new Error("[unifier] You must call setConfig before using utils.");
    // }
    return this._utils;
  }

  get storage(): UnifiedStorage {
    if (!this._storage) {
      return StubStorage;
    }
    return this._storage;
  }

  get layout(): UnifiedLayoutConfig {
    if (!this._layout) {
      return StubLayout;
    }
    return this._layout;
  }

  constructor() {
    console.debug("[unifier] Setting up Unifier");
  }

  initIcons = () => {
    console.debug("[unifier] Initializing icons");
  };

  setConfig(config: Partial<AppConfig>) {
    // console.debug("[unifier] Setting config", config);
    if (config.theme) {
      this._theme = config.theme;
    }
    if (config.utils) {
      this._utils = config.utils;
    }
    if (config.navigation) {
      this._nav = config.navigation;
    }
    if (config.tracking) {
      this._tracking = config.tracking;
    }
    if (config.web !== undefined) {
      this._web = Boolean(config.web);
    }
    if (config.dev !== undefined) {
      this._dev = Boolean(config.dev);
    }
    if (config.layout) {
      this._layout = config.layout;
    }
  }
}

export const Unifier = new UnifierClass();

export function navPush(componentId: string, screen: string, passProps?: any) {
  Unifier.navigation.push(componentId, {
    component: {
      name: screen,
      passProps,
    },
  });
}
