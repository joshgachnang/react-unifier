import {PermissionKind, PermissionStatus} from "unified";

export async function requestPermissions(kind: PermissionKind): Promise<PermissionStatus> {
  return new Promise((resolve) => {});
}
