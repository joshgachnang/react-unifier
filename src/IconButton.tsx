import * as React from "react";
import {IconButtonProps} from "./UnifiedCommon";
import {Unifier} from "./Unifier";

import classnames from "classnames";
import styles from "./gestalt/IconButton.module.css";
import Pog from "./Pog";

export function IconButton({
  accessibilityLabel,
  bgColor,
  disabled,
  iconColor,
  icon,
  selected,
  size,
  onClick,
}: IconButtonProps) {
  const [isActive, setActive] = React.useState(false);
  const [isFocused, setFocused] = React.useState(false);
  const [isHovered, setHovered] = React.useState(false);

  return (
    <button
      aria-expanded={false}
      aria-haspopup={false}
      aria-label={accessibilityLabel}
      className={classnames(styles.button, disabled ? styles.disabled : styles.enabled)}
      disabled={disabled}
      onBlur={() => setFocused(false)}
      onClick={(event) => {
        event.stopPropagation();
        Unifier.utils.haptic();
        onClick();
      }}
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
