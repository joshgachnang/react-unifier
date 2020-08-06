import moment from "moment";
import * as React from "react";
import {OnChangeResult, TextFieldType} from "./UnifiedCommon";
import {Box} from "./Box";
import {SelectList} from "./SelectList";
import {Switch} from "./Switch";
import {TextArea} from "./TextArea";
import {TextField} from "./TextField";
import {WithLabel} from "./WithLabel";
interface Props {
  name: string;
  label?: string;
  initialValue?: any;
  handleChange: any;
  validate?: any;
  help?: string;
  type?:
    | "boolean"
    | "text"
    | "textarea"
    | "number"
    | "currency"
    | "percent"
    | "select"
    | "password"
    | "url"
    | "date";
  rows?: number;
  options?: any;
  placeholder?: string;
  disabled?: boolean;
}

interface State {
  value: any;
}

export class Field extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {value: props.initialValue || ""};
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.initialValue !== this.state.value) {
      this.setState({value: nextProps.initialValue});
    }
  }

  handleChange = (result: OnChangeResult) => {
    let value = result.value;
    if (this.props.type === "currency") {
      value = value.replace("$", "");
    } else if (this.props.type === "percent") {
      value = value.replace("%", "");
    }
    this.setState({value});
    if (this.props.handleChange) {
      this.props.handleChange(this.props.name, value);
    }
  };

  handleSwitchChange = (value: boolean) => {
    this.setState({value});
    if (this.props.handleChange) {
      this.props.handleChange(this.props.name, value);
    }
  };

  renderField() {
    if (this.props.type === "select") {
      return (
        <SelectList
          id={this.props.name}
          options={this.props.options}
          onChange={this.handleChange}
          value={this.state.value}
          disabled={this.props.disabled}
        />
      );
    } else if (this.props.type === "textarea") {
      return (
        <TextArea
          id={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          value={String(this.state.value)}
          disabled={this.props.disabled}
        />
      );
    } else if (this.props.type === "boolean") {
      return (
        <Switch
          id={this.props.name}
          switched={Boolean(this.state.value)}
          disabled={this.props.disabled}
          name={this.props.name}
          onChange={(result) => this.handleSwitchChange(result)}
        />
      );
    } else if (this.props.type === "date") {
      let value = this.state.value.seconds
        ? moment(this.state.value.seconds * 1000)
        : moment(this.state.value);
      console.log("DATE", value, this.state.value, value.format("MM/DD/YYYY HH:mmA"));
      return (
        <TextField
          id={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          value={value.format("MM/DD/YYYY HH:mmA")}
          // TODO: allow editing with a date picker
          disabled={true}
          type="text"
        />
      );
    } else {
      let type: TextFieldType = "text";
      // Number is supported differently because we need fractional numbers and they don't work
      // well on iOS.
      if (this.props.type && ["date", "email", "password", "url"].includes(this.props.type)) {
        type = this.props.type as TextFieldType;
      } else if (this.props.type === "percent" || this.props.type === "currency") {
        type = "text";
      }
      let autoComplete: "on" | "current-password" | "username" = "on";
      if (type === "password") {
        autoComplete = "current-password";
      } else if (type === "email") {
        autoComplete = "username";
      }
      let value = String(this.state.value);
      // if (this.props.type === "percent") {
      //   value = `${Number(this.state.value).toFixed(0)}%`;
      // } else if (this.props.type === "currency") {
      //   value = `$${Number(value).toFixed(2)}`;
      // }
      // console.log("VAL", value);
      return (
        <TextField
          id={this.props.name}
          placeholder={this.props.placeholder}
          autoComplete={autoComplete}
          onChange={this.handleChange}
          value={value}
          disabled={this.props.disabled}
          type={type as "date" | "email" | "number" | "password" | "text" | "url"}
        />
      );
    }
  }

  render() {
    return (
      <Box marginBottom={5}>
        <WithLabel label={this.props.label}>{this.renderField()}</WithLabel>
      </Box>
    );
  }
}
