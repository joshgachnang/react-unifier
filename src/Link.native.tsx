import React from "react";

interface LinkProps {}

interface LinkState {}

export class Link extends React.Component<LinkProps, LinkState> {
  constructor(props: LinkProps) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.children;
  }
}
