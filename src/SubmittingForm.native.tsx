import * as React from "react";
import {View} from "react-native";
import {SubmittingFormProps} from "./UnifiedCommon";

// https://github.com/zackify/react-native-autofocus/blob/master/form.js
export class SubmittingForm extends React.Component<SubmittingFormProps, {}> {
  inputs: any[];

  constructor(props: SubmittingFormProps) {
    super(props);
    this.inputs = [];
  }

  renderChildren(children: any, recursiveIndex = 0): any {
    return React.Children.map(children, (child: any, index) => {
      if (!child) return;
      if (child.props.children)
        return React.cloneElement(child, {
          ...child.props,
          children: this.renderChildren(child.props.children, index),
        });
      if (child.type.name !== "TextField") return child;

      const realIndex = index + recursiveIndex;
      const lastField = realIndex + 1 === this.inputs.length;
      const props: any = {
        onEnter: () => (this.inputs[realIndex + 1] ? this.inputs[realIndex + 1].focus() : null),
        inputRef: (ref: any) => (this.inputs[realIndex] = ref),
        returnKeyType: lastField ? "done" : "next",
      };
      if (lastField) {
        props.onSubmitEditing = this.props.onSubmitEditting;
      }
      return React.cloneElement(child, props);
    });
  }

  render() {
    const {children, ...props} = this.props;
    return <View {...props}>{this.renderChildren(children)}</View>;
  }
}
