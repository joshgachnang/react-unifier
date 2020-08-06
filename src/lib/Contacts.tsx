/* eslint-disable @typescript-eslint/no-empty-interface */
import * as React from "react";

interface ContactProps {}

interface ContactState {}

export class Contact extends React.Component<ContactProps, ContactState> {
  constructor(props: ContactProps) {
    super(props);
    this.state = {};
  }

  render() {
    return null;
  }
}

export class Contacts {}
