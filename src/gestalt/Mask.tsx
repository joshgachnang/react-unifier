import * as React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
const styles = require("./Mask.module.css");
const borders = require("./Borders.module.css");
require("./Typography.module.css");
import {fromClassName, identity, toProps, Style} from "./style";
import {bind, range} from "./transforms";

type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle";

interface Props {
  children?: React.ReactNode;
  height?: number | string;
  rounding?: Rounding;
  width?: number | string;
  willChangeTransform?: boolean;
  wash?: boolean;
  maxHeight?: number | string;
  maxWidth?: number | string;
}

const getRoundingStyle = (r: Rounding): Style => {
  if (typeof r === "number") {
    return bind(range("rounding"), borders)(r);
  }

  if (r === "circle") {
    return fromClassName(borders.circle);
  }

  return identity();
};

export default function Mask(props: Props) {
  const {
    children,
    rounding = 0,
    width,
    height,
    maxWidth,
    maxHeight,
    willChangeTransform = true,
    wash = false,
  } = props;
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

const RoundingPropType = PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, "circle"]);

Mask.propTypes = {
  children: PropTypes.node,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rounding: RoundingPropType,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  willChangeTransform: PropTypes.bool,
  wash: PropTypes.bool,
};
