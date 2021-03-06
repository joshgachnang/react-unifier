import {library} from "@fortawesome/fontawesome-svg-core";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import {iconNumberToSize, IconProps, iconSizeToNumber} from "./Common";
import {Unifier} from "./Unifier";

library.add(fas);
library.add(far);

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
