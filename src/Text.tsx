import {Text as GestaltText} from "./gestalt";
import * as React from "react";
import {TextProps, TextColor} from "./UnifiedCommon";

export class Text extends React.Component<TextProps, {}> {
  render() {
    const {color, ...rest} = this.props;
    return (
      <GestaltText color={color as TextColor} {...rest}>
        {this.props.children}
      </GestaltText>
    );
  }
}
