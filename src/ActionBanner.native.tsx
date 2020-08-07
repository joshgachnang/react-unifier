import * as React from "react";
import {Box} from "./Box";
import {Text} from "./Text";
import {IconButton} from "./IconButton";
import {ActionBannerProps, ButtonColor} from "./UnifiedCommon";

export class ActionBanner extends React.Component<ActionBannerProps, {}> {
  render() {
    const negativeMargin = (this.props.negativeXMargin || 0) * -4;
    return (
      <Box
        onClick={this.props.onClick}
        paddingY={2}
        marginTop={3}
        marginBottom={3}
        color={this.props.color || "secondaryDark"}
        direction="row"
        dangerouslySetInlineStyle={{
          __style: {marginLeft: negativeMargin, marginRight: negativeMargin},
        }}
      >
        <Box marginLeft={3} flex="grow" display="flex" justifyContent="center" alignItems="center">
          <Text align="center" color={this.props.textColor || "white"} weight="bold">
            {this.props.text}
          </Text>
        </Box>
        <Box alignItems="center" justifyContent="center">
          <IconButton
            prefix={"fas"}
            icon={"arrow-right"}
            size="lg"
            onClick={this.props.onClick}
            accessibilityLabel=""
            iconColor={(this.props.textColor || "white") as ButtonColor}
          />
        </Box>
      </Box>
    );
  }
}
