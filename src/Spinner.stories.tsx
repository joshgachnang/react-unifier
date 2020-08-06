import React from "react";
import {Spinner} from "./Spinner";
import {Box} from "../Box/Box";

export default {
  title: "Spinner",
  component: Spinner,
};

export const NormalSpinner = () => (
  <Box width="100%">
    <Spinner />
  </Box>
);

export const BigSpinner = () => (
  <Box height={400} width={400}>
    <Spinner size="10x" />
  </Box>
);

export const DarkSpinner = () => (
  <Box color="darkGray" paddingY={6}>
    <Spinner color="#fff" />
  </Box>
);
