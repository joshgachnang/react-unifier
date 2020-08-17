import React from "react";
import {Box} from "./Box";
import {Mask} from "./Mask";
import {Color, ThemeColor, AllColors} from "./UnifiedCommon";

export default {
  title: "Mask",
  component: Mask,
};

export const BoxColors = () => (
  <Box display="flex" direction="row" justifyContent="between">
    <Mask></Mask>
  </Box>
);
