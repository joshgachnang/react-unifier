import * as React from "react";
import {ImageProps} from "./Common";
import {Box} from "./Box";
import {Unifier} from "./Unifier";
import styles from "./Image.module.css";

const shouldScaleImage = (fit: any) => fit === "cover" || fit === "contain";

export class Image extends React.PureComponent<ImageProps> {
  static defaultProps = {
    color: "transparent",
    fit: "none",
    importance: "auto",
    loading: "auto",
  };

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

  componentDidMount() {
    if (shouldScaleImage(this.props.fit)) {
      this.loadImage();
    }
  }

  componentDidUpdate(prevProps: ImageProps) {
    const {fit, src} = this.props;
    if (shouldScaleImage(fit) && prevProps.src !== src) {
      this.loadImage();
    }
  }

  handleLoad = () => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  handleError = () => {
    if (this.props.onError) {
      this.props.onError();
    }
  };

  loadImage() {
    if (typeof window !== "undefined") {
      const image = new window.Image();
      image.onload = this.handleLoad;
      image.onerror = this.handleError;
      image.src = this.props.src;
    }
  }

  render() {
    const {alt, color, children, fit, naturalHeight, naturalWidth, src, srcSet} = this.props;

    const isScaledImage = shouldScaleImage(fit);
    const childContent = children ? (
      <Box position="absolute" top left bottom right overflow="hidden">
        {children}
      </Box>
    ) : null;

    return isScaledImage ? (
      <div
        aria-label={alt}
        className={fit === "contain" || fit === "cover" ? styles[fit] : undefined}
        style={{
          backgroundColor: color,
          backgroundImage: `url('${src}')`,
        }}
        role="img"
      >
        {childContent}
      </div>
    ) : (
      <Box
        position="relative"
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: color,
            paddingBottom:
              naturalHeight && naturalWidth
                ? `${(naturalHeight / naturalWidth) * 100}%`
                : undefined,
          },
        }}
      >
        <img
          alt={alt}
          className={styles.img}
          // Disabling for now while we work out a way for this to work in RN.
          // importance={importance}
          // loading={loading === "auto" ? undefined : loading}
          // sizes={sizes}
          onError={this.handleError}
          onLoad={this.handleLoad}
          src={src}
          srcSet={srcSet}
        />
        {childContent}
      </Box>
    );
  }
}
