import {FONT_MAP} from "./UnifiedCommon";
import {Screens} from "./UnifiedScreens";
import {Unifier} from "./Unifier";
import {LayoutRoot} from "./navigation";

let store: any;
// let icons: any[] = [];

export async function initLayout(reduxStore: any) {
  store = reduxStore;
}

export const setDefaultNavOptions = () => {
  Unifier.navigation.setDefaultOptions({
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
        fontFamily: FONT_MAP["title"],
        fontSize: 18,
        alignment: "fill",
      },
      subtitle: {
        color: Unifier.theme.primaryDark,
        fontFamily: FONT_MAP["title"],
      },
      // buttonColor: Unifier.theme["white"],
      backButton: {
        color: Unifier.theme.primaryDark,
        showTitle: false,
      },
      noBorder: true,
    },
    bottomTabs: {
      animate: true,
      backgroundColor: Unifier.theme.white,
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
      fontFamily: FONT_MAP.primaryDark,
      icon: 1, //????
      iconInsets: {top: 3},
    },
  });
};

/* eslint-disable @typescript-eslint/no-var-requires */
const feedImage = "/format-list.png";
const profileImage = "/account-circle.png";
const chatImage = "/chat.png";
const logImage = "/food-apple.png";
/* eslint-enable @typescript-eslint/no-var-requires */

const AuthRoot = {
  root: {
    stack: {
      id: "App",
      children: [
        {
          component: {
            name: Screens.Auth,
          },
        },
        // {
        //   component: {
        //     name: Screens.PersonalInfo,
        //   },
        // },
        // {
        //   component: {
        //     name: Screens.Diet,
        //   },
        // },
      ],
    },
  },
};

// const PaymentRoot = {
//   root: {
//     stack: {
//       id: "Payment",
//       children: [
//         {
//           component: {
//             name: Screens.Payment,
//             options: {
//               layout: {
//                 backgroundColor: Unifier.theme.primaryDark,
//               },
//               topBar: {
//                 visible: false,
//               },
//             },
//           },
//         },
//       ],
//     },
//   },
// };

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
                  name: "BaseProfile",
                },
              },
            ],
            options: {
              bottomTab: {
                text: "BaseProfile",
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

export const goToAuth = () => {
  console.log("[App] going to auth");
  Unifier.navigation.setRoot(AuthRoot);
};

export const goToMain = async () => {
  console.log("[App] going to main");
  Unifier.navigation.setRoot(MainRoot);
};

export const goToPayment = () => {
  console.log("[App] going to payment stack");
  let isProduction = true;
  if (!Unifier.dev) {
    isProduction = false;
  }
  // if (!isProduction) {
  //   Unifier.navigation.setRoot(MainRoot);
  // } else {
  //   Unifier.navigation.setRoot(PaymentRoot);
  // }
  Unifier.navigation.setRoot(MainRoot);
};
