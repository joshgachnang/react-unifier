import * as React from "react";
import {BannerProps} from "./UnifiedCommon";

export class Banner extends React.Component<BannerProps, {}> {
  render() {
    return null;
  }
}
export const hideBanner = (id: string) => {
  console.log("HIDE", id);
  // AsyncStorage.setItem(getKey(id), "true");
};
