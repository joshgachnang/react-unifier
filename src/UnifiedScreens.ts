// import {Screens} from "./UnifiedScreens";
import {Auth} from "./Auth";
// import {BarcodeView} from "./CameraView";
import {FullPageModal} from "./Modal";
import {Spinner} from "./Spinner";
import {Unifier} from "./Unifier";

export enum UnifierScreens {
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
  Unifier.navigation.registerScreen(UnifierScreens.Auth, Auth, {url: "/auth"});
  // registerScreen(Screens.BarcodeView, BarcodeView, {url: "/barcode"});
  Unifier.navigation.registerScreen(UnifierScreens.FullPageModal, FullPageModal, {url: "/item"});
  Unifier.navigation.registerScreen(UnifierScreens.Spinner, Spinner);
}
