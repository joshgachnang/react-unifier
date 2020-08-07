import * as React from "react";
import {AsyncStorage} from "react-native";
import {Box} from "./Box";
import {IconButton} from "./IconButton";
import {Text} from "./Text";
import {BannerProps, ButtonColor} from "./UnifiedCommon";

interface BannerState {
  show: boolean;
}

function getKey(id: string) {
  return `@Pattern:${id}`;
}
export const hideBanner = (id: string) => {
  AsyncStorage.setItem(getKey(id), "true");
};

export class Banner extends React.Component<BannerProps, BannerState> {
  state = {show: false};

  async componentDidMount() {
    const seen = await AsyncStorage.getItem(getKey(this.props.id));
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
        dangerouslySetInlineStyle={{
          __style: {marginLeft: negativeMargin, marginRight: negativeMargin},
        }}
      >
        <Box marginLeft={3} flex="grow" display="flex" justifyContent="center" alignItems="center">
          <Text align="center" color={this.props.textColor || "white"} weight="bold">
            {this.props.text}
          </Text>
          {this.props.subtext && (
            <Text align="center" color={this.props.textColor || "white"}>
              {this.props.subtext}
            </Text>
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
