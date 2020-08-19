import React from "react";
import {Box} from "./Box";
import {SelectList} from "./SelectList";
import {WithLabel} from "./WithLabel";
import {SelectListOptions} from "./UnifiedCommon";

export default {
  title: "SelectList",
  component: SelectList,
};

const options: SelectListOptions = [
  {label: "First", value: "first"},
  {label: "Second", value: "second"},
  {label: "Third, A Really Long Option", value: "third"},
];

export const SelectLists = () => {
  const [item, setItem] = React.useState(options[0].value);

  return (
    <Box width="100%" height="100%" display="flex" direction="column">
      <SelectList
        id="none"
        options={options}
        value={item}
        onChange={(item) => setItem(item)}
        placeholder="Here's some placeholder text."
      />
    </Box>
  );
};

export const WithLabelSelectList = () => {
  const [item, setItem] = React.useState(options[0].value);

  return (
    <Box width="100%" height="100%" display="flex" direction="column">
      <SelectList
        id="none"
        label="Enter a bunch of text"
        helperText="And some subtext"
        options={options}
        value={item}
        onChange={(item) => setItem(item)}
      />
    </Box>
  );
};

export const Disabled = () => {
  const [item, setItem] = React.useState(options[0].value);

  return (
    <Box width="100%" height="100%" display="flex" direction="column">
      <SelectList
        id="none"
        options={options}
        value={item}
        onChange={(item) => setItem(item)}
        disabled={true}
        placeholder="This is disabled"
      />
    </Box>
  );
};
