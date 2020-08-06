import * as React from "react";
import {Box} from "./Box";
import {Text} from "./Text";
import {WithLabelProps} from "./UnifiedCommon";

export class WithLabel extends React.Component<WithLabelProps, {}> {
  render() {
    const {label, labelInline, labelColor, children} = this.props;
    if (!children) {
      return null;
    }

    if (label) {
      return (
        <Box
          direction={labelInline ? "row" : "column"}
          justifyContent={this.props.labelJustifyContent}
        >
          {this.props.labelPlacement !== "after" && (
            <Box paddingY={1}>
              <Text size={this.props.labelSize} color={labelColor || "darkGray"} bold={true}>
                {label}
              </Text>
            </Box>
          )}
          {children}
          {this.props.labelPlacement === "after" && (
            <Box paddingY={1}>
              <Text size={this.props.labelSize} color={labelColor || "darkGray"}>
                {label}
              </Text>
            </Box>
          )}
        </Box>
      );
    } else {
      return children;
    }
  }
}
