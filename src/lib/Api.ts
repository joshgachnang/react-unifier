import axios from "axios";
import * as rax from "retry-axios";
import * as firebase from "firebase/app";
import {Unifier} from "../Unifier";

const raxConfig = {
  // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
  retry: 3,

  // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
  noResponseRetries: 3,

  // Milliseconds to delay at first.  Defaults to 100.
  retryDelay: 100,

  // HTTP methods to automatically retry.  Defaults to:
  // ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
  httpMethodsToRetry: ["GET", "HEAD", "OPTIONS", "DELETE", "PUT", "POST"],

  // The response status codes to retry.  Supports a double
  // array with a list of ranges.  Defaults to:
  // [[100, 199], [429, 429], [500, 599]]
  statusCodesToRetry: [
    [100, 199],
    [400, 429],
    [500, 599],
  ],
};
rax.attach();

export class API {
  static userIdToken: string;

  static initialize(userIdToken: string) {
    this.userIdToken = userIdToken;
  }

  static async setUserToken() {
    const user = firebase.auth().currentUser;
    if (user) {
      try {
        const token = await user.getIdToken(true);
        API.initialize(token);
      } catch (e) {
        Unifier.tracking.error(`[API] could not get user ID token`, e);
        throw e;
      }
    } else {
      Unifier.tracking.warn(`[API] no firebase user to set user token.`);
    }
  }

  static async send(message: string, contacts: any[], id?: string) {
    return new Promise(async (resolve) => {
      await API.setUserToken();
      try {
        if (!this.userIdToken) {
          Unifier.tracking.warn(`[api] No API token set`);
          API.setUserToken();
        }
        const response = await (axios as any)({
          url: "https://avotoast.app/homesafe/contact",
          method: "POST",
          headers: {Accept: "application/json", "Content-Type": "application/json"},
          data: {
            id,
            token: this.userIdToken,
            message,
            contacts,
          },
          raxConfig: raxConfig,
        });
        Unifier.tracking.log("Sent message to contacts", {message, contacts});

        Unifier.tracking.log("[api] API response", response);
        resolve();
      } catch (e) {
        Unifier.tracking.log(`[api] Giving up on sending API request`, {
          token: this.userIdToken,
          message,
          contacts,
          error: e,
        });
        Unifier.tracking.error(`Giving up on sending API request`, {
          error: e,
        });
      }
    });
  }
}
