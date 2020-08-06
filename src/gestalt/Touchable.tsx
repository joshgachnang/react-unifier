import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
require("./Typography.module.css");
const styles = require("./Touchable.module.css");
const borders = require("./Borders.module.css");
import {fromClassName, identity, toProps, Style} from "./style";
import {bind, range} from "./transforms";

type MouseCursor =
  | "copy"
  | "grab"
  | "grabbing"
  | "move"
  | "noDrop"
  | "pointer"
  | "zoomIn"
  | "zoomOut";
type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle" | "pill";

interface Props {
  children?: React.ReactNode;
  fullHeight?: boolean;
  fullWidth?: boolean;
  mouseCursor?: MouseCursor;
  onMouseEnter?: (arg0: {event: React.MouseEvent<HTMLDivElement>}) => void;
  onMouseLeave?: (arg0: {event: React.MouseEvent<HTMLDivElement>}) => void;
  onTouch?: (arg0: {
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
  }) => void;
  rounding?: Rounding;
}

const SPACE_CHAR_CODE = 32;
const ENTER_CHAR_CODE = 13;

const RoundingPropType = PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, "circle", "pill"]);

const getRoundingStyle = (r: Rounding): Style => {
  if (typeof r === "number") {
    return bind(range("rounding"), borders)(r);
  }

  if (r === "circle") {
    return fromClassName(borders.circle);
  }

  if (r === "pill") {
    return fromClassName(borders.pill);
  }

  return identity();
};

export default class Touchable extends React.Component<Props> {
  static propTypes = {
    children: PropTypes.node,
    fullHeight: PropTypes.bool,
    fullWidth: PropTypes.bool,
    mouseCursor: PropTypes.oneOf([
      "copy",
      "grab",
      "grabbing",
      "move",
      "noDrop",
      "pointer",
      "zoomIn",
      "zoomOut",
    ]),
    onTouch: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    rounding: RoundingPropType,
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const {onTouch} = this.props;
    // Check to see if space or enter were pressed
    if (onTouch && (event.charCode === SPACE_CHAR_CODE || event.charCode === ENTER_CHAR_CODE)) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onTouch({event});
    }
  };

  handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const {onMouseEnter} = this.props;
    if (onMouseEnter) {
      onMouseEnter({event});
    }
  };

  handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const {onMouseLeave} = this.props;
    if (onMouseLeave) {
      onMouseLeave({event});
    }
  };

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const {onTouch} = this.props;
    if (onTouch) {
      onTouch({event});
    }
  };

  render() {
    const {
      children,
      fullWidth = true,
      fullHeight,
      mouseCursor = "pointer",
      rounding = 0,
    } = this.props;

    const classes = classnames(
      styles.touchable,
      styles[mouseCursor],
      toProps(getRoundingStyle(rounding)).className,
      {
        [styles.fullHeight]: fullHeight,
        [styles.fullWidth]: fullWidth,
      }
    );

    return (
      <div
        className={classes}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onKeyPress={this.handleKeyPress}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    );
  }
}
