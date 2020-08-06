import {Icon} from "./Icon";
import * as React from "react";
import {Box} from "./Box";
import {Button} from "./Button";
import {Text} from "./Text";
import {COLOR_MAP, TapToEditState, TextFieldProps} from "./UnifiedCommon";
import {TextField} from "./TextField";

export class TapToEdit extends React.Component<TextFieldProps, TapToEditState> {
  state = {showEdit: false};

  render() {
    if (!this.state.showEdit) {
      return (
        <Box display="flex" direction="row" onClick={() => this.setState({showEdit: true})}>
          <Box marginRight={2}>
            <Icon name="edit" size={20} color={Unifier.theme.primaryDark} prefix="far" />
          </Box>
          <Text>{this.props.children}</Text>
        </Box>
      );
    } else {
      return (
        <Box>
          <TextField {...this.props} />
          <Box width={100} paddingY={1}>
            <Button
              inline={true}
              color="primary"
              text="Save"
              onClick={() => {
                this.setState({showEdit: false});
                if (this.props.onSubmitEditing) {
                  this.props.onSubmitEditing();
                }
              }}
            />
          </Box>
        </Box>
      );
    }
  }
}
