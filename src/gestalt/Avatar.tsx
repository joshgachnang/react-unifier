/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "./Box";
import Icon from "./Icon";
import Image from "./Image";
import Mask from "./Mask";
const typography = require("./Typography.module.css");

const Square = (props: any) => (
  <Box {...props} position="relative">
    <Box dangerouslySetInlineStyle={{__style: {paddingBottom: "100%"}}} position="relative" />
    <Box position="absolute" top left bottom right>
      {props.children}
    </Box>
  </Box>
);

const DefaultAvatar = ({name}: {name: string}) => {
  const firstInitial = name ? [...name][0].toUpperCase() : "";
  return (
    <Square color="gray" rounding="circle">
      {firstInitial && (
        <svg
          width="100%"
          viewBox="-50 -50 100 100"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{name}</title>
          <text
            fontSize="50px"
            fill="#fff"
            dy="0.35em"
            textAnchor="middle"
            className={[
              typography.antialiased,
              typography.sansSerif,
              typography.fontWeightBold,
            ].join(" ")}
          >
            {firstInitial}
          </text>
        </svg>
      )}
    </Square>
  );
};

interface Props {
  name: string;
  outline?: boolean;
  size?: "sm" | "md" | "lg";
  src?: string;
  verified?: boolean;
  icon?: "check-circle" | "pinterest";
}

const sizes = {
  sm: 24,
  md: 40,
  lg: 72,
};

export default function Avatar(props: Props) {
  const [isImageLoaded, setIsImageLoaded] = React.useState(true);
  const {name, outline, size, src, verified, icon = "check-circle"} = props;
  const width = size ? sizes[size] : "100%";
  const height = size ? sizes[size] : "";

  const handleImageError = () => setIsImageLoaded(false);

  return (
    <Box
      color="white"
      {...(outline
        ? {
            dangerouslySetInlineStyle: {
              __style: {
                boxShadow: "0 0 0 2px #fff",
              },
            },
          }
        : {})}
      width={width}
      height={height}
      position="relative"
      rounding="circle"
    >
      {src && isImageLoaded ? (
        <Mask rounding="circle" wash>
          <Image
            alt={name}
            color="#EFEFEF"
            naturalHeight={1}
            naturalWidth={1}
            src={src}
            onError={handleImageError}
          />
        </Mask>
      ) : (
        <DefaultAvatar name={name} />
      )}
      {verified && (
        <Box
          position="absolute"
          width="20%"
          height="20%"
          minWidth={8}
          minHeight={8}
          dangerouslySetInlineStyle={{
            __style: {
              bottom: "4%",
              right: "4%",
            },
          }}
        >
          <Box
            color="white"
            width="100%"
            height="100%"
            rounding="circle"
            dangerouslySetInlineStyle={{
              __style: {
                boxShadow: "0 0 0 2px #fff",
              },
            }}
          >
            <Icon color="red" icon={icon} accessibilityLabel="" size="100%" />
          </Box>
        </Box>
      )}
    </Box>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  outline: PropTypes.bool,
  src: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  verified: PropTypes.bool,
};