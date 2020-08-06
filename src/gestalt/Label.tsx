import * as React from "react";
import PropTypes from "prop-types";
const styles = require("./Label.module.css");

interface Props {
  children?: React.ReactNode;
  htmlFor: string;
}

export default function Label(props: Props) {
  const {children, htmlFor} = props;

  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
};
