import React from "react";
import {Box} from "./Box";
import {Color, ThemeColor, AllColors} from "./UnifiedCommon";

export default {
  title: "Box",
  component: Box,
};

// This demonstartes how easy it is do a variety of layouts just with Box.
export const FlexBox = () => (
  <Box display="flex" direction="row" alignItems="center">
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={50}
      height={50}
      rounding="circle"
      color="blue"
      marginRight={2}
    >
      <h2>JG</h2>
    </Box>
    <Box paddingX={2} direction="column">
      <div>
        <b>Josh Gachnang</b>
      </div>
      <div>joined 2 years ago</div>
    </Box>
  </Box>
);

const colors: AllColors[] = [
  "primary",
  "secondary",
  "tertiary",
  "accent",
  "blue",
  "darkGray",
  "eggplant",
  "gray",
  "green",
  "lightGray",
  "maroon",
  "midnight",
  "navy",
  "olive",
  "orange",
  "orchid",
  "pine",
  "purple",
  "red",
  "watermelon",
  "white",
  "neutral900",
  "neutral200",
  "neutral70",
  "neutral10",
];

export const BoxColors = () => (
  <Box display="flex" direction="row" justifyContent="between">
    {colors.map((c) => (
      <Box key={c} display="flex" direction="column">
        <Box marginBottom={2}>
          <p style={{textAlign: "center"}}>{c}</p>
        </Box>
        <Box key={c} color={c} rounding="circle" height={50} width={50}>
          &nbsp;
        </Box>
      </Box>
    ))}
  </Box>
);
