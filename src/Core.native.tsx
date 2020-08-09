/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import {Clipboard, Dimensions, Keyboard, Linking, Platform, Vibration} from "react-native";
import "react-native-gesture-handler";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import {Navigation, Options} from "react-native-navigation";
import {LayoutRoot} from "./navigation";
import {Tracking} from "./lib/Tracking";
import {Unifier, UnifiedLayoutOptions, UnifiedLayout} from "./Unifier";
import {FONT_MAP, PermissionKind} from "./UnifiedCommon";
import {withProfile} from "./react-firestorm/src";
import {RNNDrawer} from "./lib/Drawer";
import {requestPermissions} from "./lib/Permissions";
import {clearNotificationsForTab} from "./lib/PushNotifications";

interface WrapperProps {
  store: any;
}

class Wrapper extends React.Component<WrapperProps, {}> {
  render() {
    // return <Provider store={this.props.store}>{this.props.children}</Provider>;
    return this.props.children;
  }
}

const setDefaultNavOptions = () => {
  Navigation.setDefaultOptions({
    // TODO: statusbar styling not working
    statusBar: {
      visible: true,
      style: "light",
    },
    layout: {
      backgroundColor: Unifier.theme.white,
    },
    topBar: {
      // visible: true,
      background: {
        color: Unifier.theme.primaryDark,
      },
      title: {
        color: Unifier.theme.white,
        fontFamily: FONT_MAP.title,
        fontSize: 18,
        alignment: "fill",
      },
      subtitle: {
        color: Unifier.theme.white,
        fontFamily: FONT_MAP.title,
      },
      // buttonColor: Unifier.theme["white"],
      backButton: {
        color: Unifier.theme.white,
        showTitle: false,
      },
      borderColor: Unifier.theme.darkGray,
      borderHeight: 2,
    },
    bottomTabs: {
      animate: true,
      backgroundColor: Unifier.theme.lightGray,
      drawBehind: false,
      elevation: 3,
      // hideShadow: true,
      titleDisplayMode: "alwaysShow",
      // translucent: true,
      // barStyle: "black",
      hideShadow: true,
      // backgroundColor: "#F5F6F7",
    },
    bottomTab: {
      iconColor: Unifier.theme.darkGray,
      textColor: Unifier.theme.darkGray,
      selectedIconColor: Unifier.theme.primaryDark,
      selectedTextColor: Unifier.theme.primaryDark,
      fontFamily: FONT_MAP.primary,
      // icon: 1, //????
      iconInsets: {top: 1, bottom: 1},
    },
  });
};

function initializeUnifier() {
  // const adminImage = require("../img/admin-tab.png");
  // console.log("LOGOS", feedImage, profileImage);

  const AuthRoot: LayoutRoot = {
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: Screens.Onboarding,
            },
          },
        ],
      },
    },
  };

  const PaymentRoot: LayoutRoot = {
    root: {
      stack: {
        id: "Payment",
        children: [
          {
            component: {
              name: Screens.Payment,
              options: {
                layout: {
                  backgroundColor: Unifier.theme.primaryDark,
                },
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  };

  const MainRoot: LayoutRoot = {
    root: {
      bottomTabs: {
        id: "BottomTabsId",
        children: [
          {
            stack: {
              id: "LogTab",
              children: [
                {
                  component: {
                    name: "Log",
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: "Log",
                  fontSize: 12,
                  icon: logImage,
                },
              },
            },
          },
          {
            stack: {
              id: "FeedTab",
              children: [
                {
                  component: {
                    name: "Home",
                  },
                },
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "Feed",
                  icon: feedImage,
                },
              },
            },
          },
          // {
          //   component: {
          //     name: "lib.AddBottomButton",
          //   },
          // },
          {
            stack: {
              id: "ChatTab",
              children: [
                {
                  component: {
                    name: "Chat",
                  },
                },
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "Chat",
                  icon: chatImage,
                },
              },
            },
          },
          {
            stack: {
              id: "ProfileTab",
              children: [
                {
                  component: {
                    name: "Profile",
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: "Profile",
                  fontSize: 12,
                  icon: profileImage,
                },
              },
            },
          },
        ],
      },
    },
    // overlay: {
    //   screen: "lib.addTabButton", // Where 'CustomTab' is the name of my registered tab button
    //   height: 62,
    //   width: 62,
    //   position: {
    //     top: DEVICE_HEIGHT - 62,
    //     left: DEVICE_WIDTH / 2 - 31,
    //   },
    // },
  };

  Unifier.setConfig({
    tracking: Tracking,
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
      requestPermissions: async (perm: PermissionKind) => {
        return requestPermissions(perm);
      },
      makePurchase: makePurchase,
      PaymentService: PaymentService,
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
      registerScreen: (screen: string, component: any) => {
        Navigation.registerComponentWithRedux(screen, () => withProfile(component), Wrapper);
      },
      registerActionSheet: (componentName: string, component: React.ComponentType<any>) => {
        Navigation.registerComponentWithRedux(
          componentName,
          () => RNNDrawer(withProfile(component)),
          Wrapper,
          null as any
        );
      },
      setRoot: (layout: LayoutRoot) => {
        return Navigation.setRoot(layout);
      },
      setDefaultOptions: (options: UnifiedLayoutOptions) => {
        return Navigation.setDefaultOptions(options);
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
        Navigation.setRoot(AuthRoot);
      },
      goToMain: async () => {
        console.debug("[App] going to main");
        // PushService.init(store);
        Navigation.setRoot(MainRoot);
        if (Platform.OS === "ios") {
          try {
            await requestPermissions("notification");
          } catch (e) {
            console.warn("Error getting permission for notifications:", e, e.stack);
          }
        }
      },
      goToPayment: () => {
        console.debug("[App] going to payment stack");
        let isProduction = true;
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          isProduction = false;
        }
        if (!isProduction) {
          Navigation.setRoot(MainRoot);
        } else {
          Navigation.setRoot(PaymentRoot);
        }
        // Navigation.setRoot(MainRoot);
      },
      clearNotificationsForTab: (tab: "log" | "feed" | "chat" | "profile") => {
        clearNotificationsForTab(tab);
      },
    },
  });
}
