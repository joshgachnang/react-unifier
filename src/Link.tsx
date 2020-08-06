import * as React from "react";
import {Box} from "./Box";
import {Text} from "./Text";
import {TextProps} from "./UnifiedCommon";
import {Unifier} from "./Unifier";

interface Props extends TextProps {
  url: string;
}

export class Link extends React.Component<Props, {}> {
  render() {
    return (
      <Box
        onClick={() =>
          Unifier.utils
            .openUrl(this.props.url)
            .catch((err: any) => console.error("An error occurred", err))
        }
      >
        <Text
          bold={this.props.bold !== undefined ? this.props.bold : true}
          color={this.props.color || "blue"}
          skipLinking={true}
        >
          {this.props.children}
        </Text>
      </Box>
    );
  }
}
