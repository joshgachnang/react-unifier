import * as React from "react";
import {Link} from "./Link";

interface SourceLinkProps {
  sourceUrl?: string;
}

export function getAffiliateLink(url?: string) {
  if (!url) {
    return "";
  }
  if (url.indexOf("amazon.com") === -1) {
    return url;
  }
  let base = url.split("?");
  return base + "?tag=avotoast-20";
}

const getPrettyUrl = (url: string): string => {
  const matches = /^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i.exec(url);
  if (!matches) {
    return "";
  }

  // Strip off leading www, no need for that.
  return matches[1].replace(/(^www.)/, "");
};

export class SourceLink extends React.Component<SourceLinkProps, {}> {
  render() {
    if (!this.props.sourceUrl) {
      return null;
    }
    return (
      <Link url={getAffiliateLink(this.props.sourceUrl)}>
        Source: {getPrettyUrl(this.props.sourceUrl)}
      </Link>
    );
  }
}
