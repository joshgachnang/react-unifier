import * as React from "react";
import {createPortal} from "react-dom";
import {LayerProps} from "./UnifiedCommon";

interface State {
  mounted: boolean;
}

export class Layer extends React.Component<LayerProps, State> {
  state = {
    mounted: false,
  };

  el: HTMLDivElement | null = null;

  constructor(props: LayerProps) {
    super(props);
    if (typeof document !== "undefined" && document.createElement) {
      this.el = document.createElement("div");
    } else {
      // eslint-disable-next-line no-console
      console.warn("Using Layer without document present. Children will not be rendered.");
    }
  }

  componentDidMount() {
    if (!this.el) {
      return;
    }
    if (typeof document !== "undefined" && document.body) {
      document.body.appendChild(this.el);
      this.setState({mounted: true});
    }
  }

  componentWillUnmount() {
    if (document.body && this.el) {
      document.body.removeChild(this.el);
    }
  }

  render() {
    if (!this.el) {
      return null;
    }
    const {children} = this.props;
    return this.state.mounted && createPortal(children, this.el);
  }
}
