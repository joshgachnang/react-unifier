import * as React from "react";
import {SubmittingFormProps} from "./UnifiedCommon";

export class SubmittingForm extends React.Component<SubmittingFormProps, {}> {
  render() {
    return <form onSubmit={this.props.onSubmitEditting}>{this.props.children}</form>;
  }
}
