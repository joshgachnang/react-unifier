/* eslint-disable @typescript-eslint/no-var-requires */
import cx from "classnames";
import * as React from "react";
import {fromClassName, identity, Style, toProps} from "./gestalt/style";
import {bind, range} from "./gestalt/transforms";
import {MaskProps, Rounding} from "./UnifiedCommon";

const styles = require("./gestalt/Mask.module.css");
const borders = require("./gestalt/Borders.module.css");

require("./gestalt/Typography.module.css");

const getRoundingStyle = (r: Rounding): Style => {
  if (typeof r === "number") {
    return bind(range("rounding"), borders)(r);
  }

  if (r === "circle") {
    return fromClassName(borders.circle);
  }

  return identity();
};

export function Mask(props: MaskProps) {
  let {
    children,
    rounding = 0,
    width,
    height,
    maxWidth,
    maxHeight,
    willChangeTransform = true,
    wash = false,
    shape,
  } = props;
  if (shape === "rounded") {
    rounding = 4;
  } else if (shape === "circle") {
    rounding = "circle";
  }
  return (
    <div
      className={cx(styles.Mask, toProps(getRoundingStyle(rounding)).className, {
        [styles.willChangeTransform]: willChangeTransform,
      })}
      style={{width, height, maxWidth, maxHeight}}
    >
      {children}
      {wash && <div className={styles.wash} />}
    </div>
  );
}
