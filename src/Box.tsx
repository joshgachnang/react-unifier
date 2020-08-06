import * as React from "react";
import {Box as GestaltBox} from "./gestalt";
import {BoxProps} from "./UnifiedCommon";
import {mergeInlineStyles} from "./Utilities";
import {Unifier} from "./Unifier";

export class Box extends React.Component<BoxProps, {}> {
  isBottom(el: any) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    const {onClick, shadow, avoidKeyboard, ...props} = this.props;
    if (props.scroll) {
      props.overflow = "scrollY";
    }
    let rounding: "pill" | "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined = undefined;
    if (this.props.shape === "pill") {
      rounding = "pill";
    } else if (this.props.shape === "circle") {
      rounding = "circle";
    } else if (this.props.shape === "rounded") {
      rounding = 3;
    }

    let body = (
      <GestaltBox
        {...props}
        onClick={() => {
          // Unifier.utils.haptic();
          onClick && onClick();
        }}
        color={this.props.color}
        rounding={rounding}
        dangerouslySetInlineStyle={mergeInlineStyles(this.props.dangerouslySetInlineStyle, {
          cursor: this.props.onClick ? "pointer" : undefined,
          boxShadow: shadow ? "0px 3px 8px rgba(0, 0, 0, 0.5)" : undefined,
          borderWidth: this.props.border ? 2 : undefined,
          borderColor: this.props.border ? Unifier.theme[this.props.border] : undefined,
          borderStyle: this.props.border ? "solid" : undefined,
          borderRadius:
            this.props.border && typeof rounding === "number" ? rounding * 4 : undefined,
        })}
      >
        {this.props.children}
      </GestaltBox>
    );

    return body;
  }
}
