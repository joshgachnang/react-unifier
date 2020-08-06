import * as React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
const formElement = require("./FormElement.module.css");
import FormErrorMessage from "./FormErrorMessage";
import FormHelperText from "./FormHelperText";
import FormLabel from "./FormLabel";
const layout = require("./Layout.module.css");
const styles = require("./TextField.module.css");

interface Props {
  autoComplete?: "current-password" | "new-password" | "on" | "off" | "username";
  disabled?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  id: string;
  label?: string;
  name?: string;
  onBlur?: (arg0: {event: React.FocusEvent<HTMLInputElement>; value: string}) => void;
  onChange: (arg0: {event: React.SyntheticEvent<HTMLInputElement>; value: string}) => void;
  onFocus?: (arg0: {event: React.FocusEvent<HTMLInputElement>; value: string}) => void;
  onKeyDown?: (arg0: {event: React.KeyboardEvent<HTMLInputElement>; value: string}) => void;
  placeholder?: string;
  type?: "date" | "email" | "number" | "password" | "text" | "url";
  size?: "md" | "lg";
  value?: string;
  labelColor?: any;
}

interface State {
  focused: boolean;
}

export default class TextField extends React.Component<Props, State> {
  // that reach into this component and use this instance variable
  textfield: HTMLInputElement | null | undefined;

  static propTypes = {
    autoComplete: PropTypes.oneOf(["current-password", "new-password", "on", "off", "username"]),
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    hasError: PropTypes.bool,
    helperText: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(["md", "lg"]),
    type: PropTypes.oneOf(["date", "email", "number", "password", "text", "url"]),
    value: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    hasError: false,
    size: "md",
    type: "text",
  };

  state = {
    focused: false,
  };

  setTextFieldRef = (ref: HTMLInputElement | null | undefined) => {
    this.textfield = ref;
  };

  handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {onChange} = this.props;
    onChange({event, value: event.currentTarget.value});
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const {onBlur} = this.props;
    if (onBlur) {
      onBlur({event, value: event.currentTarget.value});
    }
  };

  handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const {onFocus} = this.props;
    if (onFocus) {
      onFocus({event, value: event.currentTarget.value});
    }
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {onKeyDown} = this.props;
    if (onKeyDown) {
      onKeyDown({event, value: event.currentTarget.value});
    }
  };

  render() {
    const {
      autoComplete,
      disabled,
      errorMessage,
      hasError,
      helperText,
      id,
      label,
      name,
      placeholder,
      size,
      type,
      value,
      labelColor,
    } = this.props;

    const {focused} = this.state;

    const classes = classnames(
      styles.textField,
      formElement.base,
      disabled ? formElement.disabled : formElement.enabled,
      hasError || errorMessage ? formElement.errored : formElement.normal,
      size === "md" ? layout.medium : layout.large
    );

    // type='number' doesn't work on ios safari without a pattern
    // https://stackoverflow.com/questions/14447668/input-type-number-is-not-showing-a-number-keypad-on-ios
    const pattern = type === "number" ? "\\d*" : undefined;

    return (
      <span>
        {label && <FormLabel id={id} label={label} color={labelColor} />}
        <input
          aria-describedby={errorMessage && focused ? `${id}-error` : undefined}
          aria-invalid={errorMessage || hasError ? "true" : "false"}
          autoComplete={autoComplete}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          pattern={pattern}
          placeholder={placeholder}
          ref={this.setTextFieldRef}
          type={type}
          value={value}
        />
        {helperText && !errorMessage ? <FormHelperText text={helperText} /> : null}
        {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
      </span>
    );
  }
}
