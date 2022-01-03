import {FontAwesome} from "@expo/vector-icons";
import React from "react";
import {iconNumberToSize, IconProps, iconSizeToNumber} from "./Common";
import {Unifier} from "./Unifier";

export function initIcons() {}

export class Icon extends React.Component<IconProps, {}> {
  render() {
    const color = Unifier.theme[this.props.color || "primary"];
    // Standardize the size (pretty hacky..)
    let size = iconSizeToNumber(iconNumberToSize(this.props.size));
    return (
      <FontAwesome
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
