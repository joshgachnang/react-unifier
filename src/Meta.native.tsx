import * as React from "react";
import {MetaProps} from "./UnifiedCommon";

export class Meta extends React.Component<MetaProps, {}> {
  render() {
    return this.props.children || null;
  }
}
