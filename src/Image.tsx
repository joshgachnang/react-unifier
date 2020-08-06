import * as React from "react";
import {ImageProps} from "./UnifiedCommon";
import {Image as GestaltImage} from "./gestalt";
import {Box} from "./Box";
import {Unifier} from "./Unifier";
// import LazyLoad from "react-lazyload";

export class Image extends React.Component<ImageProps, {}> {
  width = () => {
    if (this.props.naturalWidth) {
      return this.props.naturalWidth;
    } else if (this.props.fullWidth) {
      return Unifier.utils.dimensions().width;
    }
    throw new Error("Width required for Image");
  };

  height = () => {
    if (this.props.naturalWidth) {
      return this.props.naturalWidth;
    }
    return this.width() * (9 / 16);
  };

  render() {
    return (
      <Box
        width={this.width()}
        maxWidth={this.width()}
        height={this.height()}
        maxHeight={this.height()}
      >
        {/* <LazyLoad height={this.height()} offset={100} once={true}> */}
        <GestaltImage
          color="lightGray"
          {...this.props}
          alt={this.props.alt || ""}
          naturalHeight={this.height()}
          naturalWidth={this.width()}
          // loading="lazy"
        />
        {/* </LazyLoad> */}
      </Box>
    );
  }
}
