// import {Screens} from "./UnifiedScreens";
import {Auth} from "./Auth";
// import {BarcodeView} from "./CameraView";
import {FullPageModal} from "./Modal";
import {Spinner} from "./Spinner";
import {NavConfig} from "./Common";
import {Unifier} from "./Unifier";

export enum Screens {
  // BarcodeView = "BarcodeView",
  Contacts = "Contacts",
  FullPageModal = "FullPageModal",
  Auth = "Auth",
  Spinner = "lib.Spinner",
  Payment = "Payment",
  Onboarding = "Onboarding",
}
let initialized = false;
export function initializeUnifiedScreens() {
  if (initialized) {
    console.error("Cannot initialize screens multiple times.");
    return;
  }
  initialized = true;
  console.debug("[unifier] Registering unified screens");

  const registerScreen = (screen: string, component: any, config?: NavConfig) => {
    Unifier.navigation.registerScreen(screen, component, config);
  };
  // const registerActionSheet = (
  //   screen: string,
  //   component: any,
  //   config?: NavConfig
  // ) => {
  //   Unifier.navigation.registerActionSheet(screen, component, config);
  // };
  registerScreen(Screens.Auth, Auth, {url: "/auth"});
  // registerScreen(Screens.BarcodeView, BarcodeView, {url: "/barcode"});
  registerScreen(Screens.FullPageModal, FullPageModal, {url: "/item"});
  registerScreen(Screens.Spinner, Spinner);

  //Additions for idleinbox
}
