// @flow
import * as React from "react";
import cx from "classnames";
const colors = require("./Colors.module.css");
const styles = require("./Heading.module.css");
const typography = require("./Typography.module.css");

interface Props {
  accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: "left" | "right" | "center" | "justify";
  children?: React.ReactNode;
  color?:
    | "blue"
    | "darkGray"
    | "eggplant"
    | "gray"
    | "green"
    | "lightGray"
    | "maroon"
    | "midnight"
    | "navy"
    | "olive"
    | "orange"
    | "orchid"
    | "pine"
    | "purple"
    | "red"
    | "watermelon"
    | "white";
  id?: string;
  overflow?: "normal" | "breakWord";
  size?: "sm" | "md" | "lg";
  truncate?: boolean;
}

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

export default function Heading(props: Props) {
  const {
    accessibilityLevel,
    align = "left",
    children,
    color = "darkGray",
    id = null,
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
    colors[color],
    overflow === "breakWord" && typography.breakWord,
    truncate && typography.truncate
  );

  const headingLevel = accessibilityLevel || defaultHeadingLevels[size];
  let newProps: {[key: string]: any} = {className: cs};
  if (id) {
    newProps = {...newProps, id};
  }
  if (truncate && typeof children === "string") {
    newProps = {...newProps, title: children};
  }
  return React.createElement(`h${headingLevel}`, newProps, children);
}
