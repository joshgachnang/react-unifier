import * as React from "react";
import {SpinnerProps} from "./Common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Unifier} from "./Unifier";

export class LoadingOverlay extends React.Component<SpinnerProps, {}> {
  render() {
    return null;
  }
}

export class Spinner extends React.Component<SpinnerProps, {}> {
  render() {
    const size = this.props.size === "sm" ? "1x" : "2x";
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Unifier.theme["white"],
          opacity: 0.5,
        }}
      >
        <FontAwesomeIcon
          icon={["fas", "spinner"]}
          spin={true}
          color={this.props.color || "#666"}
          size={size}
          style={{justifySelf: "center", alignSelf: "center"}}
        />
      </div>
    );
  }
}
