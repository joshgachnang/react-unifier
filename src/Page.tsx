import * as React from "react";
import {Box} from "./Box";
import {ErrorBoundary} from "./ErrorBoundary";
import {Heading} from "./Heading";
import {IconButton} from "./IconButton";
// import {KeyboardAccessoryNavigation} from "react-native-keyboard-accessory";
import {PageProps} from "./Common";
import {Spinner} from "./Spinner";
import {Unifier} from "./Unifier";

export class Page extends React.Component<PageProps, {}> {
  actionSheetRef: React.RefObject<any> = React.createRef();

  renderHeader() {
    if (!this.props.title && !this.props.backButton) {
      return null;
    }
    return (
      <Box width="100%" display="flex" direction="row">
        {this.props.backButton && (
          <Box paddingY={3} justifyContent="center" alignItems="center" display="block">
            <IconButton
              prefix="fas"
              icon="chevron-left"
              size="md"
              onClick={() => Unifier.navigation.pop(this.props.componentId)}
              accessibilityLabel=""
              iconColor="darkGray"
            />
          </Box>
        )}
        {Boolean(this.props.title) && (
          <Box display="flex" flex="grow" justifyContent="center" direction="column">
            <Heading align="center">{this.props.title}</Heading>
          </Box>
        )}
      </Box>
    );
  }

  render() {
    return (
      <ErrorBoundary>
        <Box
          scroll={true}
          padding={this.props.padding !== undefined ? this.props.padding : 2}
          avoidKeyboard={true}
          keyboardOffset={this.props.keyboardOffset}
          display={this.props.display || "flex"}
          height="100%"
          width="100%"
          maxWidth={this.props.maxWidth || 800}
          alignSelf="center"
          direction={this.props.direction || "column"}
          color={this.props.color || "white"}
          // color="ligh"
        >
          {this.renderHeader()}
          {this.props.loading === true && (
            <Spinner size="md" color={Unifier.theme.darkGray as any} />
          )}
          {/* <KeyboardAccessoryNavigation
          avoidKeyboard
          doneButton={true}
          nextButton={true}
          previousButton={true}
        /> */}

          {this.props.children}
        </Box>
      </ErrorBoundary>
    );
  }
}
