import React from "react";
import {Box} from "./Box";
import {Heading} from "./Heading";
import {HeadingProps} from "./UnifiedCommon";

export default {
  title: "Heading",
  component: Heading,
};

function renderText(text: string, props: Partial<HeadingProps>) {
  return (
    <Box width="100%" paddingY={1}>
      <Heading {...props}>{text}</Heading>
    </Box>
  );
}

export const Headings = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    {renderText("Default Heading - h1", {})}
    {renderText("medium - h2", {size: "md"})}
    {renderText("small - h3", {size: "sm"})}
    {renderText("gray", {color: "gray"})}
    {renderText("lightGray", {color: "lightGray"})}
    {renderText("primary", {color: "primary"})}
    {renderText("secondary", {color: "secondary"})}
    {renderText("tertiary", {color: "tertiary"})}
    {renderText("accent", {color: "accent"})}
    {renderText("red", {color: "red"})}
    {renderText("center", {align: "center"})}
  </Box>
);
