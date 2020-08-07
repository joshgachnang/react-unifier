import * as React from "react";
import {Box} from "./Box";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {CheckboxProps, CheckBoxWithLabelProps} from "./UnifiedCommon";

export class Checkbox extends React.Component<CheckboxProps> {
  render() {
    return (
      <Box
        shape="rounded"
        border={this.props.color || "darkGray"}
        height={this.props.size === "sm" ? 20 : 35}
        width={this.props.size === "sm" ? 20 : 35}
        color={this.props.checked ? this.props.color || "darkGray" : "white"}
        onClick={() => {
          this.props.onChange({value: !this.props.checked});
          this.props.onClick && this.props.onClick();
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          {this.props.checked && (
            <Icon
              prefix="far"
              size={this.props.size === "sm" ? 15 : 25}
              name="check"
              color="white"
            />
          )}
        </Box>
      </Box>
    );
  }
}

export class CheckBoxWithLabel extends React.Component<CheckBoxWithLabelProps, {}> {
  render() {
    return (
      <Box paddingY={1} display="flex" direction="row" width="100%">
        <Checkbox
          id=""
          checked={this.props.checked}
          onChange={this.props.onChange}
          color={this.props.color}
          onClick={this.props.onClick}
          size={this.props.size}
          indeterminate={this.props.indeterminate}
          hasError={this.props.hasError}
          disabled={this.props.disabled}
        />
        <Box
          onClick={() => {
            this.props.onChange({value: !this.props.checked});
            this.props.onClick && this.props.onClick();
          }}
          marginLeft={4}
          height="100%"
          display="flex"
          direction="column"
          justifyContent="center"
        >
          <Text
            numberOfLines={this.props.subLabel ? 1 : 2}
            color={this.props.labelColor || "darkGray"}
            weight="bold"
          >
            {this.props.label}
          </Text>
          {Boolean(this.props.subLabel) && (
            <Text size="sm" color={this.props.labelColor || "darkGray"} weight="bold">
              {this.props.subLabel}
            </Text>
          )}
        </Box>
      </Box>
    );
  }
}
