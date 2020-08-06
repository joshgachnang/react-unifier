import * as React from "react";
import {Box} from "./Box";
import {Text} from "./Text";
import {SegmentedControlProps} from "./UnifiedCommon";

export class SegmentedControl extends React.Component<SegmentedControlProps, {}> {
  renderItem(item: string | React.ReactNode) {
    return <Text bold={true}>{item}</Text>;
    // if (typeof item === "string") {
    //   return <Text bold={true}>{item}</Text>;
    // } else {
    //   return item;
    // }
  }
  render() {
    return (
      <Box
        shape="rounded"
        width="100%"
        height={40}
        display="flex"
        direction="row"
        color="lightGray"
        padding={1}
      >
        {this.props.items.map((item, index) => (
          <Box
            key={index}
            shape="rounded"
            height="100%"
            width={`${100 / this.props.items.length}%`}
            color={this.props.selectedItemIndex === index ? "white" : "lightGray"}
          >
            <Box
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => this.props.onChange({value: String(index)})}
            >
              {this.renderItem(item)}
            </Box>
          </Box>
        ))}
      </Box>
    );
  }
}
