import React from "react";
import {Spinner} from "./Spinner";
import {Box} from "./Box";

export default {
  title: "Spinner",
  component: Spinner,
};

export const SmallSpinner = () => (
  <Box width="100%">
    <Spinner size="sm" />
  </Box>
);

export const BigSpinner = () => (
  <Box display="flex">
    <Spinner size="md" />
  </Box>
);

export const DarkSpinner = () => (
  <Box color="darkGray" paddingY={6}>
    <Spinner color="white" />
  </Box>
);
