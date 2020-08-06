import * as React from "react";
import {Box} from "./Box";
import {Text} from "./Text";
import {Icon} from "./Icon";
// import {AvoIconName} from "./AvoIcon";

interface IconRowProps {
  // icon: AvoIconName;
  icon: string;
  label: string;
  value: string;
}

export class IconRow extends React.Component<IconRowProps, {}> {
  render() {
    return (
      <Box display="flex" direction="row" paddingY={2}>
        <Box flex="shrink" display="flex" direction="row">
          <Box
            marginRight={1}
            width={30}
            maxWidth={30}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {/* <AvoIcon
              icon={this.props.icon}
              color="darkGray"
              size={16}
              accessibilityLabel="prepTime"
            /> */}
            <Icon prefix="fas" name={this.props.icon} size={18} />
          </Box>
          <Box paddingX={2} flex="shrink" marginLeft={1} display="flex" justifyContent="center">
            <Text bold={true}>{this.props.label}</Text>
          </Box>
        </Box>
        <Box display="flex" flex="grow" justifyContent="center">
          <Text>{this.props.value}</Text>
        </Box>
      </Box>
    );
  }
}
