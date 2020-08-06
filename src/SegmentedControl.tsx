import * as React from "react";
import {SegmentedControlProps} from "./UnifiedCommon";
import {SegmentedControl as GestaltSC} from "./gestalt";
export class SegmentedControl extends React.Component<SegmentedControlProps, {}> {
  render() {
    return <GestaltSC {...(this.props as any)} />;
  }
}
