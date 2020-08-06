import * as React from "react";
import {TextFieldProps} from "./UnifiedCommon";
import {TextField as GestaltTextField} from "./gestalt";
import {Box} from "./Box";

export class TextField extends React.Component<TextFieldProps, {}> {
  render() {
    let type = this.props.type;
    if (type === "decimal") {
      type = "number";
    } else if (type === "username") {
      type = "text";
    } else if (type === "search") {
      type = "text";
    }
    return (
      <Box width="100%">
        <GestaltTextField
          id={this.props.id || this.props.name || "unknown"}
          type={type as any}
          {...this.props}
        />
      </Box>
    );
  }
}
