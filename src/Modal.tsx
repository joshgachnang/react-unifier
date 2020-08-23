// Originally based on https://github.com/pinterest/gestalt
// Forked, updated to Typescript, and added features.
import * as React from "react";
import OutsideEventBehavior from "./behaviors/OutsideEventBehavior";
import StopScrollBehavior from "./behaviors/StopScrollBehavior";
import TrapFocusBehavior from "./behaviors/TrapFocusBehavior";
import {Box} from "./Box";
import {ModalProps} from "./Common";
import {Heading} from "./Heading";
import styles from "./Modal.module.css";
import {Unifier} from "./Unifier";

require("react-dom");

interface FullPageModalProps {
  component: any;
  onSave?: () => void;
  componentId: string;
}

export class FullPageModal extends React.Component<FullPageModalProps, {}> {
  constructor(props: FullPageModalProps) {
    super(props);
    Unifier.navigation.bindComponent(this);
  }

  render() {
    const Component = this.props.component;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {componentId, onSave, component, ...props} = this.props;
    return <Component componentId={componentId} isModal={true} {...props} />;
  }

  async navigationButtonPressed({buttonId}: {buttonId: string}) {
    if (buttonId === "close") {
      Unifier.navigation.dismissAllModals();
    } else if (buttonId === "save" && this.props.onSave) {
      // TODO: should probably be able to pass data back up this way or tell the component to save.
      await this.props.onSave();
      Unifier.navigation.dismissAllModals();
    }
  }
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
        <Heading size="md">{heading}</Heading>
      </Box>
    );
  }
}

export function Modal({
  header,
  accessibilityModalLabel,
  children,
  closeOnOutsideClick = true,
  onDismiss,
  footer,
  heading,
  role = "dialog",
  size = "sm",
}: ModalProps) {
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
