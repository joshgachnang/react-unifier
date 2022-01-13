import React from "react";
import {Box} from "./Box";
import {Color} from "./Common";
import {ErrorBoundary} from "./ErrorBoundary";
// import {KeyboardAccessoryNavigation} from "react-native-keyboard-accessory";
import {Spinner} from "./Spinner";
import {Unifier} from "./Unifier";
import {FlatList} from "./FlatList";
import {ListRenderItemInfo} from "react-native";

interface SplitPageProps {
  // TODO: figure out navigation
  navigation: any;
  loading?: boolean;
  color?: Color;
  keyboardOffset?: number;
  rightButton?: string;
  rightButtonOnClick?: () => void;
  renderListViewItem: (itemInfo: ListRenderItemInfo<any>) => React.ReactElement | null;
  renderListViewHeader?: () => React.ReactElement | null;
  listViewData: any[];
  listViewExtraData?: any;
}

interface SplitPageState {}

// A component for rendering a list on one side and a details view on the right for large screens,
// and a scrollable list where clicking an item takes you the details view.
export class SplitPage extends React.Component<SplitPageProps, SplitPageState> {
  actionSheetRef: React.RefObject<any> = React.createRef();

  render() {
    return (
      <ErrorBoundary>
        <Box
          avoidKeyboard={true}
          keyboardOffset={this.props.keyboardOffset}
          display="flex"
          width="100%"
          height="100%"
          flex="grow"
          direction="row"
          color={this.props.color || "lightGray"}
        >
          {this.props.loading === true && (
            <Spinner size="md" color={Unifier.theme.darkGray as any} />
          )}
          {/* <KeyboardAccessoryNavigation
          avoidKeyboard
          doneButton={true}
          nextButton={true}
          previousButton={true}
        /> */}

          {/* TODO: render this only for small sizes */}
          <Box width={300} maxWidth={300} flex="shrink" direction="column" scroll={true}>
            {this.props.renderListViewHeader && this.props.renderListViewHeader()}
            <FlatList
              data={this.props.listViewData}
              renderItem={this.props.renderListViewItem}
              keyExtractor={(item) => item.id}
              extraData={this.props.listViewExtraData}
            />
          </Box>
          <Box flex="grow" padding={2}>
            {this.props.children}
          </Box>
        </Box>
      </ErrorBoundary>
    );
  }
}
