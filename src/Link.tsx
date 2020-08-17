/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import {LinkProps} from "./UnifiedCommon";
const styles = require("./gestalt/Link.module.css");
import cx from "classnames";

const TAB_KEY_CODE = 9;

export function Link({children, href, inline = false, onClick, target = null}: LinkProps) {
  const [enableFocusStyles, setEnableFocusStyles] = React.useState(true);
  const rel = target === "blank" ? "noopener noreferrer" : undefined;
  const linkTarget = target ? `_${target}` : undefined;

  const handleClick = (_event: React.MouseEvent) => {
    if (onClick && href) {
      onClick();
    }
  };

  const handleMouseDown = () => {
    if (target === "blank" && href) {
      setEnableFocusStyles(false);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (target === "blank" && event.keyCode === TAB_KEY_CODE && href) {
      setEnableFocusStyles(true);
    }
  };

  return (
    <a
      className={cx(
        styles.link,
        enableFocusStyles ? styles.accessibleFocusStyle : "",
        inline ? "" : styles.block
      )}
      href={href}
      onMouseDown={handleMouseDown}
      onKeyUp={handleKeyUp}
      onClick={handleClick}
      rel={rel}
      target={linkTarget}
    >
      {children}
    </a>
  );
}
