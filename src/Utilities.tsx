import get from "lodash/get";

export function mergeInlineStyles(inlineStyle?: any, newStyle?: any) {
  const inline = get(inlineStyle, "__style");
  let dangerouslySetInlineStyle = {
    __style: {
      ...inline,
      ...newStyle,
    },
  };

  return dangerouslySetInlineStyle;
}
