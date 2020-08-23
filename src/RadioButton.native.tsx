import * as React from "react";
import { Box } from "react-unifier";
import { Text } from "react-unifier";
import { RadioButtonProps, RadioButtonWithLabelProps } from "react-unifier";


export class RadioButton extends React.Component<RadioButtonProps> {
  render() {
    return (
      <Box
        shape="pill"
        border={this.props.color}
        height={this.props.size === "sm" ? 20 : 35}
        width={this.props.size === "sm" ? 20 : 35}
        color={this.props.checked ? "darkGray" : "white"}
        onClick={() => {
          this.props.onChange({ value: !this.props.checked });
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          {this.props.checked && (
            <Box
              border="white"
              shape="pill"
              height={this.props.size === "sm" ? 16 : 30}
              width={this.props.size === "sm" ? 16 : 30}
              color={this.props.checked ? this.props.color || "darkGray" : "white"}
            />
          )}
        </Box>
      </Box>
    );
  }
}

export class RadioButtonWithLabel extends React.Component<RadioButtonWithLabelProps, {}> {
  render() {
    return (
      <Box paddingY={1} display="flex" direction="row">
        <Box display="flex" justifyContent="center" width={30} maxWidth={30}>
          <RadioButton
            id=""
            size="sm"
            checked={this.props.checked}
            onChange={this.props.onChange}
            color={this.props.color}
          />
        </Box>
        <Box
          onClick={() => {
            this.props.onChange({ value: !this.props.checked });
          }}
          marginLeft={4}
          height="100%"
          display="flex"
          direction="column"
          justifyContent="center"
        >
          <Text color={this.props.labelColor || "darkGray"} weight="bold">
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
