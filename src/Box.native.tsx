import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {AlignContent, AlignItems, AlignSelf, COLOR_MAP, JustifyContent, SPACING} from "./Common";
import {BoxProps} from "./Common";
import {Unifier} from "./Unifier";

const ALIGN_CONTENT = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  stretch: "stretch",
};

const ALIGN_ITEMS = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  baseline: "baseline",
  stretch: "stretch",
};

const ALIGN_SELF = {
  auto: "auto",
  baseline: "baseline",
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  stretch: "stretch",
};

export class Box extends React.Component<BoxProps, {}> {
  BOX_STYLE_MAP: {
    [prop: string]: (value: any) => {[style: string]: string | number} | {};
  } = {
    alignItems: (value: AlignItems) => ({alignItems: ALIGN_ITEMS[value]}),
    alignContent: (value: AlignContent) => ({alignContent: ALIGN_CONTENT[value]}),
    alignSelf: (value: AlignSelf) => ({alignSelf: ALIGN_SELF[value]}),
    color: (value) => ({backgroundColor: Unifier.theme[value]}),
    direction: (value: any) => ({flexDirection: value}),
    display: (value: any) => {
      return value === "flex" ? {flex: 1} : {flex: 0};
    },
    flex: (value: string) => {
      if (value === "grow") {
        return {flexGrow: 1};
      } else if (value === "shrink") {
        return {flexShrink: 1};
      } else {
        return {flex: 0};
      }
    },
    justifyContent: (value: JustifyContent) => ({justifyContent: ALIGN_CONTENT[value]}),
    height: (value) => {
      if (this.props.border && !isNaN(Number(value))) {
        return {height: Number(value) + 2 * 2};
      } else {
        return {height: value};
      }
    },
    margin: (value) => ({margin: value * SPACING}),
    marginRight: (value) => ({marginRight: value * SPACING}),
    marginLeft: (value) => ({marginLeft: value * SPACING}),
    marginTop: (value) => ({marginTop: value * SPACING}),
    marginBottom: (value) => ({marginBottom: value * SPACING}),
    paddingX: (value) => ({paddingLeft: value * SPACING, paddingRight: value * SPACING}),
    paddingY: (value) => ({paddingTop: value * SPACING, paddingBottom: value * SPACING}),
    padding: (value) => ({padding: value * SPACING}),
    position: (value) => ({position: value}),
    top: (top) => ({top}),
    bottom: (bottom) => ({bottom}),
    right: (right) => ({right}),
    left: (left) => ({left}),
    rounding: (rounding) => ({borderRadius: rounding * 4}),
    // scroll: () => ({flex: 1}),
    overflow: (value) => {
      if (value === "scrollY" || value === "scroll") {
        return {overflow: "scroll"};
      }
      return {};
    },
    width: (value) => {
      if (this.props.border && !isNaN(Number(value))) {
        return {width: Number(value) + 2 * 2};
      } else {
        return {width: value};
      }
    },
    wrap: (value) => ({flexWrap: value ? "wrap" : "nowrap", alignItems: "flex-start"}),
    shadow: (value) => {
      if (!value) {
        return {};
      }
      if (Platform.OS === "ios") {
        return {
          shadowColor: "#999",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowRadius: 2,
          shadowOpacity: 1.0,
        };
      } else {
        return {elevation: 4};
      }
    },
    shape: (value) => {
      switch (value) {
        case "rounded":
          return {borderRadius: 10};
        case "pill":
          return {borderRadius: 10000};
        case "circle":
        case "roundedTop":
        case "roundedBottom":
        case "roundedLeft":
        case "roundedRight":
          console.warn("Unsupported box shape", value);
      }
      return {};
    },
    border: (value) => {
      if (!value) {
        return {};
      }
      return {borderColor: Unifier.theme[value], borderWidth: 2};
    },
  };

  scrollRef = React.createRef();

  constructor(props: BoxProps) {
    super(props);
    if (props.scrollRef) {
      this.scrollRef = props.scrollRef;
    }
  }

  public scrollToEnd = () => {
    if (this.scrollRef && this.scrollRef.current) {
      // HACK HACK HACK...but it works. Probably need to do some onContentSizeChange or onLayout to
      // avoid this, but it works well enough.
      setTimeout(() => {
        this.scrollRef && this.scrollRef.current && (this.scrollRef.current as any).scrollToEnd();
      }, 50);
    }
  };

  public scrollTo = (y: number) => {
    if (this.scrollRef && this.scrollRef.current) {
      // HACK HACK HACK...but it works. Probably need to do some onContentSizeChange or onLayout to
      // avoid this, but it works well enough.
      setTimeout(() => {
        this.scrollRef && this.scrollRef.current && (this.scrollRef.current as any).scrollTo({y});
      }, 50);
    }
  };

  propsToStyle(): any {
    let style: any = {};
    for (const prop of Object.keys(this.props)) {
      const value = (this.props as any)[prop];
      if (this.BOX_STYLE_MAP[prop]) {
        Object.assign(style, this.BOX_STYLE_MAP[prop](value));
      } else if (prop !== "children" && prop !== "onClick") {
        style[prop] = value;
        // console.warn(`Box: unknown property ${prop}`);
      }
    }

    if (this.props.wrap && this.props.alignItems) {
      console.warn("React Native doesn't support wrap and alignItems together.");
    }

    // Finally, dangerously set overrides.
    if (this.props.dangerouslySetInlineStyle) {
      style = {...style, ...this.props.dangerouslySetInlineStyle.__style};
    }

    return style;
  }

  renderBox() {
    return (
      <View style={!this.props.scroll && !this.props.overflow && this.propsToStyle()}>
        {this.props.children}
      </View>
    );
  }

  render() {
    let box;

    if (this.props.onClick) {
      box = (
        <TouchableOpacity
          style={this.propsToStyle()}
          // TODO: refactor this better..
          onLayout={this.props.onLayout}
          onPress={() => {
            Unifier.utils.haptic();
            this.props.onClick();
          }}
        >
          {this.props.children}
          {/* <View pointerEvents="none">{box}</View> */}
        </TouchableOpacity>
      );
    } else {
      box = <View style={this.propsToStyle()}>{this.props.children}</View>;
    }

    if (
      this.props.overflow &&
      this.props.overflow !== "scroll" &&
      this.props.overflow !== "scrollY"
    ) {
      console.warn(`Unsupported scroll: ${this.props.overflow}`);
    } else if (
      this.props.overflow === "scroll" ||
      this.props.overflow === "scrollY" ||
      this.props.scroll
    ) {
      const {justifyContent, alignContent, alignItems, ...scrollStyle} = this.propsToStyle();

      box = (
        <ScrollView
          style={scrollStyle}
          contentContainerStyle={{justifyContent, alignContent, alignItems}}
          keyboardShouldPersistTaps="handled"
          ref={this.props.scrollRef || this.scrollRef}
          onScroll={(event) => {
            if (this.props.onScroll && event) {
              this.props.onScroll(event.nativeEvent.contentOffset.y);
            }
          }}
          scrollEventThrottle={50}
        >
          {box}
        </ScrollView>
      );
    }

    if (this.props.avoidKeyboard) {
      box = (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex: 1, display: "flex"}}
          keyboardVerticalOffset={this.props.keyboardOffset}
        >
          <SafeAreaView style={{flex: 1, display: "flex"}}>{box}</SafeAreaView>
        </KeyboardAvoidingView>
      );
    }
    return box;
  }
}
