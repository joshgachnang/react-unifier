import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
const styles = require("./Switch.module.css");

interface Props {
  disabled?: boolean;
  id: string;
  name?: string;
  onChange: (arg0: {event: React.SyntheticEvent; value: boolean}) => void;
  switched?: boolean;
}

interface State {
  focused: boolean;
}

export default class Switch extends React.Component<Props, State> {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    switched: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    switched: false,
  };

  state = {
    focused: false,
  };

  handleBlur = () => this.setState({focused: false});

  handleFocus = () => this.setState({focused: true});

  handleChange = (event: React.SyntheticEvent) => {
    const {onChange} = this.props;
    const {checked} = event.target as any;
    onChange({event, value: checked});
  };

  render() {
    const {disabled, id, name, switched} = this.props;

    const switchStyles = classnames(
      styles.switch,
      {
        [styles.focused]: this.state.focused,
      }, // eslint-disable-next-line no-nested-ternary
      disabled
        ? switched
          ? styles.switchGray
          : styles.switchLightGray
        : switched
        ? styles.switchDarkGray
        : styles.switchWhite
    );

    const sliderStyles = classnames(
      styles.slider,
      switched ? styles.sliderRight : styles.sliderLeft,
      switched && !disabled ? styles.sliderDark : styles.sliderLight
    );

    const inputStyles = classnames(styles.checkbox, {
      [styles.checkboxEnabled]: !disabled,
    });

    return (
      <div className={switchStyles}>
        <input
          checked={switched}
          className={inputStyles}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          type="checkbox"
        />
        <div className={sliderStyles} />
      </div>
    );
  }
}
