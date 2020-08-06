import * as React from "react";
import {COLOR_MAP, IconProps, iconNumberToSize, iconSizeToNumber} from "./UnifiedCommon";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fal as proFal} from "@fortawesome/pro-light-svg-icons";
import {far as proFar} from "@fortawesome/pro-regular-svg-icons";
import {fas as proFas} from "@fortawesome/pro-solid-svg-icons";

library.add(fas);
library.add(far);
library.add(proFal);
library.add(proFar);
library.add(proFas);

export function initIcons() {}

export class Icon extends React.Component<IconProps, {}> {
  render() {
    const color = Unifier.theme[this.props.color || "primary"];
    // Standardize the size (pretty hacky..)
    let size = iconSizeToNumber(iconNumberToSize(this.props.size));

    return (
      <FontAwesomeIcon
        icon={[this.props.prefix || "far", this.props.name as any]}
        color={color}
        size={size}
      />
    );
    // const {name, prefix} = this.props;
    // const color = Unifier.theme[this.props.color || "primary"];
    // const size = this.props.size;

    // const map = {
    //   fapro: FAPro,
    //   fas: FAIcon,
    //   fa: FAIcon,
    //   fal: FAIcon,
    //   "fa-brand": FAIcon,
    //   ant: AntDesignIcon,
    //   entypo: EntypoIcon,
    //   evil: EvilIcons,
    //   material: MaterialIcons,
    //   "material-community": MaterialCommunityIcons,
    //   ionicon: Ionicons,
    //   octicon: Octicons,
    //   zocial: Zocial,
    //   "simple-line": SimpleLineIcons,
    //   feather: Feather,
    // };
    // const Component: any = map[prefix];
    // if (!Component) {
    //   console.warn(`[icons] could not find icon: ${prefix}:${name}`);
    //   return null;
    // }

    // if (["fapro", "fal", "fa", "fas", "fa-brand"].indexOf(this.props.prefix) > -1) {
    //   return (
    //     <Component
    //       solid={this.props.prefix === "fas"}
    //       light={this.props.prefix === "fal"}
    //       brand={this.props.prefix === "fa-brand"}
    //       name={name}
    //       color={color}
    //       size={size}
    //     />
    //   );
    // }
    // return <Component name={name} color={color} size={size} />;
  }
}
