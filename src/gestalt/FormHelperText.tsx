import * as React from "react";
import PropTypes from "prop-types";
import Box from "./Box";
import Text from "./Text";

export default function FormHelperText({text}: {text: string}) {
  return (
    <Box marginTop={2}>
      <Text color="gray" size="sm">
        {text}
      </Text>
    </Box>
  );
}

FormHelperText.propTypes = {
  text: PropTypes.string.isRequired,
};
