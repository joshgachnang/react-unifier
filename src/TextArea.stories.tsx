import React from "react";
import {Box} from "./Box";
import {TextArea} from "./TextArea";

export default {
  title: "TextArea",
  component: TextArea,
};

export const TextAreas = () => {
  return (
    <Box width="100%" height="100%" display="flex" direction="column">
      <TextArea id="none" onChange={() => {}} placeholder="Here's some placeholder text." />
    </Box>
  );
};

export const WithLabelTextArea = () => {
  return (
    <Box width="100%" height="100%" display="flex" direction="column">
      <TextArea
        label="Enter a bunch of text"
        helperText="And some subtext"
        id="none"
        onChange={() => {}}
      />
    </Box>
  );
};

export const Disabled = () => {
  return (
    <Box width="100%" height="100%" display="flex" direction="column">
      <TextArea id="none" onChange={() => {}} disabled={true} placeholder="This is disabled" />
    </Box>
  );
};

export const Errored = () => {
  return (
    <Box width="100%" height="100%" display="flex" direction="column">
      <TextArea
        label="Enter a bunch of text"
        helperText="And some subtext"
        errorMessage="There's been an error"
        id="none"
        onChange={() => {}}
      />
    </Box>
  );
};
