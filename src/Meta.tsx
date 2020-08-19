import * as React from "react";
import {MetaProps} from "./Common";

export class Meta extends React.Component<MetaProps, {}> {
  constructor(props: MetaProps) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.itemType) {
      return (
        <div itemScope itemType={this.props.itemType}>
          {this.props.children}
        </div>
      );
    }
    return <meta {...this.props} />;
  }
}
