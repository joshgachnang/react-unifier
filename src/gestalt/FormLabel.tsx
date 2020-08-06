import * as React from "react";
import PropTypes from "prop-types";
const styles = require("./FormLabel.module.css");
import Text from "./Text";
import Label from "./Label";

export default function FormLabel({id, label, color}: {id: string; label: string; color?: any}) {
  return (
    <Label htmlFor={id}>
      <div className={styles.formLabel}>
        <Text size="md" color={color || "darkGray"}>
          {label}
        </Text>
      </div>
    </Label>
  );
}

FormLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
