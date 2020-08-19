import * as React from "react";
import RNPickerSelect from "react-native-picker-select";
import {SelectListProps, COLOR_MAP} from "./Common";

export class SelectList extends React.Component<SelectListProps, {}> {
  state = {showing: false};

  render() {
    return (
      <RNPickerSelect
        placeholder={{}}
        style={{
          viewContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 50,
            width: "100%",
            // Add padding so the border doesn't mess up layouts
            paddingHorizontal: 6,
            paddingVertical: 4,
            borderColor: Unifier.theme.gray,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: Unifier.theme.white,
          },
        }}
        items={this.props.options}
        onValueChange={this.props.onChange}
        value={this.props.value}
      />
    );
  }
}
