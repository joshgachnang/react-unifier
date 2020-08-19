import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import debounce from "lodash/debounce";
import * as React from "react";
import {Box} from "./Box";
import {Icon} from "./Icon";
import {Text} from "./Text";
import {ButtonProps, Color, iconSizeToNumber, AllColors, TextColor} from "./Common";
import {Unifier} from "./Unifier";

interface ButtonState {
  loading: boolean;
}

const buttonTextColor: {[buttonColor: string]: "white" | "darkGray"} = {
  blue: "white",
  lightGray: "darkGray",
  red: "white",
  transparent: "white",
  white: "darkGray",
  primary: "white",
  secondary: "white",
  accent: "white",
  tertiary: "white",
  facebook: "white",
  twitter: "white",
  google: "white",
};

/**
 * Buttons in React Unifier are normal buttons with a nicer UX than a typical button.
 *
 * They come in 3 different types (solid, ghost, text) and can use your theme's colors.
 *
 * The UX is nicer than a typical React or React Native button. When onClick is an asynchronous
 * callback, you can have the button in a loading and disabled state until the callback finishes.
 * Double clicks are filtered by default. They respond haptically where possible when tapped.
 */
export class Button extends React.Component<ButtonProps, ButtonState> {
  state = {loading: false};
  HEIGHTS = {
    sm: 36,
    md: 40,
    lg: 48,
  };

  getBackgroundColor(color: AllColors | "transparent"): string {
    if (this.props.type === "ghost" || this.props.type === "outline" || color === "transparent") {
      return "transparent";
    } else {
      return Unifier.theme[color] as AllColors;
    }
  }

  getTextColor(color: AllColors): AllColors {
    if (this.props.disabled) {
      return "gray";
    } else if (this.props.type === "ghost" || this.props.type === "outline") {
      return color;
    } else {
      return buttonTextColor[color] || "white";
    }
  }

  getBorderColor(color: AllColors): string {
    if (this.props.type === "outline") {
      return Unifier.theme[this.getTextColor(color)] as AllColors;
    } else {
      return "transparent";
    }
  }

  renderContent() {
    let color = this.props.color || "lightGray";
    if (color === "gray") {
      color = "lightGray";
    }

    if (this.props.children) {
      if (this.props.icon || this.props.text) {
        console.warn("Buttons with children and icons or text are not supported.");
      }
      return this.props.children;
    }

    return (
      <Box paddingX={4} display="flex" direction="row">
        {this.props.icon !== undefined && (
          <Box paddingX={2}>
            <Icon
              prefix={this.props.iconPrefix || "far"}
              size={iconSizeToNumber(this.props.size)}
              name={this.props.icon}
              color={this.getTextColor(this.props.color as Color)}
            />
          </Box>
        )}
        {Boolean(this.props.text) && (
          <Text
            weight="bold"
            // TODO: this shouldn't be a text color.
            color={this.getTextColor(color) as TextColor}
            size={this.props.size}
            skipLinking={true}
          >
            {this.props.text}
          </Text>
        )}
        {(this.state.loading || this.props.loading) && (
          <Box marginLeft={2}>
            <FontAwesomeIcon
              icon={["fas", "spinner"]}
              spin={true}
              color={Unifier.theme[this.getTextColor(this.props.color as Color)] || "#666"}
              size="1x"
            />
          </Box>
        )}
      </Box>
    );
  }

  render() {
    let color = this.props.color || "lightGray";
    if (color === "gray") {
      color = "lightGray";
    }

    let height = this.HEIGHTS[this.props.size || "md"];
    // Adjust height for border if we're doing borders (ugh div box model is hard)
    if (this.props.type === "outline") {
      height = height - 4;
    }

    return (
      <Box width={this.props.inline === true ? undefined : "100%"}>
        <div
          style={{
            height: height,
            backgroundColor: this.getBackgroundColor(color),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            borderColor: this.getBorderColor(color),
            borderWidth: this.props.type === "outline" ? 2 : 0,
            borderStyle: this.props.type === "outline" ? "solid" : undefined,
            opacity: this.props.disabled ? 0.7 : 1,
            flexDirection: "row",
            display: "flex",
            cursor: "pointer",
          }}
          // disabled={this.props.disabled || this.props.loading}
          onClick={debounce(
            async () => {
              if (this.props.disabled || this.props.loading) {
                return;
              }
              Unifier.utils.haptic();
              this.setState({loading: true});
              try {
                if (this.props.onClick) {
                  await this.props.onClick();
                }
              } catch (e) {
                this.setState({loading: false});
                throw e;
              }
              this.setState({loading: false});
            },
            500,
            {leading: true}
          )}
        >
          {this.renderContent()}
        </div>
      </Box>
    );
  }
}
