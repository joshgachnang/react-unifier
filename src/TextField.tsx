import classnames from "classnames";
// export class TextField extends React.Component<TextFieldProps, {}> {
//   render() {
//     let type = this.props.type;
//     if (type === "decimal") {
//       type = "number";
//     } else if (type === "username") {
//       type = "text";
//     } else if (type === "search") {
//       type = "text";
//     }
//     return (
//       <Box width="100%">
//         <GestaltTextField
//           id={this.props.id || this.props.name || "unknown"}
//           type={type as any}
//           {...this.props}
//         />
//       </Box>
//     );
//   }
// }
import * as React from "react";
import {TextFieldProps} from "./Common";
import {FieldWithLabels} from "./FieldWithLabels";
import formElement from "./FormElement.module.css";
import layout from "./Layout.module.css";
import styles from "./TextField.module.css";

interface State {
  focused: boolean;
}

export class TextField extends React.Component<TextFieldProps, State> {
  // that reach into this component and use this instance variable
  textfield: HTMLInputElement | null | undefined;

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
    // const {onKeyDown} = this.props;
    // if (onKeyDown) {
    //   onKeyDown({event, value: event.currentTarget.value});
    // }
  };

  render() {
    const {
      autoComplete,
      disabled,
      id,
      name,
      placeholder,
      value,
      // FieldWithLabels
      errorMessage,
      errorMessageColor,
      helperText,
      helperTextColor,
      label,
      labelColor,
    } = this.props;

    let type = this.props.type;
    if (type === "decimal") {
      type = "number";
    } else if (type === "username") {
      type = "text";
    } else if (type === "search") {
      type = "text";
    }

    const {focused} = this.state;

    const classes = classnames(
      styles.textField,
      formElement.base,
      disabled ? formElement.disabled : formElement.enabled,
      errorMessage ? formElement.errored : formElement.normal,
      layout.medium
    );

    // type='number' doesn't work on ios safari without a pattern
    // https://stackoverflow.com/questions/14447668/input-type-number-is-not-showing-a-number-keypad-on-ios
    const pattern = type === "number" ? "\\d*" : undefined;

    return (
      <span>
        <FieldWithLabels
          {...{errorMessage, errorMessageColor, helperText, helperTextColor, label, labelColor}}
        >
          <input
            aria-describedby={errorMessage && focused ? `${id}-error` : undefined}
            aria-invalid={errorMessage ? "true" : "false"}
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
        </FieldWithLabels>
      </span>
    );
  }
}
