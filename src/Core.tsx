/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import get from "lodash/get";
import merge from "lodash/merge";
import * as React from "react";
import {withRouter} from "react-router";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UnifiedLayoutOptions, UnifiedLayout, Unifier} from "./Unifier";
import {LayoutRoot, OptionsTopBarButton} from "./navigation";
import {WithProfileProps, withProfile} from "./react-firestorm/src";
import {Box} from "./Box";
import {Layer, Modal} from "./gestalt";
import {BackButton} from "./HeaderButtons";
import {Heading} from "./Heading";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {Tracking} from "./lib/Tracking";
import {PermissionKind, NavConfig} from "./UnifiedCommon";
import {IconButton} from "./IconButton";
import {Button} from "./Button";

function urlToRegex(url?: string): RegExp | undefined {
  if (!url) {
    return undefined;
  }
  return new RegExp(url.replace(/:(\w)+/, "(\\w+)"));
}

interface ScreenConfig {
  url?: string;
  component: any;
  componentId: string;
  name: string;
  navOptions: UnifiedLayoutOptions;
}

interface NavDataInterface {
  defaultOptions: UnifiedLayoutOptions;
  root?: LayoutRoot;
  screens: {
    [screenName: string]: ScreenConfig;
  };
}

interface Tab {
  text: string;
  icon: any;
  url: string;
}

interface NavigatorProps extends RouteComponentProps, WithProfileProps {}

interface NavigatorState {
  loading: boolean;
  initialProps: {[key: string]: any};
  modalLayout: UnifiedLayout | null;
  navData: NavDataInterface;
}

export class NavigatorBare extends React.Component<NavigatorProps, NavigatorState> {
  static componentIdCounter = 0;
  static getNewComponentId = () => {
    let id = `Component${NavigatorBare.componentIdCounter}`;
    NavigatorBare.componentIdCounter += 1;
    return id;
  };

  findScreenByName = (name: string) => {
    return this.state.navData.screens[name];
  };

  findScreenByComponentId = (componentId: string) => {
    return Object.values(this.state.navData.screens).find(
      (data) => data.componentId === componentId
    );
  };

  findScreenByUrl = (url: string) => {
    return Object.values(this.state.navData.screens).find((s) => {
      const reg = urlToRegex(s.url);
      return reg && Boolean(reg.exec(url));
    });
  };

  constructor(props: NavigatorProps) {
    super(props);
    this.state = {
      loading: false,
      initialProps: {},
      modalLayout: null,
      navData: {defaultOptions: {}, root: undefined, screens: {}},
    };

    const mergeOptions = (componentId: string, layout: UnifiedLayoutOptions) => {
      const screenConfig = this.findScreenByComponentId(componentId);
      if (!screenConfig) {
        console.error("Tried to update nav options for unknown component", componentId, layout);
        return;
      }
      const options = screenConfig?.navOptions ?? {};
      const navData = {...this.state.navData};
      navData.screens[screenConfig.name].navOptions = merge(options, layout);
      this.setState({navData});
    };

    Unifier.setConfig({
      web: true,
      dev: true,
      tracking: Tracking,
      storage: {
        getItem: async (key: string) => localStorage && localStorage.getItem(key),
        setItem: (key: string, item: any) => localStorage && localStorage.setItem(key, item),
      },
      theme: {
        primaryLighter: "#457b9d",
        primaryLight: "#457b9d",
        primary: "#457b9d",
        primaryDark: "#457b9d",
        primaryDarker: "#457b9d",

        secondaryLighter: "#a8dadc",
        secondaryLight: "#a8dadc",
        secondary: "#a8dadc",
        secondaryDark: "#a8dadc",
        secondaryDarker: "#a8dadc",

        accentLighter: "#e63946",
        accentLight: "#e63946",
        accent: "#e63946",
        accentDark: "#e63946",
        accentDarker: "#e63946",

        tertiaryLighter: "#1d3557",
        tertiaryLight: "#1d3557",
        tertiary: "#1d3557",
        tertiaryDark: "#1d3557",
        tertiaryDarker: "#1d3557",

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
      },
      utils: {
        dismissKeyboard: () => {
          // Keyboard.dismiss();
        },
        dimensions: () => ({
          width: window.innerWidth,
          height: window.innerHeight,
        }),
        copyToClipboard: (text: string) => {
          // Clipboard.setString(text);
        },
        requestPermissions: async (perm: PermissionKind) => {
          return "denied";
          // requestPermissions(perm as PermissionKind);
        },
        makePurchase: () => {
          // Make purchase
        },
        PaymentService: () => {
          // Payment service
        },
        vibrate: (pattern?: number[]) => {
          const nav = navigator as any;
          const vibrate = nav.vibrate || nav.webkitVibrate || nav.mozVibrate || nav.msVibrate;

          if (vibrate) {
            vibrate(pattern || 50);
          }
        },
        haptic: () => {
          const nav = navigator as any;
          const vibrate = nav.vibrate || nav.webkitVibrate || nav.mozVibrate || nav.msVibrate;

          if (vibrate) {
            // console.log("VIBE", vibrate);
            // vibrate();
          }
        },
        openUrl: async (url: string) => {
          window.open(url);
        },
        platform: () => "web",
      },
      navigation: {
        bindComponent: (component: React.Component<any>) => {
          // return Navigation.events().bindComponent(t);
        },
        registerScreen: (
          componentName: string,
          component: React.ComponentType<any>,
          config?: NavConfig
        ) => {
          let url: string | undefined;
          if (config) {
            url = config.url;
          }
          const componentId = NavigatorBare.getNewComponentId();

          let options = {};
          let comp = component as any;
          if (comp && comp.options) {
            if (typeof comp.options === "function") {
              options = comp.options();
            } else {
              options = comp.options;
            }
          }

          const navData = {...this.state.navData};
          navData.screens[componentName] = {
            url: url,
            component,
            componentId,
            name: componentName,
            navOptions: {...this.state.navData.defaultOptions},
          };
          this.setState({navData});
          mergeOptions(componentId, options);
        },
        registerActionSheet: (
          componentName: string,
          component: React.ComponentType<any>,
          config?: NavConfig
        ) => {
          // Navigation.registerComponent(componentName, () => component);
        },
        setRoot: async (layout: LayoutRoot) => {
          const navData = {...this.state.navData};
          navData.root = layout;
          this.setState({navData});
        },
        setDefaultOptions: (defaultOptions: UnifiedLayoutOptions) => {
          console.debug("[navigator] Setting default navigation options", defaultOptions);
          const navData = {...this.state.navData};
          navData.defaultOptions = {...defaultOptions};
          this.setState({navData});
        },
        mergeOptions: mergeOptions,
        push: async (componentId: string, passProps?: any) => {
          if (!passProps) {
            console.error("Screen name is required to push.");
            return;
          }
          const screenName = get(passProps, "component.name", "");
          const navConfig = this.findScreenByName(screenName);
          if (!navConfig || !navConfig.url) {
            console.error("Cannot find screen url", passProps);
            return;
          }
          let url = navConfig.url;
          const paramMatch = /:(\w+)/.exec(url);
          if (paramMatch) {
            const param = get(passProps, `component.passProps.${paramMatch[1]}`);
            if (!param) {
              console.error("Could not find param to fill in URL", url, passProps);
              return;
            }
            url = url.replace(/:\w+/, get(passProps, `component.passProps.${paramMatch[1]}`, ""));
          }
          this.props.history.push(url, {
            componentId: navConfig.componentId,
            ...get(passProps, "component.passProps"),
          });
          // return Navigation.push(componentId, passProps);
        },
        pop: async (componentId: string) => {
          // return Navigation.pop(componentId);
          this.props.history.goBack();
        },
        popToRoot: async (componentId: string) => {
          // return Navigation.popToRoot(componentId);
        },
        showOverlay: async (layout: UnifiedLayout) => {
          // return Navigation.showOverlay(layout);
        },
        dismissOverlay: async (componentId: string) => {
          // return Navigation.dismissOverlay(componentId);
        },
        showModal: async (layout: UnifiedLayout) => {
          this.setState({modalLayout: layout});
        },
        dismissModal: async (componentId: string) => {
          this.setState({modalLayout: null});
        },
        dismissAllModals: async () => {
          this.setState({modalLayout: null});
        },
        goToAuth: () => {
          this.props.history.push("/signup");
        },
        goToMain: () => {
          this.props.history.push("/home");
        },
        goToPayment: () => {
          this.props.history.push("/payment");
        },
        clearNotificationsForTab: (tab: "log" | "feed" | "chat" | "profile") => {
          // clearNotificationsForTab(tab);
        },
      },
    });
  }

  async componentDidMount() {
    const conf = this.getNavConf();
    if (!conf) {
      this.setState({loading: false});
      return;
    }
    const getInitialProps = conf.component.getInitialProps;
    if (getInitialProps) {
      this.setState({loading: true});
      // Hack for pulling out id..
      const split = this.props.location.pathname.split("/");
      const id = split.length === 3 ? split[2] : undefined;
      const initialProps = await getInitialProps({
        path: this.props.location.pathname,
        id,
      });
      this.setState({initialProps});
    }
    this.setState({loading: false});
  }

  getNavConf = () => {
    const screen = this.findScreenByUrl(this.props.location.pathname);
    return screen;
  };

  getNav = () => {
    const defaultNav = {...this.state.navData.defaultOptions};
    const conf = this.getNavConf();
    if (!conf) {
      return defaultNav;
    }
    return conf.navOptions;
  };

  renderModal() {
    if (!this.state.modalLayout) {
      return null;
    }
    const Component = get(
      this.state.modalLayout,
      "stack.children.[0].component.passProps.component"
    );
    const title = get(
      this.state.modalLayout,
      "stack.children.[0].component.options.topBar.title.text"
    );
    return (
      <Layer>
        <Modal
          accessibilityModalLabel="View default padding and styling"
          // heading={title || "Test"}
          onDismiss={() => {
            this.setState({modalLayout: null});
          }}
          // footer={<Heading size="md">Footer</Heading>}
          size="md"
        >
          {/* <Box paddingY={4} paddingX={2}> */}
          <Box height="100%" width="100%" display="flex" direction="column">
            <Box
              height={250}
              color="primaryDark"
              display="flex"
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Box width={50} display="flex" justifyContent="center" alignItems="center">
                <IconButton
                  accessibilityLabel="close"
                  icon="times"
                  prefix="fas"
                  iconColor="white"
                  onClick={() => this.setState({modalLayout: null})}
                />
              </Box>
              <Box display="flex" flex="grow" justifyContent="center" alignItems="center">
                <Text size="lg" weight="bold" color="white" align="center">
                  {title}
                </Text>
              </Box>
              <Box minWidth={50} display="flex" justifyContent="center" alignItems="center" />
            </Box>
            <Box display="flex" flex="grow">
              <Component />
            </Box>
            <Box height={50} />
          </Box>
          {/* </Box> */}
        </Modal>
      </Layer>
    );
  }

  private getButtonFromConfig = (options: OptionsTopBarButton) => {
    if (options.component) {
      const config = this.findScreenByName(options.component.name);
      if (!config) {
        console.warn("Could not find button for header", options);
        return null;
      }
      const Comp = config.component;
      return <Comp {...options.component.passProps} />;
    } else if (options.text) {
      return (
        <Button
          type="ghost"
          color={options.color as any}
          text={options.text}
          onClick={() => {
            console.error("Header click not implemented yet.");
          }}
        />
      );
    } else {
      console.warn("Unknown button config");
      return null;
    }
  };

  renderTopBar() {
    const nav = this.getNav();
    const topBar = get(nav, "topBar");
    if (topBar === undefined || topBar.visible === false) {
      console.debug("Not showing topbar", topBar, nav);
      return null;
    }

    let leftButtons = [];
    if (topBar?.backButton?.visible) {
      leftButtons.push(
        <BackButton componentId="backbutton" onBack={() => Unifier.navigation.pop("back")} />
      );
    }
    leftButtons = [...leftButtons, ...(topBar.leftButtons || []).map(this.getButtonFromConfig)];
    let rightButtons = (topBar.rightButtons || []).map(this.getButtonFromConfig);
    return (
      <Box
        width="100%"
        height={60}
        minHeight={60}
        color="primaryDark"
        display="flex"
        direction="row"
        justifyContent="between"
        alignItems="center"
      >
        <Box
          display="flex"
          flex="grow"
          width="25%"
          maxWidth={100}
          alignItems="start"
          justifyContent="center"
        >
          {leftButtons.map((comp, i) => (
            <React.Fragment key={i}>{comp}</React.Fragment>
          ))}
        </Box>

        <Box display="flex" flex="grow" justifyContent="center">
          {topBar.title && topBar.title.text && (
            <Heading size="md" color="white" align="center" truncate={true}>
              {topBar.title.text}
            </Heading>
          )}
        </Box>
        <Box
          display="flex"
          flex="grow"
          width="25%"
          maxWidth={80}
          alignItems="end"
          justifyContent="center"
        >
          {rightButtons.map((comp, i) => (
            <React.Fragment key={i}>{comp}</React.Fragment>
          ))}
        </Box>
      </Box>
    );
  }

  renderBottomBar() {
    const nav = this.getNav();
    if (get(nav, "bottomBar.visible", true) === false) {
      return null;
    }

    let tabs: Tab[] = [
      {
        text: "News",
        icon: "mail-bulk",
        url: "/home",
      },
      {text: "Suggested", icon: "user-circle", url: "/suggested"},
      {text: "Profile", icon: "user-circle", url: "/profile"},
    ];

    if (this.props.profile.doc && this.props.profile.doc.admin) {
      tabs.push({text: "Admin", icon: "tools", url: "/admin"});
    }

    const isIphoneX = (window.navigator as any).standalone;
    let inlineStyle = isIphoneX ? {paddingBottom: 34} : {};
    return (
      <Box
        height={isIphoneX ? 65 + 34 : 65}
        minHeight={isIphoneX ? 65 + 34 : 65}
        width="100%"
        maxWidth={800}
        alignSelf="center"
        justifyContent="around"
        alignItems="center"
        direction="row"
        display="flex"
        dangerouslySetInlineStyle={{
          __style: inlineStyle,
        }}
      >
        {tabs.map((t) => {
          let isSelected = this.props.location.pathname.indexOf(t.url) > -1;
          // Lol hacky mc hack hack.
          if (this.props.location.pathname.indexOf("/news") === 0 && t.text === "News") {
            isSelected = true;
          }
          return (
            <div key={t.text} style={{width: "100%", height: "100%"}}>
              <div
                style={{
                  height: isSelected ? 3 : 1,
                  backgroundColor: "black",
                  width: "100%",
                  display: "flex",
                  alignSelf: "center",
                }}
              />
              <Box
                display="flex"
                direction="column"
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                padding={2}
                onClick={() => {
                  this.props.history.push(t.url);
                }}
              >
                <div style={{width: 32, height: 32, padding: 4}}>
                  <Icon
                    size={30}
                    prefix="fas"
                    name={t.icon}
                    color={isSelected ? "primary" : "darkGray"}
                  />
                </div>
                <Text align="center">{t.text}</Text>
              </Box>
            </div>
          );
        })}
      </Box>
    );
  }

  render() {
    let waitOnProfile = false;
    if (localStorage && localStorage.getItem("profile") && !this.props.profile.doc) {
      waitOnProfile = true;
    }
    return (
      <Box height="100%" width="100%" display="flex" direction="column">
        {this.renderModal()}
        {this.renderTopBar()}
        <Box display="flex" flex="grow" direction="column" width="100%" overflow="hidden">
          <Switch>
            {Object.values(this.state.navData.screens).map((conf) => {
              if (conf.url) {
                return (
                  <Route key={conf.url} path={conf.url}>
                    <conf.component
                      componentId={conf.componentId}
                      {...this.state.initialProps}
                      {...this.props.history.location.state}
                      profile={this.props.profile}
                    />
                  </Route>
                );
              }
              return null;
            })}
            <Route exact path="/">
              {waitOnProfile && (
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <FontAwesomeIcon
                    icon={["fas", "spinner"]}
                    spin={true}
                    color="#666"
                    size="2x"
                    style={{justifySelf: "center", alignSelf: "center"}}
                  />
                </Box>
              )}
              {!waitOnProfile && this.props.profile.doc && <Redirect to="/home" />}
              {!waitOnProfile && !this.props.profile.doc && <Redirect to="/signup" />}
            </Route>
          </Switch>
        </Box>
        {this.renderBottomBar()}
      </Box>
    );
  }
}

export const Navigator = withProfile(withRouter(NavigatorBare));
