/* eslint-disable @typescript-eslint/no-var-requires */

import cx from "classnames";
import * as React from "react";
import {TextProps} from "./UnifiedCommon";
import {Unifier} from "./Unifier";

const styles = require("./gestalt/Text.module.css");
const typography = require("./gestalt/Typography.module.css");

const SIZE_SCALE: {[size: string]: number} = {
  sm: 1,
  md: 2,
  lg: 3,
};

export function Text({
  align = "left",
  children,
  color = "darkGray",
  inline = false,
  italic = false,
  overflow = "normal",
  size = "lg",
  // leading,
  truncate = false,
  weight = "normal",
  underline = false,
}: TextProps) {
  const scale = (SIZE_SCALE as any)[size];

  const cs = cx(
    styles.Text,
    styles[`fontSize${scale}`],
    // leading === "short" && typography.leadingShort,
    // (leading === "tall" || __dangerouslyIncreaseLineHeight) && typography.leadingTall,
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
    <Tag
      className={cs}
      style={{color: Unifier.theme[color]}}
      {...(truncate && typeof children === "string" ? {title: children} : null)}
    >
      {children}
    </Tag>
  );
}
