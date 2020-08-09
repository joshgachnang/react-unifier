import * as React from "react";
import {Box} from "./Box";
import {IconButton} from "./IconButton";
import {Text} from "./Text";
import {BannerProps, ButtonColor} from "./UnifiedCommon";
import {Unifier} from "./Unifier";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
library.add(faTimesCircle);

interface BannerState {
  show: boolean;
}

function getKey(id: string) {
  return `@Pattern:${id}`;
}
export const hideBanner = (id: string) => {
  Unifier.storage.setItem(getKey(id), "true");
};

export class Banner extends React.Component<BannerProps, BannerState> {
  state = {show: false};

  async componentDidMount() {
    const seen = await Unifier.storage.getItem(getKey(this.props.id));
    this.setState({show: !seen});
  }

  dismiss = () => {
    hideBanner(this.props.id);
    this.setState({show: false});
  };

  render() {
    if (!this.state.show) {
      return null;
    }
    const negativeMargin = (this.props.negativeXMargin || 0) * -4;
    return (
      <Box
        onClick={this.dismiss}
        paddingY={2}
        marginTop={3}
        marginBottom={3}
        color={this.props.color || "secondaryDark"}
        direction="row"
        display="flex"
        shape={this.props.shape}
        dangerouslySetInlineStyle={{
          __style: {marginLeft: negativeMargin, marginRight: negativeMargin},
        }}
        width="100%"
      >
        <Box
          marginLeft={3}
          flex="grow"
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box paddingY={1}>
            <Text align="center" color={this.props.textColor || "white"} weight="bold">
              {this.props.text}
            </Text>
          </Box>
          {this.props.subtext && (
            <Box paddingY={1}>
              <Text align="center" color={this.props.textColor || "white"}>
                {this.props.subtext}
              </Text>
            </Box>
          )}
        </Box>
        <Box alignItems="center" justifyContent="center">
          <IconButton
            prefix="fas"
            icon="times-circle"
            size="lg"
            onClick={() => this.dismiss()}
            accessibilityLabel=""
            iconColor={(this.props.textColor || "white") as ButtonColor}
          />
        </Box>
      </Box>
    );
  }
}
