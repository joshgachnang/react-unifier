import {Linking} from "react-native";
import {Unifier} from "./Unifier";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const onboardingBackground = require("../../app/onboarding-background.jpg");

export const openURL = (url: string) => {
  return Linking.canOpenURL(url);
};

export const getCardWidth = () => {
  const width = Unifier.utils.dimensions().width;
  return width - 40;
};

export const getImageHeight = () => {
  return getCardWidth() * (9 / 16);
};

export function getOnboardingBackground() {
  return onboardingBackground;
}
