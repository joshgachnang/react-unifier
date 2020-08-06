import * as React from "react";
// import {getOnboardingBackground} from "./Utils";

interface ImageBackgroundProps {
  style?: any;
  source?: any;
}

export class ImageBackground extends React.Component<ImageBackgroundProps, {}> {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#111",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 800,
            height: "100%",
            backgroundImage: "url(/onboarding-background.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: 800,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
