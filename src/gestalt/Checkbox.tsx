import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("./Colors.module.css");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const styles = require("./Checkbox.module.css");
import Box from "./Box";
import FormErrorMessage from "./FormErrorMessage";
import Icon from "./Icon";
import Label from "./Label";
import Text from "./Text";

interface Props {
  checked?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  id: string;
  indeterminate?: boolean;
  label?: string;
  name?: string;
  onChange: (arg0: {event: React.SyntheticEvent; checked: boolean}) => void;
  onClick?: (arg0: {event: React.SyntheticEvent<HTMLInputElement>; checked: boolean}) => void;
  size?: "sm" | "md";
}

export default function Checkbox({
  checked = false,
  disabled = false,
  errorMessage,
  hasError = false,
  id,
  indeterminate = false,
  label,
  name,
  onChange,
  onClick,
  size = "md",
}: Props) {
  const inputElement = React.useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHover] = React.useState(false);

  React.useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // TODO: fix the typing here.
  // const handleChange = (event: React.SyntheticEvent) => {
  const handleChange = (event: any) => {
    if (onChange) {
      onChange({event, checked: event.target.checked});
    }
  };

  const handleClick = (event: React.SyntheticEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick({event, checked: event.currentTarget.checked});
    }
  };

  const handleHover = () => {
    setHover(!hovered);
  };

  let bgStyle = colors.whiteBg;
  if (disabled) {
    bgStyle = colors.lightGrayBg;
  } else if (checked || indeterminate) {
    bgStyle = colors.darkGrayBg;
  }

  let borderStyle = styles.border;
  if (!disabled && (checked || indeterminate)) {
    borderStyle = styles.borderDarkGray;
  } else if (hasError || errorMessage) {
    borderStyle = styles.borderError;
  } else if (!disabled && hovered) {
    borderStyle = styles.borderHovered;
  }

  const borderRadiusStyle = size === "sm" ? styles.borderRadiusSm : styles.borderRadiusMd;

  const styleSize = size === "sm" ? styles.sizeSm : styles.sizeMd;

  return (
    <Box>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="start"
        marginLeft={-1}
        marginRight={-1}
      >
        <Label htmlFor={id}>
          <Box paddingX={1} position="relative">
            <input
              checked={checked}
              className={classnames(styles.input, styleSize, {
                [styles.inputEnabled]: !disabled,
              })}
              disabled={disabled}
              id={id}
              name={name}
              onBlur={() => setFocused(false)}
              onChange={handleChange}
              onClick={handleClick}
              onFocus={() => setFocused(true)}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              ref={inputElement}
              type="checkbox"
            />
            <div
              className={classnames(
                bgStyle,
                borderStyle,
                borderRadiusStyle,
                styleSize,
                styles.check,
                {
                  [styles.checkFocused]: focused,
                }
              )}
            >
              {(checked || indeterminate) && (
                <Icon
                  accessibilityLabel=""
                  color="white"
                  icon={indeterminate ? "dash" : "check"}
                  size={size === "sm" ? 8 : 12}
                />
              )}
            </div>
          </Box>
        </Label>

        {label && (
          <Label htmlFor={id}>
            <Box paddingX={1}>
              <Text color={disabled ? "gray" : undefined} size={size === "sm" ? "md" : "lg"}>
                {label}
              </Text>
            </Box>
          </Label>
        )}
      </Box>
      {errorMessage && (
        <Box marginTop={2}>
          <Text color="red" size="sm">
            <FormErrorMessage id={id} text={errorMessage} />
          </Text>
        </Box>
      )}
    </Box>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string.isRequired,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["sm", "md"]),
};
