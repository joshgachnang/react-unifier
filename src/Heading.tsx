// Originally based on https://github.com/pinterest/gestalt
// Forked, updated to Typescript, and added features.
import cx from "classnames";
import * as React from "react";
import {HeadingProps} from "./Common";
import styles from "./Heading.module.css";
import typography from "./Typography.module.css";
import {Unifier} from "./Unifier";

const defaultHeadingLevels = {
  sm: 3,
  md: 2,
  lg: 1,
};

const SIZE_SCALE: {[size: string]: number} = {
  sm: 1,
  md: 2,
  lg: 3,
};

export function Heading(props: HeadingProps) {
  const {
    align = "left",
    children,
    color = "darkGray",
    overflow = "normal",
    size = "lg",
    truncate = false,
  } = props;

  const cs = cx(
    styles.Heading,
    styles[`fontSize${SIZE_SCALE[size]}`],
    align === "center" && typography.alignCenter,
    align === "justify" && typography.alignJustify,
    align === "left" && typography.alignLeft,
    align === "right" && typography.alignRight,
    overflow === "breakWord" && typography.breakWord,
    truncate && typography.truncate
  );

  const headingLevel = defaultHeadingLevels[size];
  let newProps: {[key: string]: any} = {
    className: cs,
    style: {color: Unifier.theme[color]},
  };

  if (truncate && typeof children === "string") {
    newProps = {...newProps, title: children};
  }
  return React.createElement(`h${headingLevel}`, newProps, children);
}
