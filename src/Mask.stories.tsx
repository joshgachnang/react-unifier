import React from "react";
import {Box} from "./Box";
import {Mask} from "./Mask";
import {Text} from "./Text";

export default {
  title: "Mask",
  component: Mask,
};

export const RoundedMask = () => (
  <Box display="flex" direction="row" justifyContent="between">
    <Box width="100%" padding={6} color="primary">
      <Mask shape="rounded">
        <Box
          width={50}
          height={50}
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="darkGray">MA</Text>
        </Box>
      </Mask>
    </Box>
  </Box>
);

export const CircleMask = () => (
  <Box display="flex" direction="row" justifyContent="between">
    <Box width="100%" padding={6} color="primary">
      <Mask shape="circle">
        <Box
          width={50}
          height={50}
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="darkGray">MA</Text>
        </Box>
      </Mask>
    </Box>
  </Box>
);

export const RoundingMask = () => (
  <Box display="flex" direction="row" justifyContent="between">
    <Box width="100%" padding={6} color="primary">
      <Mask rounding={1}>
        <Box
          width={50}
          height={50}
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="darkGray">MA</Text>
        </Box>
      </Mask>
    </Box>
  </Box>
);

export const WashedMask = () => (
  <Box display="flex" direction="row" justifyContent="between">
    <Box width="100%" padding={6} color="primary">
      <Mask rounding={1} wash={true}>
        <Box
          width={50}
          height={50}
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="darkGray">MA</Text>
        </Box>
      </Mask>
    </Box>
  </Box>
);
