import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Box from "./Box";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const styles = require("./Card.module.css");

interface Props {
  active?: boolean | null | undefined;
  children?: React.ReactNode;
  image?: React.ReactNode;
  onMouseEnter?: (arg0: {event: React.MouseEvent<HTMLDivElement>}) => void;
  onMouseLeave?: (arg0: {event: React.MouseEvent<HTMLDivElement>}) => void;
}

export default function Card(props: Props) {
  const [hovered, setHovered] = React.useState(false);
  const {active, children, image, onMouseEnter, onMouseLeave} = props;

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setHovered(true);
    if (onMouseEnter) {
      onMouseEnter({event});
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setHovered(false);
    if (onMouseLeave) {
      onMouseLeave({event});
    }
  };

  const classes = classnames(styles.card, {
    // If, like @chrislloyd, you can't remember Javascript equality rules,
    // == null checks for `null` or `undefined` and leaves out `false`.
    [styles.hover]: active || (active == null && hovered),
  });

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} position="relative">
      {image && <Box marginBottom={1}>{image}</Box>}
      <Box>{children}</Box>
      <div className={classes} />
    </Box>
  );
}

Card.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  image: PropTypes.node,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};
