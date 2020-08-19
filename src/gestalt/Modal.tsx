import * as React from "react";
import PropTypes from "prop-types";
import Box from "./Box";
import Heading from "./Heading";
import StopScrollBehavior from "./behaviors/StopScrollBehavior";
import TrapFocusBehavior from "./behaviors/TrapFocusBehavior";
import OutsideEventBehavior from "./behaviors/OutsideEventBehavior";
const styles = require("./Modal.module.css");

require("react-dom");

interface Props {
  header?: React.ReactNode;
  accessibilityModalLabel: string;
  children?: React.ReactNode;
  closeOnOutsideClick?: boolean;
  footer?: React.ReactNode;
  heading?: string | React.ReactNode;
  onDismiss: () => void;
  role?: "alertdialog" | "dialog";
  size?: "sm" | "md" | "lg" | number;
}

const SIZE_WIDTH_MAP = {
  sm: 540,
  md: 720,
  lg: 900,
};

const ESCAPE_KEY_CODE = 27;

function Backdrop({children}: {children?: React.ReactNode}) {
  return (
    <>
      <div className={styles.backdrop} />
      {children}
    </>
  );
}

interface HeaderProps {
  heading: string | React.ReactNode;
}
class Header extends React.Component<HeaderProps, {}> {
  render() {
    const heading = this.props.heading;
    if (typeof heading !== "string") {
      return heading;
    }

    return (
      <Box display="flex" justifyContent="center" padding={8}>
        <Heading size="md" accessibilityLevel={1}>
          {heading}
        </Heading>
      </Box>
    );
  }
}

export default function Modal({
  header,
  accessibilityModalLabel,
  children,
  closeOnOutsideClick = true,
  onDismiss,
  footer,
  heading,
  role = "dialog",
  size = "sm",
}: Props) {
  React.useEffect(() => {
    function handleKeyUp(event: {keyCode: number}) {
      if (event.keyCode === ESCAPE_KEY_CODE) {
        onDismiss();
      }
    }

    window.addEventListener("keyup", handleKeyUp);
    return function cleanup() {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onDismiss]);

  const handleOutsideClick = () => {
    if (closeOnOutsideClick) {
      onDismiss();
    }
  };

  const width = typeof size === "string" ? SIZE_WIDTH_MAP[size] : size;

  return (
    <StopScrollBehavior>
      <TrapFocusBehavior>
        <div aria-label={accessibilityModalLabel} className={styles.container} role={role}>
          <Backdrop>
            <OutsideEventBehavior onClick={handleOutsideClick}>
              <div className={styles.wrapper} tabIndex={-1} style={{width}}>
                <Box flex="grow" position="relative" display="flex" direction="column" width="100%">
                  {heading && (
                    <Box fit>
                      <Header heading={heading} />
                    </Box>
                  )}
                  {header && header}
                  <div className={styles.content}>{children}</div>
                  {footer && (
                    <Box fit>
                      <Box>
                        <Box padding={8}>{footer}</Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </div>
            </OutsideEventBehavior>
          </Backdrop>
        </div>
      </TrapFocusBehavior>
    </StopScrollBehavior>
  );
}

Modal.propTypes = {
  accessibilityModalLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
  closeOnOutsideClick: PropTypes.bool,
  footer: PropTypes.node,
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onDismiss: PropTypes.func,
  role: PropTypes.oneOf(["alertdialog", "dialog"]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(["sm", "md", "lg"])]),
};
