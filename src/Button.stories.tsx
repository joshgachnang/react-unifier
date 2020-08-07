import React from "react";
import {action} from "@storybook/addon-actions";
import {Button} from "./Button";
import {Box} from "./Box";
import {ButtonProps} from "./UnifiedCommon";

export default {
  title: "Button",
  component: Button,
};

function allColorButtons(props: Partial<ButtonProps>) {
  return (
    <Box width="100%" height="100%" display="flex" direction="column">
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Default" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Primary" color="primary" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Secondary" color="secondary" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Tertiary" color="tertiary" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Accent" color="accent" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Red" color="red" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Dark Gray" color="darkGray" {...props} />
      </Box>
      <Box paddingY={1}>
        <Button onClick={action("clicked")} text="Gray" color="gray" {...props} />
      </Box>
    </Box>
  );
}

export const ButtonColors = allColorButtons({});

export const LoadingButton = () => allColorButtons({loading: true});

export const GhostButton = () => allColorButtons({type: "ghost"});

export const DisabledButton = () => allColorButtons({disabled: true});
