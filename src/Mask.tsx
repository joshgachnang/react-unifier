// Originally based on https://github.com/pinterest/gestalt
// Forked, updated to Typescript, and added features.
import cx from "classnames";
import * as React from "react";
import borders from "./Borders.module.css";
import {MaskProps, Rounding} from "./Common";
import styles from "./Mask.module.css";
import {bind, fromClassName, identity, range, Style, toProps} from "./Utilities";

import "./Typography.module.css";

const getRoundingStyle = (r: Rounding): Style => {
  if (typeof r === "number") {
    return bind(range("rounding"), borders as any)(r);
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
