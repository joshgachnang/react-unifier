import Permissions from "react-native-permissions";
import {Tracking} from "./Tracking";
import {PermissionStatus, PermissionKind} from "../UnifiedCommon";
import capitalize from "lodash/capitalize";

export async function requestPermissions(kind: PermissionKind): Promise<PermissionStatus> {
  return new Promise(async (resolve, reject) => {
    const userPropertyKey = `PermissionsFor${capitalize(kind)}`;

    let k = kind;
    let options: any = undefined;
    if (kind === "locationAlways") {
      k = "location";
      options = {type: "always"};
    }
    const current = (await Permissions.check(k, options)) as PermissionStatus;
    Tracking.log(`[permissions] ${k} permissions are ${current}`);
    if (current === "denied" || current === "restricted") {
      Tracking.setUserProperty(userPropertyKey, "false");
      return reject(current);
    } else if (current === "authorized") {
      Tracking.setUserProperty(userPropertyKey, "true");
      return resolve(current);
    }

    const response = await Permissions.request(kind, options);
    if (response === "authorized") {
      Tracking.setUserProperty(userPropertyKey, "true");
      return resolve(response);
    } else {
      Tracking.setUserProperty(userPropertyKey, "false");
      return reject(response);
    }
  });
}
