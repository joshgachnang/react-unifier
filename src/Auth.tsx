import * as React from "react";
import {BlurBox} from "./BlurBox";
import {Box} from "./Box";
import {ImageBackground} from "./ImageBackground";
import {SignUpForm} from "./SignUpForm";
import {BaseProfile} from "./Common";
import {Unifier} from "./Unifier";
import {getOnboardingBackground} from "./Utils";
import {FireStorm} from "./react-firestorm/src";

interface AuthPageProps {
  componentId: string;
  profile: Partial<BaseProfile>;
}

class AuthPage extends React.Component<AuthPageProps, {}> {
  static options = () => ({
    topBar: {
      title: {
        text: "Sign Up",
        color: Unifier.theme.white,
        fontFamily: Unifier.theme.titleFont,
        fontSize: 18,
      },
      background: {
        color: Unifier.theme.primaryDark,
      },
      backButton: {
        color: Unifier.theme.white,
      },
      // visible: false,
      // animate: false,
    },
    bottomBar: {
      visible: false,
    },
  });

  finish = async (shouldGoToPayment: boolean) => {
    // if (shouldGoToPayment) {
    //   Unifier.navigation.goToPayment();
    // } else {
    Unifier.navigation.goToMain();
    // }
  };

  render() {
    const profile = FireStorm.getUserOrSignupData();
    return (
      <ImageBackground source={getOnboardingBackground()} style={{width: "100%", height: "100%"}}>
        <Box
          display="flex"
          height="100%"
          width="100%"
          paddingY={2}
          paddingX={2}
          avoidKeyboard={true}
          justifyContent="center"
          alignItems="center"
        >
          <BlurBox paddingY={3}>
            <SignUpForm
              title="Idle Inbox"
              // image={image}
              // explainer="Lastly, to finish creating your account:"
              componentId={this.props.componentId}
              profileData={profile}
              finish={this.finish}
            />
          </BlurBox>

          <Box height={50} />
        </Box>
      </ImageBackground>
    );
  }
}

export const Auth = AuthPage;
