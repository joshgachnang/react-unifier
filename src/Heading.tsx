/* eslint-disable @typescript-eslint/no-var-requires */
// export class Heading extends React.Component<HeadingProps, {}> {
//   render() {
//     return (
//       <GestaltHeading {...this.props} color={this.props.color as any}>
//         {this.props.children}
//       </GestaltHeading>
//     );
//   }
// }
import cx from "classnames";
import * as React from "react";
import {HeadingProps} from "./UnifiedCommon";
import {Unifier} from "./Unifier";

const styles = require("./gestalt/Heading.module.css");
const typography = require("./gestalt/Typography.module.css");

const defaultHeadingLevels = {
  sm: 3,
  md: 2,
  lg: 1,
};

const SIZE_SCALE: {[size: string]: number} = {
  sm: 1,
  md: 2,
  lg: 3,
};

export function Heading(props: HeadingProps) {
  const {
    align = "left",
    children,
    color = "darkGray",
    // id = null,
    overflow = "normal",
    size = "lg",
    truncate = false,
  } = props;

  const cs = cx(
    styles.Heading,
    styles[`fontSize${SIZE_SCALE[size]}`],
    align === "center" && typography.alignCenter,
    align === "justify" && typography.alignJustify,
    align === "left" && typography.alignLeft,
    align === "right" && typography.alignRight,
    overflow === "breakWord" && typography.breakWord,
    truncate && typography.truncate
  );

  const headingLevel = defaultHeadingLevels[size];
  let newProps: {[key: string]: any} = {className: cs, style: {color: Unifier.theme[color]}};

  if (truncate && typeof children === "string") {
    newProps = {...newProps, title: children};
  }
  return React.createElement(`h${headingLevel}`, newProps, children);
}
