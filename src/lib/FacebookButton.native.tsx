import * as React from "react";
import {AccessToken, LoginManager} from "react-native-fbsdk";
import firebase from "@react-native-firebase/app";
import {Button, Text} from "unified";
import {Tracking} from "./Tracking";
import {goToMain} from "../src/Layout";
import {FaceBookButtonProps} from "unified";

interface State {
  loading: boolean;
  errorMessage: string | null;
}

class FacebookButton extends React.Component<FaceBookButtonProps, State> {
  state = {loading: false, errorMessage: null};

  // Calling the following function will open the FB login dialogue:
  facebookLogin = async () => {
    this.setState({errorMessage: null});
    try {
      const result = await LoginManager.logInWithReadPermissions(["public_profile", "email"]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        Tracking.log("[facebook] user cancelled login request");
        return;
      }

      if (result.grantedPermissions) {
        Tracking.log(
          `[facebook] login success with permissions: ${result.grantedPermissions.toString()}`
        );
      } else {
        Tracking.log(`[facebook] login success`);
      }

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        this.setState({errorMessage: "Something went wrong, please try again"});
        Tracking.error("[facebook] Something went wrong obtaining the users access token");
        return;
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      await firebase.auth().signInWithCredential(credential);

      Tracking.trackSignup("facebook", true);
      goToMain();
    } catch (e) {
      Tracking.trackSignup("facebook", false, {error: e});
    }
  };
  render() {
    return (
      <>
        <Button
          loading={this.state.loading}
          color="facebook"
          text={this.props.signUp ? "Sign up with Facebook" : "Sign in with Facebook"}
          onClick={this.facebookLogin}
        />
        {this.state.errorMessage !== undefined && (
          <Text color={this.props.errorMessageColor || "red"}>{this.state.errorMessage}</Text>
        )}
      </>
    );
  }
}

export default FacebookButton;
