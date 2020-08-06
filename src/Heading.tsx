import * as React from "react";
import {HeadingProps} from "./UnifiedCommon";
import {Heading as GestaltHeading} from "./gestalt";

export class Heading extends React.Component<HeadingProps, {}> {
  render() {
    return (
      <GestaltHeading {...this.props} color={this.props.color as any}>
        {this.props.children}
      </GestaltHeading>
    );
  }
}
