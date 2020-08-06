import * as React from "react";
import {ScrollViewProps} from "./UnifiedCommon";
import {Box} from "./Box";

export class ScrollView extends React.Component<ScrollViewProps, {}> {
  render() {
    const {
      children,
      contentContainerStyle,
      horizontal,
      style,
      // onScroll
    } = this.props;
    return (
      <Box dangerouslySetInlineStyle={style} overflow={horizontal ? "scrollX" : "scrollY"}>
        <Box display="flex" dangerouslySetInlineStyle={contentContainerStyle}>
          {children}
        </Box>
      </Box>
    );
  }
}
