import * as React from "react";
import {Screens} from "./UnifiedScreens";
import {OptionsLayout} from "./navigation";
import {Unifier} from "./Unifier";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const times = require("../img/times.png");

// export function showModal(screenName: string, passProps: any = {}) {
//   Navigation.showModal({
//     stack: {
//       children: [
//         {
//           component: {
//             name: screenName,
//             passProps: passProps,
//           },
//         },
//       ],
//     },
//   });
// }

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
                    icon: times,
                  },
                ],
                // rightButtons: passProps &&
                //   passProps.onSave && [
                //     {
                //       id: "save",
                //       text: "Save",
                //       color: Unifier.theme.white,
                //     },
                //   ],
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
