import React from "react";
import {Box} from "./Box";
import {Field} from "./Field";

export default {
  title: "Field",
  component: Field,
};

export const TextField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="Text Field"
      type="text"
      name="text"
      helperText="Here's some help text"
      initialValue="Pre-filled text"
      handleChange={() => {}}
    />
    <Field
      label="Disabled Field"
      type="text"
      name="text"
      disabled={true}
      helperText="Here's some help text"
      initialValue="Pre-filled text"
      handleChange={() => {}}
    />
  </Box>
);

export const BooleanField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="Boolean Field"
      type="boolean"
      name="text"
      helperText="Here's some help text"
      handleChange={() => {}}
    />
  </Box>
);

export const EmailTextField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="Email Field"
      type="email"
      name="text"
      helperText="Here's some help text"
      handleChange={() => {}}
    />

    <Field
      label="Email Field With Extra Validation"
      type="email"
      name="text"
      helperText="Requires @example.com"
      handleChange={() => {}}
      validate={(value) => value.search("@example.com") > -1}
      validateErrorMessage="Must be an example.com email"
    />
  </Box>
);

export const TextAreaField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="TextArea Field"
      type="textarea"
      name="text"
      helperText="Here's some help text"
      handleChange={() => {}}
    />
    <Field
      label="Large TextArea "
      type="textarea"
      name="text"
      rows={10}
      helperText="Here's some help text"
      handleChange={() => {}}
    />
  </Box>
);

export const NumberField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="Number Field"
      type="number"
      name="text"
      helperText="Here's some help text"
      handleChange={() => {}}
    />
  </Box>
);

export const CurrencyField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="Currency Field"
      type="currency"
      name="text"
      helperText="Here's some help text"
      handleChange={() => {}}
    />
  </Box>
);

export const PercentField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="Percent Field"
      type="percent"
      name="text"
      helperText="Here's some help text"
      handleChange={() => {}}
    />
  </Box>
);

export const SelectField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="Select Field"
      type="select"
      name="text"
      helperText="Here's some help text"
      handleChange={() => {}}
      options={[
        {label: "Option 1", value: "Option 1"},
        {label: "Option 2", value: "Option 2"},
      ]}
    />
  </Box>
);

export const PasswordField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="Password Field"
      type="password"
      name="text"
      helperText="Here's some help text"
      handleChange={() => {}}
    />
  </Box>
);

export const UrlField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="Url Field"
      type="url"
      name="text"
      helperText="Here's some help text"
      handleChange={() => {}}
    />
  </Box>
);

export const DateField = () => (
  <Box width="100%" height="100%" display="flex" direction="column">
    <Field
      label="Date Field"
      type="date"
      name="text"
      helperText="Here's some help text"
      handleChange={() => {}}
    />
  </Box>
);
