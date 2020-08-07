import * as React from "react";
import {Keyboard} from "react-native";
import {Navigation} from "react-native-navigation";
import {compose} from "redux";
import {withProfile} from "../../../shared";
import {Tracking} from "./Tracking";
import {Box} from "../Box";
import {Button} from "../Button";
import {TextField} from "../TextField";
import {Text} from "../Text";

interface Props {
  profile?: any;
  user?: any;
  firebase: any;
  authStateHandler: () => void;
  componentId: string;
}

interface State {
  code: string;
  password: string;
  statusText: string;
  codeError: string;
  passwordError: string;
}

class ResetPasswordPage extends React.Component<Props, State> {
  static options() {
    return {
      topBar: {
        title: {
          text: "Reset Password",
        },
        visible: true,
        buttonColor: "white",
      },
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      code: "",
      statusText: "",
      password: "",
      codeError: "",
      passwordError: "",
    };
  }

  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        visible: true,
        title: {
          text: "Reset Password",
        },
      },
    });
  }

  sendResetCode = async () => {
    Keyboard.dismiss();

    if (!this.props.user.email) {
      return;
    }

    try {
      await this.props.firebase.resetPassword(this.props.user.email);
    } catch (e) {
      Tracking.error(`[resetPassword] Error sending reset code`, e);
      // TOOD: make this better
      return;
    }
    this.setState({statusText: "Ok! Your reset code is on the way!"}, () =>
      setTimeout(() => this.setState({statusText: ""}), 3000)
    );
  };

  resetPassword = () => {
    Keyboard.dismiss();
    try {
      this.props.firebase.confirmPasswordReset(this.state.code, this.state.password);
    } catch (e) {
      Tracking.error(`[resetPassword] Error resetting password`, e);
      // TOOD: make this better
      return;
    }
    this.setState({statusText: "Ok! Your reset code is on the way!"}, () =>
      setTimeout(() => this.setState({statusText: ""}), 3000)
    );
  };

  render() {
    return (
      <Box color="white" paddingX={3} paddingY={6} scroll={true}>
        {this.state.statusText !== "" && (
          <Box paddingY={3}>
            <Text weight="bold">{this.state.statusText}</Text>
          </Box>
        )}
        <Box>
          <Button onClick={this.sendResetCode} color="secondary" text="Send Reset Code" />
        </Box>
        <Box paddingY={9}>
          <Box paddingY={3}>
            <Text>Or enter the reset code and your new password here:</Text>
          </Box>
          <TextField
            onChange={(result) => this.setState({code: result.value})}
            value={this.state.password}
            label="Reset Code"
            errorMessage={this.state.codeError}
          />
          <TextField
            onChange={(result) => this.setState({password: result.value})}
            value={this.state.password}
            label="New password"
            type="password"
            errorMessage={this.state.passwordError}
          />
          <Box paddingY={3}>
            <Button onClick={this.resetPassword} color="secondary" text="Save" />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default compose(
  withProfile
  // connect((state: ReduxState) => {
  //   return {
  //     user: state.firebase.auth,
  //   };
  // })
)(ResetPasswordPage) as any;
