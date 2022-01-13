import React from "react";
import {Box} from "./Box";
import {Heading} from "./Heading";
import {HeadingProps} from "./Common";
import {storiesOf} from "@storybook/react-native";
import {StorybookContainer} from "./StorybookContainer";

function renderText(text: string, props: Partial<HeadingProps>) {
  return (
    <Box width="100%" paddingY={1}>
      <Heading {...props}>{text}</Heading>
    </Box>
  );
}

storiesOf("Headings", module).add("Headings", () => (
  <StorybookContainer>
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
  </StorybookContainer>
));
