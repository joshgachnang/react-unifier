/**
 * Forked from https://github.com/lukebrandonfarrell/react-native-navigation-drawer-extension
 * @author Luke Brandon Farrell
 * @description An animated drawer component for react-native-navigation.
 */

import {emit, on} from "jetemit";
import * as React from "react";
import {Animated, Dimensions, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Navigation} from "react-native-navigation";
import {DrawerProps, DrawerDirection, Direction} from "../Common";

const DEFAULT_FADE_OPACITY = 0.6;

interface State {
  sideMenuOpenValue: any;
  sideMenuOverlayOpacity: any;
  sideMenuSwippingStarted: boolean;
  sideMenuIsDismissing: boolean;
}

/** -------------------------------------------- */
/**             Component Styling                */
/** -------------------------------------------- */
const styles = StyleSheet.create({
  sideMenuContainerStyle: {
    flex: 1,
    flexDirection: "row",
  },
  sideMenuOverlayStyle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
});

export const RNNDrawer = (Component: any) => {
  class WrappedDrawer extends React.Component<DrawerProps, State> {
    screenWidth: number;
    screenHeight: number;
    drawerWidth: number;
    drawerHeight: number;
    drawerOpenedValues: {left: number; right: number; top: number; bottom: number};
    animatedDrawer: Animated.CompositeAnimation | undefined;
    animatedOpacity: Animated.CompositeAnimation | undefined;
    unsubscribeSwipeStart: any;
    unsubscribeSwipeMove: any;
    unsubscribeSwipeEnd: any;
    unsubscribeDismissDrawer: any;
    /**
     * [ Built-in React method. ]
     *
     * Setup the component. Executes when the component is created
     *
     * @param {object} props
     */
    constructor(props: DrawerProps) {
      super(props);

      /** Component Variables */
      this.screenWidth = Dimensions.get("window").width;
      this.screenHeight = Dimensions.get("window").height;
      this.drawerWidth = props.drawerScreenWidth;
      this.drawerHeight = props.drawerScreenHeight;

      this.drawerOpenedValues = {
        left: 0,
        right: this.screenWidth - this.drawerWidth,
        top: 0,
        bottom: this.screenHeight - this.drawerHeight,
      };

      const initialValues: {[key: string]: number} = {
        left: -this.drawerWidth,
        right: this.screenWidth,
        top: -this.drawerHeight,
        bottom: this.screenHeight,
      };

      /** Component State */
      this.state = {
        sideMenuOpenValue: new Animated.Value(initialValues[props.direction]),
        sideMenuOverlayOpacity: new Animated.Value(0),
        sideMenuSwippingStarted: false,
        sideMenuIsDismissing: false,
      };

      /** Component Bindings */
      Navigation.events().bindComponent(this);
    }

    /**
     * [ Built-in React method. ]
     *
     * Executed when the component is mounted to the screen
     */
    componentDidMount() {
      /** Props */
      const {direction, fadeOpacity} = this.props;

      // Animate side menu open
      this.animatedDrawer = Animated.timing(this.state.sideMenuOpenValue, {
        toValue: this.drawerOpenedValues[(direction as DrawerDirection) || "left"],
        duration: this.props.animationOpenTime || 300,
      });

      // Animate outside side menu opacity
      this.animatedOpacity = Animated.timing(this.state.sideMenuOverlayOpacity, {
        toValue: fadeOpacity || 0.6,
        duration: this.props.animationOpenTime || 300,
      });
    }

    /**
     * [ Built-in React method. ]
     *
     * Executed when the components props are updated.
     */
    componentDidUpdate(prevProps: DrawerProps) {
      /** Props */
      const {dismiss} = this.props;
      const {dismiss: prevDismiss} = prevProps;

      if (dismiss !== prevDismiss) {
        this.dismissDrawerWithAnimation();
      }
    }

    /**
     * [ react-native-navigation method. ]
     *
     * Executed when the component is navigated to view.
     */
    componentDidAppear() {
      this.registerListeners();

      // If there has been no swipping, and this componnet appears, then just start the open animations
      if (!this.state.sideMenuSwippingStarted) {
        if (!this.animatedDrawer || !this.animatedOpacity) {
          console.warn("Animated drawer or opacity was undefined, not animating");
          return;
        }
        this.animatedDrawer.start();
        this.animatedOpacity.start();
      }
    }

    /**
     * [ react-native-navigation method. ]
     *
     * Executed when the component is navigated away from view.
     */
    componentDidDisappear() {
      this.removeListeners();

      emit("DRAWER_CLOSED", {});
    }

    /**
     * Registers all the listenrs for this component
     */
    registerListeners = () => {
      /** Props */
      const {direction, fadeOpacity} = this.props;

      // Executes when the side of the screen interaction starts
      this.unsubscribeSwipeStart = on("SWIPE_START", () => {
        this.setState({
          sideMenuSwippingStarted: true,
        });
      });

      // Executes when the side of the screen is interacted with

      this.unsubscribeSwipeMove = on(
        "SWIPE_MOVE",
        ({value, direction: swipeDirection}: {value: any; direction: DrawerDirection}) => {
          if (swipeDirection === "left") {
            // Calculates the position of the drawer from the left side of the screen
            const alignedMovementValue = value - this.drawerWidth;
            // Calculates the percetage 0 - 100 of which the drawer is open
            const openedPercentage = Math.abs(
              (Math.abs(alignedMovementValue) / this.drawerWidth) * 100 - 100
            );
            // Calculates the opacity to set of the screen based on the percentage the drawer is open
            const normalizedOpacity = Math.min(
              openedPercentage / 100,
              fadeOpacity || DEFAULT_FADE_OPACITY
            );

            // Does allow the drawer to go further than the maximum width
            if (this.drawerOpenedValues[direction as DrawerDirection] > alignedMovementValue) {
              // Sets the animation values, we use this so we can resume animation from any point
              this.state.sideMenuOpenValue.setValue(alignedMovementValue);
              this.state.sideMenuOverlayOpacity.setValue(normalizedOpacity);
            }
          } else if (swipeDirection === "right") {
            // Works out the distance from right of screen to the finger position
            const normalizedValue = this.screenWidth - value;
            // Calculates the position of the drawer from the left side of the screen
            const alignedMovementValue = this.screenWidth - normalizedValue;
            // Calculates the percetage 0 - 100 of which the drawer is open
            console.log({normalizedValue, alignedMovementValue});
            const openedPercentage = Math.abs((Math.abs(normalizedValue) / this.drawerWidth) * 100);
            // Calculates the opacity to set of the screen based on the percentage the drawer is open
            const normalizedOpacity = Math.min(
              openedPercentage / 100,
              fadeOpacity || DEFAULT_FADE_OPACITY
            );

            // Does allow the drawer to go further than the maximum width
            if (this.drawerOpenedValues[direction as DrawerDirection] < alignedMovementValue) {
              // Sets the animation values, we use this so we can resume animation from any point
              this.state.sideMenuOpenValue.setValue(alignedMovementValue);
              this.state.sideMenuOverlayOpacity.setValue(normalizedOpacity);
            }
          }
        }
      );

      // Executes when the side of the screen interaction ends
      this.unsubscribeSwipeEnd = on("SWIPE_END", (swipeDirection: Direction) => {
        const reverseDirection: {[key: string]: string} = {
          right: "left",
          left: "right",
        };

        if (swipeDirection === reverseDirection[direction]) {
          if (!this.animatedDrawer || !this.animatedOpacity) {
            console.warn("Animated drawer or opacity was undefined, not animating");
            return;
          }
          this.animatedDrawer.start();
          this.animatedOpacity.start();
        } else {
          if (!this.state.sideMenuIsDismissing) {
            this.setState(
              {
                sideMenuIsDismissing: true,
              },
              () => {
                this.dismissDrawerWithAnimation();
              }
            );
          }
        }
      });

      // Executes when the drawer needs to be dismissed
      this.unsubscribeDismissDrawer = on("DISMISS_DRAWER", () => {
        if (!this.state.sideMenuIsDismissing) {
          this.dismissDrawerWithAnimation();
        }
      });
    };

    /**
     * Removes all the listenrs from this component
     */
    removeListeners = () => {
      this.unsubscribeSwipeStart();
      this.unsubscribeSwipeMove();
      this.unsubscribeSwipeEnd();
      this.unsubscribeDismissDrawer();
    };

    /**
     * Touched outside drawer
     */
    touchedOutside = () => {
      const {dismissWhenTouchOutside} = this.props;

      if (dismissWhenTouchOutside) {
        this.dismissDrawerWithAnimation();
      }
    };

    /**
     * Dismisses drawer with animation
     */
    dismissDrawerWithAnimation = () => {
      const {direction} = this.props;
      // const {sideMenuIsDismissing} = this.state;
      const closeValues = {
        left: -this.drawerWidth,
        right: this.screenWidth,
        top: -this.drawerHeight,
        bottom: this.screenHeight,
      };

      // Animate side menu close
      Animated.timing(this.state.sideMenuOpenValue, {
        toValue: closeValues[direction as DrawerDirection],
        duration: this.props.animationCloseTime,
      }).start(() => {
        Navigation.dismissOverlay(this.props.componentId);
        this.setState({sideMenuIsDismissing: false});
      });

      // Animate outside side menu opacity
      Animated.timing(this.state.sideMenuOverlayOpacity, {
        toValue: 0,
        duration: this.props.animationCloseTime,
      }).start();
    };

    /**
     * [ Built-in React method. ]
     *
     * Allows us to render JSX to the screen
     */
    render() {
      /** Styles */
      const {sideMenuOverlayStyle, sideMenuContainerStyle} = styles;
      /** Props */
      const {direction, style} = this.props;
      /** State */
      const {sideMenuOpenValue, sideMenuOverlayOpacity} = this.state;
      /** Variables */
      const animatedValue =
        direction === "left" || direction === "right"
          ? {marginLeft: sideMenuOpenValue}
          : {marginTop: sideMenuOpenValue};

      return (
        <View style={sideMenuContainerStyle}>
          <TouchableWithoutFeedback onPress={this.touchedOutside}>
            <Animated.View style={[sideMenuOverlayStyle, {opacity: sideMenuOverlayOpacity}]} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              {backgroundColor: "#FFF"},
              style,
              {
                height: this.drawerHeight,
                width: this.drawerWidth,
                ...animatedValue,
              },
            ]}
          >
            <Component {...this.props} />
          </Animated.View>
        </View>
      );
    }
  }

  return WrappedDrawer;
};

export default RNNDrawer;
