import * as React from "react";
import {IconProps, iconNumberToSize} from "./UnifiedCommon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// import {library} from "@fortawesome/fontawesome-svg-core";
import {library} from "@fortawesome/fontawesome-svg-core";
// import {fal as proFal} from "@fortawesome/pro-light-svg-icons";
import {
  faHeart as farHeart,
  faPlus as farPlus,
  faEdit as farEdit,
  faNewspaper as farNewspaper,
} from "@fortawesome/pro-regular-svg-icons";
import {
  faChevronLeft,
  faEnvelopeOpen,
  faCarrot,
  faComment,
  faUserCircle,
  faSearch,
  faChevronRight,
  faEllipsisV,
  faPaperPlane,
  faExclamationCircle,
  faMailBulk,
  faTrashAlt,
  faTrashRestoreAlt,
  faEnvelope,
  faSpinner,
} from "@fortawesome/pro-solid-svg-icons";
import {Unifier} from "./Unifier";
library.add(
  farHeart,
  farPlus,
  farEdit,
  farNewspaper,
  faChevronLeft,
  faCarrot,
  faComment,
  faUserCircle,
  faEnvelopeOpen,
  faSearch,
  faChevronRight,
  faEllipsisV,
  faPaperPlane,
  faExclamationCircle,
  faMailBulk,
  faTrashAlt,
  faTrashRestoreAlt,
  faEnvelope,
  faSpinner
);

export function initIcons() {
  console.log("Initializing icons");
}

let iconSet = new Set();

function addIcon(icon: string, prefix = "far") {
  let prev = new Set(iconSet);
  iconSet.add(`${prefix}-${icon}`);
  if (
    prev.size !== iconSet.size &&
    (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
  ) {
    console.debug("[Icon] current icon set:", iconSet);
  }
}

export class Icon extends React.Component<IconProps, {}> {
  render() {
    addIcon(this.props.name, this.props.prefix);
    const color = Unifier.theme[this.props.color || "primary"];
    let size: string = iconNumberToSize(this.props.size);
    if (size === "xl") {
      size = "2x";
    } else if (size === "md") {
      size = "1x";
    }
    return (
      <FontAwesomeIcon
        icon={[this.props.prefix || "far", this.props.name as any]}
        color={color}
        size={size as any}
      />
    );
  }
}
