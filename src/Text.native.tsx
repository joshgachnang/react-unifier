import * as React from "react";
import {Text as NativeText} from "react-native";
// import Hyperlink from "react-native-hyperlink";
import {TextProps} from "./Common";
import {Unifier} from "./Unifier";

export class Text extends React.Component<TextProps, {}> {
  fontSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  propsToStyle(): any {
    const style: any = {};

    let font = this.props.font || "primary";
    if (this.props.weight === "bold") {
      font += "Bold";
    }
    font += "Font";
    style.fontFamily = Unifier.theme[font];

    style.fontSize = this.fontSizes[this.props.size || "md"];
    if (this.props.align) {
      style.textAlign = this.props.align;
    }
    if (this.props.color) {
      style.color = Unifier.theme[this.props.color];
    } else {
      style.color = Unifier.theme.darkGray;
    }
    // TODO: might be useful for wrapping/truncating
    // if (this.props.numberOfLines !== 1 && !this.props.inline) {
    //   style.flexWrap = "wrap";
    // }
    return style;
  }

  render() {
    let lines = 0;
    if (this.props.numberOfLines) {
      lines = this.props.numberOfLines;
    } else if (this.props.inline) {
      lines = 1;
    }
    const inner = (
      <NativeText numberOfLines={lines} style={this.propsToStyle()}>
        {this.props.children}
      </NativeText>
    );
    if (this.props.skipLinking) {
      return inner;
    } else {
      return (
        // <Hyperlink linkDefault={true} linkStyle={{textDecorationLine: "underline"}}>
        inner
        // </Hyperlink>
      );
    }
  }
}
