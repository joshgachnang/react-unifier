import React from "react";
import {Box} from "./Box";
import {AllColors} from "./UnifiedCommon";
import {Pill} from "./Pill";

export default {
  title: "Pill",
  component: Pill,
};

const renderPill = (color: AllColors) => (
  <Box display="flex" direction="row" alignItems="center" paddingY={1}>
    <Box marginRight={2}>
      <Pill text={color} color={color} onClick={() => {}} />
    </Box>
    <Pill text={color} color={color} onClick={() => {}} enabled={true} />
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

export const Pills = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    {colors.map((c) => renderPill(c))}
  </Box>
);
