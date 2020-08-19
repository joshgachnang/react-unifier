import * as React from "react";
import classnames from "classnames";
import {Box} from "./Box";
import {Icon} from "./Icon";
import styles from "./Pog.module.css";
import {IconSize, IconPrefix, AllColors} from "./Common";

const SIZE_NAME_TO_PIXEL = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

// type PogColor = "gray" | "darkGray" | "red" | "blue" | "white" | "orange";
interface Props {
  active?: boolean;
  bgColor?: "transparent" | "transparentDarkGray" | "gray" | "lightGray" | "white" | "blue";
  focused?: boolean;
  hovered?: boolean;
  selected?: boolean;
  iconColor?: AllColors;
  icon: string;
  iconPrefix?: IconPrefix;
  size?: IconSize;
}

const defaultIconButtonIconColors = {
  blue: "white",
  darkGray: "white",
  gray: "white",
  lightGray: "gray",
  transparent: "gray",
  transparentDarkGray: "white",
  white: "gray",
};

export default function Pog(props: Props) {
  const {
    active = false,
    bgColor = "transparent",
    focused = false,
    hovered = false,
    iconColor,
    icon,
    iconPrefix = "fas",
    selected = false,
    size = "md",
  } = props;

  const iconSize = SIZE_NAME_TO_PIXEL[size] / 2;
  const color =
    (selected && "white") ||
    iconColor ||
    (defaultIconButtonIconColors[bgColor] as AllColors) ||
    "white";

  const inlineStyle = {
    height: SIZE_NAME_TO_PIXEL[size],
    width: SIZE_NAME_TO_PIXEL[size],
  };

  const classes = classnames(styles.pog, {
    [styles[bgColor]]: !selected,
    [styles.selected]: selected,
    [styles.active]: active,
    [styles.focused]: focused,
    [styles.hovered]: hovered && !focused && !active,
  });

  return (
    <div className={classes} style={inlineStyle}>
      <Box rounding="circle">
        {/*
         We're explicitly setting an empty string as a label on the Icon since we
         already have an aria-label on the button container.
         This is similar to having empty `alt` attributes:
         https://davidwalsh.name/accessibility-tip-empty-alt-attributes
        */}
        <Icon
          // accessibilityLabel=""
          color={color}
          // dangerouslySetSvgPath={dangerouslySetSvgPath}
          name={icon}
          size={iconSize}
          prefix={iconPrefix}
        />
      </Box>
    </div>
  );
}
