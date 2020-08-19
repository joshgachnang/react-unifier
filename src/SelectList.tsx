/* eslint-disable @typescript-eslint/no-var-requires */
import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import * as React from "react";
import {Box} from "./Box";
import {Icon} from "./Icon";
import {SelectListProps} from "./UnifiedCommon";
import {FieldWithLabels} from "./FieldWithLabels";

const formElement = require("./gestalt/FormElement.module.css");
const layout = require("./gestalt/Layout.module.css");
const styles = require("./gestalt/SelectList.module.css");

library.add(faArrowDown);

interface State {
  focused: boolean;
}

export class SelectList extends React.Component<SelectListProps, State> {
  select: HTMLSelectElement | null | undefined;

  static defaultProps = {
    disabled: false,
    size: "md",
    options: [],
    id: "select",
  };

  state = {
    focused: false,
  };

  setSelectListRef = (ref: HTMLSelectElement | null | undefined) => {
    this.select = ref;
  };

  handleOnChange = (event: React.SyntheticEvent) => {
    const {onChange, value} = this.props;
    if (event.target instanceof HTMLSelectElement && value !== event.target.value) {
      onChange(event.target.value);
    }
  };

  render() {
    const {
      disabled,
      id,
      name,
      options,
      value,
      size,
      placeholder,
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
      styles.select,
      formElement.base,
      disabled ? formElement.disabled : formElement.enabled,
      errorMessage ? formElement.errored : formElement.normal,
      size === "md" ? layout.medium : layout.large
    );

    return (
      <Box>
        <FieldWithLabels
          {...{errorMessage, errorMessageColor, helperText, helperTextColor, label, labelColor}}
        >
          <Box
            color={disabled ? "lightGray" : "white"}
            display="flex"
            position="relative"
            rounding={4}
            width="100%"
          >
            <Box
              alignItems="center"
              bottom
              dangerouslySetInlineStyle={{
                __style: {paddingRight: 14, paddingTop: 2},
              }}
              display="flex"
              position="absolute"
              right
              top
            >
              <Icon
                prefix="fas"
                name="arrow-down"
                size={12}
                color={disabled ? "gray" : "darkGray"}
              />
            </Box>
            <select
              aria-describedby={errorMessage && focused ? `${id}-error` : undefined}
              aria-invalid={errorMessage ? "true" : "false"}
              className={classes}
              disabled={disabled}
              id={id}
              name={name}
              onBlur={this.handleOnChange}
              onChange={this.handleOnChange}
              ref={this.setSelectListRef}
              value={value}
            >
              {placeholder && !value && (
                <option selected disabled value={value} hidden>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Box>
        </FieldWithLabels>
      </Box>
    );
  }
}
