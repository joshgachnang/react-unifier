import * as React from "react";
import {TextAreaProps} from "./UnifiedCommon";
import {TextArea as GestaltTextArea} from "./gestalt";

export class TextArea extends React.Component<TextAreaProps, {}> {
  constructor(props: TextAreaProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {onFocus, onChange, onBlur, ...rest} = this.props;
    return (
      <GestaltTextArea
        onFocus={onFocus as any}
        onChange={onChange as any}
        onBlur={onBlur as any}
        {...rest}
      />
    );
  }
}
