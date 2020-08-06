import * as React from "react";
import {MaskProps} from "./UnifiedCommon";
import {Mask as GestaltMask} from "./gestalt";

type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle";

export class Mask extends React.Component<MaskProps, {}> {
  render() {
    const shape = this.props.shape;
    let rounding: Rounding = 0;
    if (shape === "rounded") {
      rounding = 4;
    } else if (shape === "circle") {
      rounding = "circle";
    }
    return (
      <GestaltMask {...this.props} rounding={rounding}>
        {this.props.children}
      </GestaltMask>
    );
  }
}
