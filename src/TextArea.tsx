/* eslint-disable @typescript-eslint/no-var-requires */
import classnames from "classnames";
import * as React from "react";
import {TextAreaProps} from "./UnifiedCommon";
import {FieldWithLabels} from "./FieldWithLabels";

const formElement = require("./gestalt/FormElement.module.css");
const styles = require("./gestalt/TextArea.module.css");

interface State {
  focused: boolean;
}

export class TextArea extends React.Component<TextAreaProps, State> {
  // that reach into this component and use this instance variable
  textarea: HTMLElement | null | undefined;

  static defaultProps = {
    disabled: false,
    hasError: false,
    rows: 3,
  };

  state = {
    focused: false,
  };

  setTextAreaRef = (ref: HTMLTextAreaElement | null | undefined) => {
    this.textarea = ref;
  };

  handleChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    this.props.onChange(event.currentTarget.value);
  };

  handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const {onBlur} = this.props;
    if (onBlur) {
      onBlur(event.currentTarget.value);
    }
  };

  handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const {onFocus} = this.props;
    if (onFocus) {
      onFocus(event.currentTarget.value);
    }
  };

  // handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   const {onKeyDown} = this.props;
  //   if (onKeyDown) {
  //     onKeyDown({event, value: event.currentTarget.value});
  //   }
  // };

  render() {
    const {
      disabled,
      id,
      name,
      placeholder,
      rows,
      value,
      // FieldWithLabels
      errorMessage,
      errorMessageColor,
      helperText,
      helperTextColor,
      label,
      labelColor,
    } = this.props;

    const {focused} = this.state;

    const classes = classnames(
      styles.textArea,
      formElement.base,
      disabled ? formElement.disabled : formElement.enabled,
      errorMessage ? formElement.errored : formElement.normal
    );

    return (
      <span>
        <FieldWithLabels
          {...{errorMessage, errorMessageColor, helperText, helperTextColor, label, labelColor}}
        >
          <textarea
            aria-describedby={errorMessage && focused ? `${id}-error` : undefined}
            aria-invalid={errorMessage ? "true" : "false"}
            className={classes}
            disabled={disabled}
            id={id}
            name={name}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            // onKeyDown={this.handleKeyDown}
            placeholder={placeholder}
            ref={this.setTextAreaRef}
            rows={rows}
            value={value}
          />
        </FieldWithLabels>
      </span>
    );
  }
}
