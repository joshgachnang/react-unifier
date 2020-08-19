import React from "react";
import {Box} from "./Box";
import {SegmentedControl} from "./SegmentedControl";

export default {
  title: "SegmentedControl",
  component: SegmentedControl,
};

export const DefaultControl = () => {
  const [itemIndex, setItemIndex] = React.useState(0);
  return (
    <Box display="flex" width="100%">
      <SegmentedControl
        items={["One", "Two", "Three"]}
        onChange={({activeIndex}) => setItemIndex(activeIndex)}
        selectedItemIndex={itemIndex}
      />
    </Box>
  );
};

export const LargeControl = () => {
  const [itemIndex, setItemIndex] = React.useState(0);
  return (
    <Box display="flex" width="100%">
      <SegmentedControl
        size="lg"
        items={["One", "Two", "Three"]}
        onChange={({activeIndex}) => setItemIndex(activeIndex)}
        selectedItemIndex={itemIndex}
      />
    </Box>
  );
};

// export const Responsive = () => {
//   const [itemIndex, setItemIndex] = React.useState(0);
//   return (
//     <Box width="100%" display="block">
//       <SegmentedControl
//         responsive={true}
//         items={["One", "Two", "Three Is Really Long So Takes Up More"]}
//         onChange={({activeIndex}) => setItemIndex(activeIndex)}
//         selectedItemIndex={itemIndex}
//       />
//     </Box>
//   );
// };
