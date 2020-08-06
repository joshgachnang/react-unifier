import * as React from "react";
import PropTypes from "prop-types";
const layout = require("./Layout.module.css");

type Threshold =
  | {top: number | string}
  | {bottom: number | string}
  | {left: number | string}
  | {right: number | string}
  | {top: number | string; bottom: number | string}
  | {left: number | string; right: number | string}
  | {
      top: number | string;
      left: number | string;
      right: number | string;
      bottom: number | string;
    };

type Props = Threshold & {
  children: React.ReactNode;
  dangerouslySetZIndex?: {__zIndex: number};
};

export default function Sticky(props: Props) {
  const {dangerouslySetZIndex = {__zIndex: 1}, children} = props;
  const p = props as any;
  const style = {
    top: p.top != null ? p.top : undefined,
    left: p.left != null ? p.left : undefined,
    right: p.right != null ? p.right : undefined,
    bottom: p.bottom != null ? p.bottom : undefined,
    // eslint-disable-next-line no-underscore-dangle
    zIndex: dangerouslySetZIndex.__zIndex,
  };
  return (
    <div className={layout.sticky} style={style}>
      {children}
    </div>
  );
}

Sticky.propTypes = {
  children: PropTypes.node,
  dangerouslySetZIndex: PropTypes.exact({
    __zIndex: PropTypes.number,
  }),
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
