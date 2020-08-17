import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
const styles = require("./Button.module.css");
import Text from "./Text";

const DEFAULT_TEXT_COLORS = {
  blue: "white",
  gray: "darkGray",
  red: "white",
  transparent: "white",
  white: "darkGray",
};

interface Props {
  accessibilityExpanded?: boolean;
  accessibilityHaspopup?: boolean;
  accessibilityLabel?: string;
  color?: "gray" | "red" | "blue" | "transparent" | "white";
  disabled?: boolean;
  inline?: boolean;
  name?: string;
  onClick?: (arg0: {event: React.MouseEvent}) => void;
  selected?: boolean;
  size?: "sm" | "md" | "lg";
  text: string;
  textColor?: "white" | "darkGray" | "blue" | "red";
  type?: "submit" | "button";
}

export default function Button(props: Props) {
  const {
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityLabel,
    color = "gray",
    disabled = false,
    inline = false,
    name,
    onClick,
    selected = false,
    size = "md",
    text,
    textColor,
    type = "button",
  } = props;

  const classes = classnames(styles.button, {
    [styles.sm]: size === "sm",
    [styles.md]: size === "md",
    [styles.lg]: size === "lg",
    [styles.solid]: color !== "transparent",
    [styles[color]]: !disabled && !selected,
    [styles.selected]: !disabled && selected,
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [styles.inline]: inline,
    [styles.block]: !inline,
  });

  /* eslint-disable react/button-has-type */
  return (
    <button
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classes}
      disabled={disabled}
      name={name}
      onClick={(event) => onClick && onClick({event})}
      type={type}
    >
      <Text
        align="center"
        color={
          ((disabled && "gray") ||
            (selected && "white") ||
            textColor ||
            DEFAULT_TEXT_COLORS[color]) as any
        }
        overflow="normal"
        weight="bold"
      >
        {text}
      </Text>
    </button>
  );
  /* eslint-enable react/button-has-type */
}

Button.propTypes = {
  accessibilityExpanded: PropTypes.bool,
  accessibilityHaspopup: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
  color: PropTypes.oneOf(["blue", "gray", "red", "transparent", "white"]),
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  text: PropTypes.string.isRequired,
  textColor: PropTypes.oneOf(["white", "darkGray", "blue", "red"]),
  type: PropTypes.oneOf(["button", "submit"]),
};