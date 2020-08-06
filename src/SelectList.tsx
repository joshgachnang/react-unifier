import * as React from "react";
import {SelectListProps} from "./UnifiedCommon";
import {SelectList as GestaltSelectList} from "./gestalt";

export class SelectList extends React.Component<SelectListProps, {}> {
  render() {
    const {id, ...rest} = this.props;
    return <GestaltSelectList id={id || "select"} {...rest} />;
  }
}
