import * as React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const styles = require("./Badge.module.css");

interface Props {
  position?: "middle" | "top";
  text: string;
}

export default function Badge(props: Props) {
  const {position = "middle", text} = props;
  const cs = cx(styles.Badge, styles[position]);

  return <span className={cs}>{text}</span>;
}

Badge.propTypes = {
  position: PropTypes.oneOf(["middle", "top"]),
  text: PropTypes.string.isRequired,
};
