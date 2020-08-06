import { Unifier } from "./Unifier";
import { Tracking } from "./lib/Tracking";

export const openURL = (url: string) => {
  const win = window.open(url, "_blank");
  if (win != null) {
    win.focus();
  }
};

export const getCardWidth = () => {
  return Math.min(Unifier.utils.dimensions().width, 300);
};

export const getImageHeight = () => {
  return getCardWidth() * (9 / 16);
};

export function getOnboardingBackground() {
  return require("../img/onboarding-background.jpg");
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function fetchWithRetry(
  url: string,
  options: any,
  callback: (result: any) => void
) {
  let backoff = 2;
  let result: any;
  let count = 1;
  try {
    result = await fetch(url, options);
  } catch (e) {
    Tracking.error(`Failed to send API request`, { url, options });
    if (count > 10) {
      Tracking.error(`Failed 10 times to send API request, giving up.`);
      throw new Error(`Failed 10 times to send API request, giving up.`);
    }
    count += 1;
    if (backoff ** 2 < 64) {
      backoff = backoff ** 2;
    }
    setTimeout(() => fetchWithRetry(url, options, callback), backoff * 1000);
  }
  callback(result);
}
