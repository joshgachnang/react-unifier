import React from "react";
import {Box} from "./Box";
import {Checkbox, CheckBoxWithLabel} from "./Checkbox";

export default {
  title: "Checkbox",
  component: Checkbox,
};

interface State {
  boolean: boolean;
  withLabel: boolean;
  small: boolean;
}

class Forms extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      boolean: false,
      withLabel: false,
      small: false,
    };
  }

  render() {
    return (
      <Box width="100%" height="100%" display="flex" direction="column">
        <Checkbox
          id="check"
          checked={this.state.boolean}
          onChange={(result) => this.setState({boolean: result.value})}
        />
        <CheckBoxWithLabel
          id="withLabel"
          checked={this.state.withLabel}
          label="With A Label"
          onChange={(result) => this.setState({withLabel: result.value})}
        />
        <CheckBoxWithLabel
          id="withLabel"
          checked={this.state.small}
          label="Small"
          size="sm"
          onChange={(result) => this.setState({small: result.value})}
        />
      </Box>
    );
  }
}

export const PlainCheckbox = () => <Forms />;
