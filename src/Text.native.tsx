import * as React from "react";
import {Text as NativeText} from "react-native";
import Hyperlink from "react-native-hyperlink";
import {FONT_MAP, TextProps} from "./Common";

export class Text extends React.Component<TextProps, {}> {
  fontSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  propsToStyle(): any {
    const style: any = {};

    let font = this.props.font || "primary";
    if (this.props.bold) {
      font += "Bold";
    }
    style.fontFamily = FONT_MAP[font];

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
        <Hyperlink linkDefault={true} linkStyle={{textDecorationLine: "underline"}}>
          {inner}
        </Hyperlink>
      );
    }
  }
}
