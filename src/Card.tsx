import {BoxProps} from "./UnifiedCommon";
import * as React from "react";
import {Box} from "./Box";

export class Card extends React.Component<BoxProps, {}> {
  render() {
    return (
      <Box
        direction="column"
        display="flex"
        color={this.props.color || "white"}
        shape="rounded"
        shadow={true}
        padding={this.props.padding || 4}
        width={this.props.width}
        {...this.props}
      >
        {this.props.children}
      </Box>
    );
  }
}