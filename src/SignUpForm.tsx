import * as React from "react";
import {Box} from "./Box";
import {Button} from "./Button";
import {Heading} from "./Heading";
import {SubmittingForm} from "./SubmittingForm";
import {Text} from "./Text";
import {TextField} from "./TextField";
import {Unifier} from "./Unifier";
import {BaseProfile} from "./Common";
import {FireStorm} from "./react-firestorm/src";
import axios from "axios";

// const API_BASE_URL = "http://localhost:3000"
const API_BASE_URL = "https://api.idleinbox.com";

// class FacebookSignUp extends React.Component<SignUpFormProps, {}> {
//   render() {
//     return null;
//   }
// }

// class TwitterSignUp extends React.Component<SignUpFormProps, {}> {
//   render() {
//     return null;
//   }
// }

// class GoogleSignUp extends React.Component<SignUpFormProps, {}> {
//   render() {
//     return null;
//   }
// }

// interface PhoneNumberState {
//   text: string;
//   result?: any;
// }
// class PhoneNumberSignUp extends React.Component<SignUpFormProps, PhoneNumberState> {
//   constructor(props: SignUpFormProps) {
//     super(props);
//     this.state = {text: "", result: null};
//   }

//   render() {
//     if (this.state.result) {
//       return (
//         <>
//           <Box paddingY={2}>
//             <Text color="white">
//               Thanks! A code is on its way. Please enter the confirmation code here:
//             </Text>
//           </Box>
//           <Box paddingY={2}>
//             <TextField
//               placeholder="Confirmation Code"
//               onChange={(e) => {
//                 this.setState({text: e.value});
//               }}
//               value={this.state.text}
//             />
//           </Box>
//           <Box paddingY={2}>
//             <Button
//               color="secondary"
//               text="Confirm"
//               onPress={async () => {
//                 if (!this.state.text) {
//                   return;
//                 }
//                 this.state.result.confirm(this.state.text.trim());
//               }}
//             />
//           </Box>
//         </>
//       );
//     } else {
//       console.log("RECAPT", this.props.firebase.auth(), RNFirebase.auth());
//       const recaptchaVerifier = new RNFirebase.auth.RecaptchaVerifier("sign-in-button", {
//         size: "invisible",
//       });
//       return (
//         <>
//           <Box paddingY={2}>
//             <Text weight="bold" align="center" color="white">
//               Please enter your phone number:
//             </Text>
//           </Box>
//           <Box paddingY={2}>
//             <TextField
//               placeholder="Phone number"
//               onChange={(e) => {
//                 this.setState({text: e.value});
//               }}
//               value={this.state.text}
//             />
//           </Box>
//           <Box paddingY={2}>
//             <Button
//               color="secondary"
//               text="Submit"
//               onPress={async () => {
//                 console.log("SIGN UP PHONE");
//                 try {
//                   let result = await this.props.firebase.signInWithPhoneNumber(this.state.text);
//                   console.log("RESULT", result);
//                   this.setState({text: "", result: result});
//                 } catch (e) {
//                   console.log("ERR", e);
//                 }
//               }}
//             />
//           </Box>
//         </>
//       );
//     }
//   }
// }

interface EmailSignupState {
  username: string;
  email: string;
  password: string;
  emailError?: string;
  passwordError?: string;
  usernameError?: string;
  loading: boolean;
}

class EmailSignUp extends React.Component<SignUpFormProps, EmailSignupState> {
  state = {
    username: "",
    email: "",
    password: "",
    emailError: undefined,
    passwordError: undefined,
    usernameError: undefined,
    loading: false,
  };
  usernameRef: any;
  emailRef: any;
  passwordRef: any;

  signUp = () => {
    this.setState(
      {emailError: undefined, passwordError: undefined, usernameError: undefined, loading: true},
      async () => {
        try {
          let res = await axios.get(`${API_BASE_URL}/username/${this.state.username}`);
          if (res.status !== 200) {
            this.setState({usernameError: "Username already used", loading: false});
            return;
          }
        } catch (e) {
          console.log("Check username error", e);
          this.setState({usernameError: "Username already used", loading: false});
          return;
        }

        Unifier.tracking.log(`[signup] Creating user with email: ${this.state.email}`);
        let profile: Partial<BaseProfile>;
        let user: BaseProfile;
        try {
          profile = Object.assign({email: this.state.email}, this.props.profileData, {
            username: this.state.username,
          });
          if (!profile.backOffice) {
            profile.backOffice = {};
          }
          if (
            this.state.email.indexOf("nang.io") > -1 ||
            this.state.email.indexOf("example.com") > -1
          ) {
            console.info("[signup] Setting test user to true");
            profile.backOffice.testUser = true;
          }
          await FireStorm.updateProfile(profile);
          // profile = calculateDefaultMacros(profile);
          user = await FireStorm.signup({
            email: this.state.email,
            password: this.state.password,
          });
          console.log("[signup] Created user and profile", user, profile);
        } catch (e) {
          Unifier.tracking.warn("[signup] Error signing up", e.message);

          if (e.message === "The email address is badly formatted.") {
            this.setState({
              emailError: "That doesn't look like an email address",
              loading: false,
            });
          } else if (e.message === "The email address is already in use by another account.") {
            this.setState({
              emailError: "Oops! That email is already in use.",
              loading: false,
            });
          }
          Unifier.tracking.trackSignup("email", false);
          return;
        }
        Unifier.tracking.trackSignup("email", true);
        Unifier.tracking.setUser(user as BaseProfile);
        this.props.finish(true);
      }
    );
  };

  render() {
    const disableSignUp = !(
      this.state.email &&
      this.state.password &&
      this.state.password.length >= 6
    );
    return (
      <Box maxWidth={600} width="100%">
        {/* <Box paddingY={2}>
          <Text color="white" weight="bold" align="center">
            Sign Up Now!
          </Text>
        </Box> */}
        <SubmittingForm onSubmitEditting={this.signUp}>
          <Box paddingY={2} alignItems="center">
            <TextField
              label="Pick your IdleInbox email:"
              placeholder="MichaelBolton"
              errorMessage={this.state.usernameError}
              errorMessageColor="white"
              labelColor="white"
              type="text"
              value={this.state.username}
              onChange={(result) => this.setState({username: result.value})}
              inputRef={(ref: any) => (this.usernameRef = ref)}
              onEnter={() => this.emailRef && this.emailRef.focus()}
              returnKeyType="next"
            />
          </Box>

          <Box paddingY={1} marginBottom={2}>
            <Text weight="bold" color="white">
              {this.state.username}@idleinbox.com
            </Text>
          </Box>
          <Box paddingY={2} alignItems="center">
            <TextField
              label="Your Email:"
              placeholder="you@example.com"
              errorMessage={this.state.emailError}
              errorMessageColor="white"
              labelColor="white"
              type="email"
              value={this.state.email}
              onChange={(result) => this.setState({email: result.value})}
              inputRef={(ref: any) => (this.emailRef = ref)}
              onEnter={() => this.passwordRef && this.passwordRef.focus()}
              returnKeyType="next"
            />
          </Box>
          <Box paddingY={2}>
            <TextField
              label="Password:"
              placeholder="SuperSecurePassword123"
              errorMessage={this.state.passwordError}
              errorMessageColor="white"
              labelColor="white"
              type="password"
              value={this.state.password}
              onChange={(result) => this.setState({password: result.value})}
              inputRef={(ref: any) => (this.passwordRef = ref)}
              onEnter={() => this.signUp()}
              returnKeyType="done"
            />
          </Box>
        </SubmittingForm>

        <Box marginTop={4} width="100%">
          <Button
            color="tertiary"
            disabled={disableSignUp}
            onClick={this.signUp}
            text="Sign Up"
            loading={this.state.loading}
          />
        </Box>
      </Box>
    );
  }
}

interface EmailLoginState {
  password: string;
  email: string;
  loading: boolean;
  emailError: string;
  passwordError: string;
}

class EmailLogIn extends React.Component<SignUpFormProps, EmailLoginState> {
  state = {email: "", password: "", loading: false, emailError: "", passwordError: ""};
  emailRef: any;
  passwordRef: any;

  logIn = () => {
    this.setState({loading: true}, async () => {
      try {
        console.log("LOGIN", this.state.email, this.state.password);
        let profile = await FireStorm.login({
          email: this.state.email,
          password: this.state.password,
        });
        console.log("Login success!", profile);
      } catch (e) {
        console.warn("[signup] error logging in", e);
        Unifier.tracking.warn("[signup] error logging in", e);
        Unifier.tracking.trackLogin("email", false);
        Unifier.tracking.setUser(Object.assign({}, {email: this.state.email}) as BaseProfile);
        this.setState({loading: false});
        if (e.message === "The email address is badly formatted.") {
          this.setState({passwordError: "", emailError: "Bad email"});
        } else if (e.code === "auth/user-not-found") {
          this.setState({passwordError: "", emailError: "No user exists with that email"});
        } else if (e.message === "The password is invalid or the user does not have a password.") {
          this.setState({passwordError: "Wrong password.", emailError: ""});
        }
        return;
      }
      this.setState({loading: false});
      Unifier.tracking.trackLogin("email", true);
      this.props.finish(false);
    });
  };

  render() {
    return (
      <Box maxWidth={600}>
        <Box paddingY={2}>
          <Text color="white" weight="bold">
            Please enter your details to log in:
          </Text>
        </Box>
        <SubmittingForm onSubmitEditting={this.logIn}>
          <Box paddingY={2}>
            <TextField
              label="Email"
              labelColor="white"
              errorMessage={this.state.emailError}
              placeholder="yum@avotoast.app"
              type="email"
              value={this.state.email}
              onChange={(result) => this.setState({email: result.value})}
              returnKeyType="next"
              onEnter={() => this.passwordRef && this.passwordRef.focus()}
            />
          </Box>
          <Box paddingY={2}>
            <TextField
              label="Password"
              labelColor="white"
              errorMessage={this.state.passwordError}
              placeholder="SuperSecurePassword123"
              type="password"
              value={this.state.password}
              onChange={(result) => this.setState({password: result.value})}
              returnKeyType="done"
              inputRef={(ref: any) => (this.passwordRef = ref)}
              onEnter={() => this.logIn()}
            />
          </Box>
          <Box marginTop={4}>
            <Button
              color="tertiary"
              onClick={this.logIn}
              text="Log In"
              loading={this.state.loading}
              disabled={!this.state.email || !this.state.password}
            />
          </Box>
        </SubmittingForm>
      </Box>
    );
  }
}

interface SignUpFormProps {
  finish: (goToPayment: boolean) => void;
  profileData: Partial<BaseProfile>;
}

interface SignUpFormContainerProps {
  componentId: string;
  title?: string;
  explainer?: string;
  image?: any;
  profileData: Partial<BaseProfile>;
  finish: (goToPayment: boolean) => void;
}

interface SignUpFormContainerState {
  showing: "picker" | "phone" | "email" | "facebook" | "twitter" | "google" | "login";
  loading: boolean;
}

export class SignUpForm extends React.Component<
  SignUpFormContainerProps,
  SignUpFormContainerState
> {
  constructor(props: SignUpFormProps) {
    super(props as any);
    this.state = {showing: "picker", loading: false};
  }

  render() {
    return (
      <>
        <Box width="100%" paddingX={4}>
          {Boolean(this.props.image) && (
            <Box paddingY={4} width="100%" alignItems="center">
              {this.props.image}
            </Box>
          )}
          {Boolean(this.props.title) && (
            <Box paddingY={4}>
              <Heading align="center" color="white" weight="bold" size="lg">
                {this.props.title}
              </Heading>
            </Box>
          )}
          {Boolean(this.props.explainer) && (
            <Box paddingY={2}>
              <Text align="center" weight="bold" color="white">
                {this.props.explainer}
              </Text>
            </Box>
          )}
          {this.state.showing !== "login" && (
            <>
              <Box paddingY={2}>
                <EmailSignUp finish={this.props.finish} profileData={this.props.profileData} />
              </Box>
              <Box paddingY={2}>
                <Button
                  type="outline"
                  text="Log in"
                  onClick={() => this.setState({showing: "login"})}
                />
              </Box>
            </>
          )}

          {this.state.showing === "login" && (
            <>
              <Box paddingY={2}>
                <EmailLogIn finish={this.props.finish} profileData={this.props.profileData} />
              </Box>
              <Box paddingY={2}>
                <Button
                  type="outline"
                  color="white"
                  onClick={() => this.setState({showing: "picker"})}
                  text="Go Back"
                />
              </Box>
            </>
          )}
        </Box>
      </>
    );
  }
}

// interface OnboardingProps {
//   firebase: any;
//   componentId: string;
// }

// interface OnboardingState {
//   profile: Partial<BaseProfile>;
// }

// class OnboardingPage extends React.Component<OnboardingProps, OnboardingState> {
//   static options() {
//     return {
//       topBar: {
//         height: 0,
//         visible: false,
//         animate: false,
//       },
//     };
//   }

//   constructor(props: OnboardingProps) {
//     super(props);
//     this.state = {
//       profile: getBlankProfile(),
//     };
//   }

//   openAlertModal = async () => {
//     try {
//       await requestPermissions("notification");
//     } catch (e) {}
//   };

//   text(message: string, size: "xl" | "lg" | "md" = "md") {
//     return (
//       <Box paddingY={1}>
//         <Text weight="bold" size={size} align="center" color="white">
//           {message}
//         </Text>
//       </Box>
//     );
//   }

//   updateProfile = (profile: Partial<BaseProfile>) => {
//     let prof = {...this.state.profile, ...profile};
//     prof = calculateDefaultMacros(prof);
//     this.setState({profile: prof});
//   };

//   finish = async (shouldGoToPayment: boolean) => {
//     if (shouldGoToPayment) {
//       goToPayment();
//     } else {
//       goToMain();
//     }
//   };

//   render() {
//     const Swiper: any = OnboardingSwiper;
//     return (
//       <Swiper
//         showDone={false}
//         showSkip={false}
//         showLogin={false}
//         showPrev={true}
//         controlStatusBar={false}
//         pages={[
//           {
//             title: this.text("AvoToast", "xl"),
//             subtitle: (
//               <Box paddingY={12} paddingX={6}>
//                 {this.text("Weight loss for busy millennials.")}
//                 {this.text("No crash diets. No expensive shakes. No giving up carbs forever.")}
//                 {this.text(
//                   "Lose weight, save money, and save time with AvoToast's customized, healthy meal plans."
//                 )}
//               </Box>
//             ),
//             backgroundColor: Config.primaryDarkColor,
//             // image: <Icon prefix="far" name="user-friends" size={100} color="white" />,
//           },
//           // {
//           //   title: this.text("Personal Guide", "xl"),
//           //   subtitle: (
//           //     <Box paddingY={12} paddingX={6}>
//           //       {/* {this.text(
//           //         "AvoToast is personalized just for you by a real human guide to help you lose weight."
//           //       )} */}

//           //       {/* <Box paddingY={12}> */}
//           //       {/* {this.text("Let's personalize AvoToast and introduce you to your guide!")} */}
//           //       {/* </Box> */}
//           //     </Box>
//           //   ),
//           //   backgroundColor: Config.primaryDarkColor,
//           //   // image: <Icon prefix="far" name="user-friends" size={100} color="white" />,
//           // },
//           {
//             backgroundColor: Config.primaryDarkColor,
//             body: (
//               <PersonalInfoPage saveProfileData={this.updateProfile} profile={this.state.profile} />
//             ),
//           },
//           {
//             backgroundColor: Config.primaryDarkColor,
//             body: (
//               <Box paddingY={10}>
//                 <DietPage saveProfileData={this.updateProfile} profile={this.state.profile} />
//               </Box>
//             ),
//           },
//           // {
//           //   backgroundColor: Config.primaryDarkColor,
//           //   body: (
//           //     <Box paddingY={10}>
//           //       <RestrictionPage saveProfileData={this.updateProfile} />
//           //     </Box>
//           //   ),
//           // },
//           // {
//           //   backgroundColor: Config.primaryDarkColor,
//           //   body: (
//           //     <Box paddingY={10}>
//           //       <CookingToolsPage saveProfileData={this.updateProfile} />
//           //     </Box>
//           //   ),
//           // },
//           {
//             backgroundColor: Config.primaryDarkColor,
//             body: (
//               <SignUpForm
//                 title="AvoToast"
//                 // image={image}
//                 // explainer="Lastly, to finish creating your account:"
//                 componentId={this.props.componentId}
//                 profileData={this.state.profile}
//                 finish={this.finish}
//               />
//             ),
//           },
//         ]}
//       />
//     );
//   }
// }

// export const OnboardingView = OnboardingPage;
