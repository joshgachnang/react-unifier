import React from "react";
import {Box} from "./Box";
import {ActionBanner} from "./ActionBanner";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
library.add(faArrowRight);

export default {
  title: "ActionBanner",
  component: ActionBanner,
};

export const SolidIcons = () => (
  <Box width="100%" height="100%" display="flex">
    <ActionBanner
      text="Take some action on this banner!"
      color="primary"
      textColor="white"
      onClick={() => {}}
    />
  </Box>
);
