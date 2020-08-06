import {BoxProps} from "./UnifiedCommon";
import * as React from "react";
import {Box} from "./Box";

export class Card extends React.Component<BoxProps, {}> {
  render() {
    return (
      <Box
        direction="row"
        display="flex"
        color={this.props.color}
        shape="rounded"
        // shadow={true}
        marginBottom={4}
        // marginLeft={2}
        // marginRight={2}
        width="100%"
        {...this.props}
      >
        {this.props.children}
      </Box>
    );
  }
}
