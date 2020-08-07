import {$Keys} from "utility-types";

import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
const styles = require("./IconButton.module.css");
import icons from "./icons/index";
import Pog from "./Pog";

interface Props {
  accessibilityExpanded?: boolean;
  accessibilityHaspopup?: boolean;
  accessibilityLabel: string;
  bgColor?: "transparent" | "transparentDarkGray" | "gray" | "lightGray" | "white" | "blue";
  dangerouslySetSvgPath?: {__path: string};
  disabled?: boolean;
  iconColor?: "gray" | "darkGray" | "red" | "blue" | "white" | "orange";
  icon?: $Keys<typeof icons>;
  onClick?: (arg0: {event: React.MouseEvent}) => void;
  selected?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function IconButton({
  accessibilityExpanded,
  accessibilityHaspopup,
  accessibilityLabel,
  bgColor,
  dangerouslySetSvgPath,
  disabled,
  iconColor,
  icon,
  selected,
  size,
  onClick,
}: Props) {
  const [isActive, setActive] = React.useState(false);
  const [isFocused, setFocused] = React.useState(false);
  const [isHovered, setHovered] = React.useState(false);

  return (
    <button
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classnames(styles.button, disabled ? styles.disabled : styles.enabled)}
      disabled={disabled}
      onBlur={() => setFocused(false)}
      onClick={(event) => onClick && onClick({event})}
      onFocus={() => setFocused(true)}
      onMouseDown={() => setActive(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setActive(false);
        setHovered(false);
      }}
      onMouseUp={() => setActive(false)}
      type="button"
    >
      <Pog
        active={!disabled && isActive}
        bgColor={bgColor}
        dangerouslySetSvgPath={dangerouslySetSvgPath}
        focused={!disabled && isFocused}
        hovered={!disabled && isHovered}
        iconColor={iconColor}
        selected={selected}
        icon={icon}
        size={size}
      />
    </button>
  );
}
