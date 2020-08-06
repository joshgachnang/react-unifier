import {Text as GestaltText} from "./gestalt";
import * as React from "react";
import {TextProps, TextColor} from "./UnifiedCommon";

export class Text extends React.Component<TextProps, {}> {
  render() {
    const {color, bold, ...rest} = this.props;
    return (
      <GestaltText color={color as TextColor} {...rest} weight={bold ? "bold" : "normal"}>
        {this.props.children}
      </GestaltText>
    );
  }
}
