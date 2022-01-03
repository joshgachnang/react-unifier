import React from "react";
import {Box} from "./Box";
import {Icon} from "./Icon";

// import {library} from "@fortawesome/fontawesome-svg-core";
// import {
//   faHeart as fasHeart,
//   faPlus as fasPlus,
//   faEdit as fasEdit,
// } from "@fortawesome/free-solid-svg-icons";
// import {faHeart, faEdit} from "@fortawesome/free-regular-svg-icons";

// library.add(fasHeart, fasPlus, fasEdit, faHeart, faEdit);

export default {
  title: "Icon",
  component: Icon,
};

export const SolidIcons = () => (
  <Box width="100%" height="100%" display="flex" direction="row" justifyContent="between">
    <Icon prefix="fas" name="heart" />
    <Icon prefix="fas" name="plus" />
    <Icon prefix="fas" name="edit" />
  </Box>
);

export const RegularIcons = () => (
  <Box width="100%" height="100%" display="flex" direction="row" justifyContent="between">
    <Icon prefix="far" name="heart" />
    <Icon prefix="far" name="plus" />
    <Icon prefix="far" name="edit" />
    <Icon prefix="far" name="heart" />
  </Box>
);

export const IconSizes = () => (
  <Box width="100%" height="100%" display="flex" direction="row" justifyContent="between">
    <Icon prefix="fas" name="heart" size={8} />
    <Icon prefix="far" name="heart" size={8} />

    <Icon prefix="fas" name="heart" size={12} />
    <Icon prefix="far" name="heart" size={12} />

    <Icon prefix="fas" name="heart" size={15} />
    <Icon prefix="far" name="heart" size={15} />

    <Icon prefix="fas" name="heart" size={22} />
    <Icon prefix="far" name="heart" size={22} />

    <Icon prefix="fas" name="heart" size={28} />
    <Icon prefix="far" name="heart" size={28} />
  </Box>
);
