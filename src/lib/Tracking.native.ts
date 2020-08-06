import * as Sentry from "@sentry/react-native";
import {Alert, Platform} from "react-native";
import DeviceInfo from "react-native-device-info";
// import Fabric from "react-native-fabric";
import analytics from "@react-native-firebase/analytics";
import crashlytics from "@react-native-firebase/crashlytics";
import Mixpanel from "react-native-mixpanel";
import {Navigation} from "react-native-navigation";
import {
  TrackerInterface,
  LogLevel,
  PermissionKind,
  PermissionStatus,
  TrackingProperties,
  isTestUser,
  BaseProfile,
  TrackingConfig,
} from "../UnifiedCommon";
import {Unifier} from "../Unifier";
import {FireStorm} from "../..";

// let Mixpanel: MixpanelInstance;
export const Tracking: TrackerInterface = class {
  static initFinished = false;
  // TODO: figure out how to set this automatically
  static debugMode = process.env.NODE_ENV !== "production";
  static async init(config: TrackingConfig) {
    if (!config.MIXPANEL_TOKEN) {
      console.warn("[tracking] No Mixpanel token set. Do you not want tracking!?");
    }
    if (!Mixpanel) {
      console.error("Mixpanel is undefined.");
    }
    console.debug("[tracking] Initializing tracking");
    // console.log("MIXPANE", typeof Mixpanel.sharedInstanceWithToken);
    if (!config.MIXPANEL_TOKEN) {
      console.error("[tracking] No Mixpanel token");
    }
    await Mixpanel.sharedInstanceWithToken(config.MIXPANEL_TOKEN);
    // Mixpanel = new MixpanelInstance(config.MIXPANEL_TOKEN);
    // await Mixpanel.initialize();

    analytics().setAnalyticsCollectionEnabled(true);
    analytics().logEvent("AppMount");
    if (!Unifier.dev) {
      Sentry.init({
        dsn: config.SENTRY_MOBILE_DSN,
        enableAutoSessionTracking: true,
      });
    }
    // These are set automatically. We may need to set dist when we do codepush.
    // Sentry.setVersion(`${VersionNumber.appVersion}-${VersionNumber.buildVersion}`);
    // Sentry.setRelease(VersionNumber.appVersion);

    // firebase.perf().setPerformanceCollectionEnabled(true);
    Tracking.trackPages();
    Tracking.initFinished = true;
    console.debug("[tracking] initialized");
  }

  static trackPages() {
    // Track navigation movements around the app.
    Navigation.events().registerAppLaunchedListener(() => {
      // Tracking.track("AppLaunched");
    });
    Navigation.events().registerComponentDidAppearListener(({componentId, componentName}) => {
      if (!Unifier.dev) {
        Tracking.track(`ViewDidAppear`, {componentId, componentName});
        analytics().setCurrentScreen(componentName);
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Navigation.events().registerComponentDidDisappearListener(({componentId, componentName}) => {
      // if (!Unifier.dev) {
      // Tracking.track("ViewDidDisappear", {componentId, componentName});
      // }
    });
    Navigation.events().registerBottomTabSelectedListener(
      ({selectedTabIndex, unselectedTabIndex}) => {
        if (!Unifier.dev) {
          Tracking.track("TabSelected", {selectedTabIndex, unselectedTabIndex});
        }
      }
    );
    Navigation.events().registerNavigationButtonPressedListener(({buttonId}) => {
      if (!Unifier.dev) {
        Tracking.track("NavButtonTapped", {buttonId});
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Navigation.events().registerCommandListener((name, params) => {
      // Tracking.log("NavEvent", {name, params});
    });
    // For targeting Mixpanel notifications.
    // (Mixpanel as any).showInAppMessageIfAvailable();
  }

  static setUser(user: BaseProfile) {
    const id = (user as any).uid || user.id;
    if (!id) {
      this.warn(`[tracking] cannot set user with no uid`, user);
      return;
    }
    try {
      if (!Tracking.initFinished) {
        this.warn("[tracking] tried to set user before initialization was finished");
        return;
      }
      this.log("[tracking] Setting user:", user);
      analytics().setAnalyticsCollectionEnabled(true);
      const userName = (user as any).username || (user as any).name || (user as any).displayName;
      if (userName) {
        crashlytics().setAttribute("name", userName);
        analytics().setUserProperty("name", userName);
        Mixpanel.setOnce({$name: userName});
        Sentry.setUser({userName});
      }
      if (user.email) {
        crashlytics().setAttribute("email", user.email);
        analytics().setUserProperty("email", user.email);
        Mixpanel.setOnce({$email: user.email});
        Sentry.setUser({email: user.email});

        if (user.email.indexOf("nang.io") > -1 || user.email.indexOf("example.com") > -1) {
          this.setUserProperty("testUser", true);
        }
      }
      if (id) {
        crashlytics().setUserId(id);
        analytics().setUserId(id);
        Mixpanel.identify(id);
        Sentry.setUser({id});
      }
      if ((user.backOffice && user.backOffice.testUser) || isTestUser(user)) {
        crashlytics().setAttribute("testUser", "true");
        analytics().setUserProperties({testUser: "true"});
        Mixpanel.setOnce({testUser: true});
        Sentry.setUser({testUser: true});
      }
    } catch (e) {
      this.error(`[tracking] Error setting user`, e);
    }
  }

  static setUserProperty(property: string, value: any) {
    console.log("Setting user property", property, value);
    try {
      Mixpanel.setOnce({[property]: value});
      Sentry.setExtra(property, value);
      analytics().setUserProperty(property, String(value));
    } catch (e) {
      this.error(`[tracking] Error setting user property`, e);
    }
  }

  static track(eventName: string, properties?: TrackingProperties) {
    try {
      if (!Tracking.initFinished) {
        console.warn("[tracking] tried to track before initialization was finished");
        return;
      }

      // Ignore merge options, it's really spammy
      if (eventName === "NavEvent" && properties && properties.name === "mergeOptions") {
        return;
      }

      this.debug(`[tracking] Tracking event "${eventName}". Properties:`, properties);
      analytics().logEvent(eventName, properties);
      if (properties) {
        Mixpanel.trackWithProperties(eventName, properties);
      } else {
        Mixpanel.track(eventName);
      }
    } catch (e) {
      this.error(`[tracking] Error tracking ${eventName}`, properties);
    }
  }

  static trackNavigation(screen: string, properties?: TrackingProperties) {
    if (!Tracking.initFinished) {
      this.warn("[tracking] tried to track navigation before initialization was finished");
      return;
    }
    this.debug(`[tracking] Tracking navigation "${screen}". Properties:`, properties);
    Sentry.addBreadcrumb({
      message: `View${screen}`,
      category: "action",
      data: properties || {},
    });
    this.track(`View${screen}`, properties);
  }

  static trackLogin(method: string, success: boolean, properties?: TrackingProperties) {
    if (!Tracking.initFinished) {
      this.warn("[tracking] tried to track login before initialization was finished");
      return;
    }
    this.track("Login", properties);
  }

  static trackSignup(method: string, success: boolean, properties?: TrackingProperties) {
    if (!Tracking.initFinished) {
      console.warn("[tracking] tried to track signup before initialization was finished");
      return;
    }
    if (!success) {
      this.warn(`${method} signup failure`, properties);
      this.track("SignupFailure", {method, ...properties});
    } else {
      this.track("Signup", properties);
    }
  }

  static updateAppInfo() {
    FireStorm.updateProfile({
      appInfo: {
        version: DeviceInfo.getVersion(),
        build: DeviceInfo.getBuildNumber(),
        platform: Platform.OS,
      },
    });
  }

  static log(message: string, properties?: any, level: LogLevel = "info") {
    switch (level) {
      case "info":
        properties ? console.log(message, properties) : console.log(message);
        break;
      case "critical":
      case "fatal":
      case "error":
        Mixpanel.trackWithProperties("Error", {message, ...properties});
        let logMessage = message;
        if (properties && !Unifier.dev) {
          try {
            logMessage = `${message} ${JSON.stringify(properties)}`;
          } catch (e) {
            console.warn(`Could not stringify for Sentry`, properties);
          }
          console.error(`[${level}] ${logMessage}`);
        } else {
          properties
            ? console.error(`[${level}] ${logMessage}`, properties)
            : console.error(`[${level}] ${logMessage}`);
        }
        // TODO: capture log level, like https://github.com/getsentry/sentry-electron/issues/90#issuecomment-445422884
        Sentry.captureMessage(message);
        break;
      case "debug":
        properties ? console.debug(message, properties) : console.debug(message);
        break;
      case "warning":
        properties ? console.warn(message, properties) : console.warn(message);
        break;
    }
    // firebase.crashlytics().log(`[${level}] ${message}`);
  }

  static debug(message: string, properties?: any) {
    this.log(message, properties, "debug");
  }

  static warn(message: string, properties?: any) {
    this.log(message, properties, "warning");
  }

  static error(message: string, properties?: any) {
    this.log(message, properties, "error");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static handleErrorAlert(text: string, exception?: Error, showAlert = true) {
    if (exception && Platform.OS === "android" && !this.debugMode) {
      // TODO: log the exception?
      // firebase.crashlytics().log(text);
    } else if (exception && Platform.OS === "ios" && !this.debugMode) {
      // TODO: log the exception?
      // firebase.crashlytics().log(text);
    }
    this.error(text, exception);
    this.track("Error", {message: text, exception});
    if (exception && !this.debugMode) {
      Sentry.captureException(exception);
    }
    return new Promise((resolve) => {
      Alert.alert("Uh oh!", text, [{text: "OK", onPress: () => resolve()}], {
        cancelable: false,
      });
    });
  }

  static trackPermission(kind: PermissionKind, status: PermissionStatus, requested: boolean) {
    this.debug(`[tracking] Permission "${kind}" is "${status}`);
    this.setUserProperty(`Permission${kind}`, status);
    if (requested) {
      this.track(`PermissionRequest${kind}`, {response: status});
    }
  }
};
