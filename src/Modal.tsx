/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import OutsideEventBehavior from "./behaviors/OutsideEventBehavior";
import StopScrollBehavior from "./behaviors/StopScrollBehavior";
import TrapFocusBehavior from "./behaviors/TrapFocusBehavior";
import {Box} from "./Box";
import {Heading} from "./Heading";
import {OptionsLayout} from "./navigation";
import {ModalProps} from "./UnifiedCommon";
import {Screens} from "./UnifiedScreens";
import {Unifier} from "./Unifier";
const styles = require("./gestalt/Modal.module.css");

require("react-dom");

// Pass "onSave" in passProps to create the save right nav button
export function showFullPageModal(
  component: any,
  title: string,
  layout?: OptionsLayout,
  passProps?: any
) {
  Unifier.navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: Screens.FullPageModal,
            passProps: {
              component,
              ...passProps,
            },
            options: {
              topBar: {
                background: {
                  color: Unifier.theme.primaryDark,
                },
                title: {
                  text: title,
                  color: Unifier.theme.white,
                },
                leftButtons: [
                  {
                    id: "close",
                    text: "Close",
                    color: Unifier.theme.white,
                    // icon: times,
                  },
                ],
              },
              layout: layout,
            },
          },
        },
      ],
    },
  });
}

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
