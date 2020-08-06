// @flow

import * as React from "react";
import cx from "classnames";
const colors = require("./Colors.module.css");
const styles = require("./Text.module.css");
const typography = require("./Typography.module.css");

const SIZE_SCALE: {[size: string]: number} = {
  sm: 1,
  md: 2,
  lg: 3,
};

interface Props {
  align?: "left" | "right" | "center" | "justify";
  children?: React.ReactNode;
  color?:
    | "green"
    | "pine"
    | "olive"
    | "blue"
    | "navy"
    | "midnight"
    | "purple"
    | "orchid"
    | "eggplant"
    | "maroon"
    | "watermelon"
    | "orange"
    | "darkGray"
    | "gray"
    | "lightGray"
    | "red"
    | "white";
  inline?: boolean;
  italic?: boolean;
  overflow?: "normal" | "breakWord";
  size?: "sm" | "md" | "lg";
  leading?: "tall" | "short";
  truncate?: boolean;
  weight?: "bold" | "normal";
  underline?: boolean;
  __dangerouslyIncreaseLineHeight?: boolean;
}

export default function Text({
  align = "left",
  children,
  color = "darkGray",
  inline = false,
  italic = false,
  overflow = "normal",
  size = "lg",
  leading,
  truncate = false,
  weight = "normal",
  underline = false,
  __dangerouslyIncreaseLineHeight = false,
}: Props) {
  const scale = (SIZE_SCALE as any)[size];

  const cs = cx(
    styles.Text,
    styles[`fontSize${scale}`],
    color === "blue" && colors.blue,
    color === "darkGray" && colors.darkGray,
    color === "eggplant" && colors.eggplant,
    color === "gray" && colors.gray,
    color === "green" && colors.green,
    color === "lightGray" && colors.lightGray,
    color === "maroon" && colors.maroon,
    color === "midnight" && colors.midnight,
    color === "navy" && colors.navy,
    color === "olive" && colors.olive,
    color === "orange" && colors.orange,
    color === "orchid" && colors.orchid,
    color === "pine" && colors.pine,
    color === "purple" && colors.purple,
    color === "red" && colors.red,
    color === "watermelon" && colors.watermelon,
    color === "white" && colors.white,
    leading === "short" && typography.leadingShort,
    (leading === "tall" || __dangerouslyIncreaseLineHeight) && typography.leadingTall,
    align === "center" && typography.alignCenter,
    align === "justify" && typography.alignJustify,
    align === "left" && typography.alignLeft,
    align === "right" && typography.alignRight,
    overflow === "breakWord" && typography.breakWord,
    italic && typography.fontStyleItalic,
    weight === "bold" && typography.fontWeightBold,
    weight === "normal" && typography.fontWeightNormal,
    underline && typography.underline,
    truncate && typography.truncate
  );
  const Tag = inline ? "span" : "div";
  return (
    <Tag className={cs} {...(truncate && typeof children === "string" ? {title: children} : null)}>
      {children}
    </Tag>
  );
}
