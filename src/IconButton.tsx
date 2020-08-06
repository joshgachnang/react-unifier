import * as React from "react";
import {IconButtonProps, iconSizeToNumber} from "./UnifiedCommon";
import {Icon} from "./Icon";
import {Unifier} from "./Unifier";

export class IconButton extends React.Component<IconButtonProps, {}> {
  render() {
    let opacity = 1;
    let color;
    if (this.props.bgColor === "transparentDarkGray") {
      opacity = 0.8;
      color = Unifier.theme["darkGray"];
    } else if (!this.props.bgColor || this.props.bgColor === "transparent") {
      color = "transparent";
    } else {
      color = Unifier.theme[this.props.bgColor];
    }
    return (
      <div
        onClick={(event) => {
          event.stopPropagation();
          Unifier.utils.haptic();
          this.props.onClick();
        }}
        style={{
          backgroundColor: color,
          opacity: opacity,
          borderRadius: 100,
          // TODO: not perfectly round here.
          paddingBottom: iconSizeToNumber(this.props.size) / 3,
          paddingTop: iconSizeToNumber(this.props.size) / 3,
          paddingLeft: iconSizeToNumber(this.props.size) / 3,
          paddingRight: iconSizeToNumber(this.props.size) / 3,
          width: iconSizeToNumber(this.props.size) * 1.5,
          height: iconSizeToNumber(this.props.size) * 1.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        // hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
      >
        {/* <div
          style={{
            opacity: 1,
            // width: iconSizeToNumber(this.props.size),
            // height: iconSizeToNumber(this.props.size),
          }}
        > */}
        <Icon
          prefix={this.props.prefix || "fas"}
          size={iconSizeToNumber(this.props.size)}
          name={this.props.icon}
          color={this.props.iconColor}
        />
        {/* </div> */}
      </div>
    );
  }
}
