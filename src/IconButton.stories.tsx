import React from "react";
import {Box} from "./Box";
import {IconButton} from "./IconButton";

import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faHeart as fasHeart,
  faPlus as fasPlus,
  faEdit as fasEdit,
} from "@fortawesome/free-solid-svg-icons";
import {faHeart, faEdit} from "@fortawesome/free-regular-svg-icons";

library.add(fasHeart, fasPlus, fasEdit, faHeart, faEdit);

export default {
  title: "IconButton",
  component: IconButton,
};

export const IconButtons = () => (
  <Box width="100%" height="100%" display="flex" direction="row" justifyContent="between">
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
    />
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="secondary"
      onClick={() => {}}
    />
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
    />
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
      size="xl"
    />

    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
      bgColor="lightGray"
    />
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
      bgColor="gray"
    />
    <IconButton
      icon="plus"
      prefix="fas"
      accessibilityLabel="label"
      iconColor="primary"
      onClick={() => {}}
      bgColor="transparentDarkGray"
    />
    <Box padding={4} color="darkGray">
      <IconButton
        icon="plus"
        prefix="fas"
        accessibilityLabel="label"
        iconColor="primary"
        onClick={() => {}}
        bgColor="white"
      />
    </Box>
  </Box>
);
