import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export default class NoScrollBehavior extends React.Component<Props> {
  prevOverflow: string | null;

  constructor(props: Props) {
    super(props);
    this.prevOverflow = null;
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      this.prevOverflow = window.document.body.style.overflow;
      window.document.body.style.overflow = "hidden";
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      (window as any).document.body.style.overflow = this.prevOverflow;
    }
  }

  render() {
    return this.props.children;
  }
}
