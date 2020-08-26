import React from "react";
import {Clipboard, Dimensions, Keyboard, Linking, Platform, Vibration} from "react-native";
// import "react-native-gesture-handler";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {Navigation, Options} from "react-native-navigation";
import {PermissionKind} from "./Common";
import {RNNDrawer} from "./Drawer";
// import {requestPermissions} from "./lib/Permissions";
// import {clearNotificationsForTab} from "./lib/PushNotifications";
import {LayoutRoot, OptionsLayout} from "./navigation";
import {UnifiedLayout, UnifiedLayoutOptions, Unifier} from "./Unifier";
import {UnifierScreens} from "./UnifiedScreens";

interface WrapperProps {
  store: any;
}

class Wrapper extends React.Component<WrapperProps, {}> {
  render() {
    // return <Provider store={this.props.store}>{this.props.children}</Provider>;
    return this.props.children;
  }
}

function initializeUnifier() {
  console.debug("[unifier] Initializing native core unifier.");
  // const adminImage = require("../img/admin-tab.png");
  // console.log("LOGOS", feedImage, profileImage);

  Unifier.setConfig({
    // tracking: Tracking,
    web: true,
    utils: {
      dismissKeyboard: () => {
        Keyboard.dismiss();
      },
      dimensions: () => ({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }),
      copyToClipboard: (text: string) => {
        Clipboard.setString(text);
      },
      requestPermissions: async (_perm: PermissionKind) => {
        console.warn("Permissions not set up yet.");
        return "undetermined";
        // return requestPermissions(perm);
      },
      makePurchase: () => {
        console.warn("Make purchase not supported yet.");
      },
      PaymentService: () => {
        console.warn("Make purchase not supported yet.");
      },
      vibrate: (pattern?: number[]) => {
        Vibration.vibrate(pattern || [100], false);
      },
      haptic: () => {
        const options = {
          enableVibrateFallback: false,
          ignoreAndroidSystemSettings: false,
        };
        ReactNativeHapticFeedback.trigger("impactLight", options);
      },
      openUrl: async (url: string) => {
        return Linking.openURL(url);
      },
      platform: () => Platform.OS,
    },
    navigation: {
      bindComponent: (component: React.Component<any>) => {
        return Navigation.events().bindComponent(component);
      },
      registerScreen: (screenName, component, config) => {
        let comp = config?.wrapper ? config.wrapper(component) : component;
        Navigation.registerComponent(screenName, () => comp);
      },
      registerActionSheet: (componentName: string, component: React.ComponentType<any>, config) => {
        let comp = config?.wrapper ? config.wrapper(component) : component;
        Navigation.registerComponent(componentName, () => RNNDrawer(comp));
      },
      setRoot: (layout: LayoutRoot) => {
        return Navigation.setRoot(layout);
      },
      setDefaultOptions: (options: UnifiedLayoutOptions) => {
        return Navigation.setDefaultOptions(options as any);
      },
      mergeOptions: (componentId: string, layout: Options) => {
        return Navigation.mergeOptions(componentId, layout);
      },
      push: (componentId: string, passProps?: any) => {
        return Navigation.push(componentId, passProps);
      },
      pop: (componentId: string) => {
        return Navigation.pop(componentId);
      },
      popToRoot: (componentId: string) => {
        return Navigation.popToRoot(componentId);
      },
      showOverlay: (layout: UnifiedLayout) => {
        return Navigation.showOverlay(layout);
      },
      dismissOverlay: (componentId: string) => {
        return Navigation.dismissOverlay(componentId);
      },
      showModal: (layout: UnifiedLayout) => {
        return Navigation.showModal(layout);
      },
      dismissModal: (componentId: string) => {
        return Navigation.dismissModal(componentId);
      },
      dismissAllModals: () => {
        return Navigation.dismissAllModals();
      },
      goToAuth: () => {
        console.debug("[App] going to auth");
        Navigation.setRoot(Unifier.layout.auth);
      },
      goToMain: async () => {
        console.debug("[App] going to main");
        // PushService.init(store);
        Navigation.setRoot(Unifier.layout.main);
        if (Platform.OS === "ios") {
          try {
            // await requestPermissions("notification");
          } catch (e) {
            console.warn("Error getting permission for notifications:", e, e.stack);
          }
        }
      },
      goToPayment: () => {
        console.debug("[App] going to payment stack");
        let isProduction = true;
        // if (typeof __DEV__ !== "undefined" && __DEV__) {
        //   isProduction = false;
        // }
        if (!isProduction) {
          Navigation.setRoot(Unifier.layout.main);
        } else {
          Navigation.setRoot(Unifier.layout.payment);
        }
        // Navigation.setRoot(MainRoot);
      },
      clearNotificationsForTab: (tab: "log" | "feed" | "chat" | "profile") => {
        // console.warn("Clear notifications not supported yet.");
        // clearNotificationsForTab(tab);
      },
    },
  });
}

initializeUnifier();

// Pass "onSave" in passProps to create the save right nav button
export function showFullPageModal(
  component: any,
  title: string,
  layout?: OptionsLayout,
  passProps?: any
) {
  Unifier.navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: UnifierScreens.FullPageModal,
            passProps: {
              component,
              ...passProps,
            },
            options: {
              topBar: {
                background: {
                  color: Unifier.theme.primaryDark,
                },
                title: {
                  text: title,
                  color: Unifier.theme.white,
                },
                leftButtons: [
                  {
                    id: "close",
                    text: "Close",
                    color: Unifier.theme.white,
                    // icon: times,
                  },
                ],
              },
              layout: layout,
            },
          },
        },
      ],
    },
  });
}
