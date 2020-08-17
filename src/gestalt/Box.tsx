/* eslint-disable @typescript-eslint/no-var-requires */
/*

# Welcome to Box!

I'll explain each part as we go through. Just remember, if you want to make updates, PLEASE PLEASE PLEASE update the Flow Types & PropTypes (even though they look scary).

*/
import * as React from "react";
const borders = require("./Borders.module.css");
const styles = require("./Box.module.css");
const whitespace = require("./boxWhitespace.module.css");
const colors = require("./Colors.module.css");
const layout = require("./Layout.module.css");
import {
  concat,
  fromClassName,
  fromInlineStyle,
  identity,
  mapClassName,
  Style,
  toProps,
} from "./style";
import {bind, mapping, range, rangeWithoutZero, toggle, union} from "./transforms";
/*

# ProTypes

Box's type definition is exhaustive. With the exception of `dangerouslySetInlineStyle`, values shouldn't be ambigious. That means that we have to type out things like boints, but that's also where Box's magic lies. Also, by putting in extra effort around type definitions here, we can skip extra runtime typechecks in the transformers for performance.

*/
type Display = "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
type Direction = "row" | "column";
type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
interface ResponsiveProps {
  column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  display?: boolean | "flex" | "flexColumn" | "inlineBlock";
}
type Margin =
  | -12
  | -11
  | -10
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | "auto";
type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle" | "pill";
interface BoxProps {
  children?: React.ReactNode;
  dangerouslySetInlineStyle?: {
    __style: {
      [key: string]: string | number | void;
    };
  };

  xs?: ResponsiveProps;
  sm?: ResponsiveProps;
  md?: ResponsiveProps;
  lg?: ResponsiveProps;

  display?: Display;
  column?: Column;
  direction?: Direction;
  smDisplay?: Display;
  smColumn?: Column;
  smDirection?: Direction;
  mdDisplay?: Display;
  mdColumn?: Column;
  mdDirection?: Direction;
  lgDisplay?: Display;
  lgColumn?: Column;
  lgDirection?: Direction;

  alignContent?: "start" | "end" | "center" | "between" | "around" | "evenly" | "stretch";
  alignItems?: "start" | "end" | "center" | "baseline" | "stretch";
  alignSelf?: "auto" | "start" | "end" | "center" | "baseline" | "stretch";
  bottom?: boolean;
  borderSize?: "sm" | "md" | "none";
  color?:
    | "blue"
    | "darkGray"
    | "darkWash"
    | "eggplant"
    | "gray"
    | "green"
    | "lightGray"
    | "lightWash"
    | "maroon"
    | "midnight"
    | "navy"
    | "olive"
    | "orange"
    | "orchid"
    | "pine"
    | "purple"
    | "red"
    | "transparent"
    | "transparentDarkGray"
    | "watermelon"
    | "white"
    | "primaryLighter"
    | "primaryLight"
    | "primary"
    | "primaryDark"
    | "primaryDarker"
    | "secondaryLighter"
    | "secondaryLight"
    | "secondary"
    | "secondaryDark"
    | "secondaryDarker"
    | "tertiaryLighter"
    | "tertiaryLight"
    | "tertiary"
    | "tertiaryDark"
    | "tertiaryDarker"
    | "accentLighter"
    | "accentLight"
    | "accent"
    | "accentDark"
    | "accentDarker"
    | "neutral900"
    | "neutral800"
    | "neutral700"
    | "neutral600"
    | "neutral500"
    | "neutral400"
    | "neutral300"
    | "neutral200"
    | "neutral100"
    | "neutral90"
    | "neutral80"
    | "neutral70"
    | "neutral60"
    | "neutral50"
    | "neutral40"
    | "neutral30"
    | "neutral20"
    | "neutral10";

  fit?: boolean;
  flex?: "grow" | "shrink" | "none";
  height?: number | string;
  justifyContent?: "start" | "end" | "center" | "between" | "around" | "evenly";
  left?: boolean;

  marginStart?: Margin;
  marginEnd?: Margin;

  margin?: Margin;
  marginTop?: Margin;
  marginRight?: Margin;
  marginBottom?: Margin;
  marginLeft?: Margin;

  smMargin?: Margin;
  smMarginTop?: Margin;
  smMarginRight?: Margin;
  smMarginBottom?: Margin;
  smMarginLeft?: Margin;

  mdMargin?: Margin;
  mdMarginTop?: Margin;
  mdMarginRight?: Margin;
  mdMarginBottom?: Margin;
  mdMarginLeft?: Margin;

  lgMargin?: Margin;
  lgMarginTop?: Margin;
  lgMarginRight?: Margin;
  lgMarginBottom?: Margin;
  lgMarginLeft?: Margin;

  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;

  opacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

  overflow?: "visible" | "hidden" | "scroll" | "scrollX" | "scrollY" | "auto";

  padding?: Padding;
  smPadding?: Padding;
  mdPadding?: Padding;
  lgPadding?: Padding;

  paddingX?: Padding;
  smPaddingX?: Padding;
  mdPaddingX?: Padding;
  lgPaddingX?: Padding;

  paddingY?: Padding;
  smPaddingY?: Padding;
  mdPaddingY?: Padding;
  lgPaddingY?: Padding;

  position?: "static" | "absolute" | "relative" | "fixed";
  right?: boolean;
  rounding?: Rounding;
  shrink?: boolean;
  top?: boolean;
  width?: number | string;
  wrap?: boolean;

  // HTML div props
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  role?: string;
  tabIndex?: number;

  // Unifier additions
  onClick?: any;
}

// --

/*

# Transformers

This is where the meat and the bones of Box's transforms are. You can read more about the DSL in `./transforms.js`, but basically they are a small declarative way of specifying how a property (i.e. `marginTop={4}`) gets turned into a CSS class (`marginTop4`).

There's a little preamble here, but it culminates in a big object mapping the actual property names to the transformer values.

*/
const transformNumberOrPassthrough = (selector: string) => (m: Margin): Style => {
  if (typeof m === "number") {
    return bind(rangeWithoutZero(selector), whitespace)(m);
  }

  if (m === "auto") {
    return fromClassName(whitespace[`${selector}Auto`]);
  }

  return identity();
};
const rounding = (r: Rounding): Style => {
  if (typeof r === "number") {
    return bind(range("rounding"), borders)(r);
  }

  if (r === "circle") {
    return fromClassName(borders.circle);
  }

  if (r === "pill") {
    return fromClassName(borders.pill);
  }

  return identity();
};

const marginStart = transformNumberOrPassthrough("marginStart");
const marginEnd = transformNumberOrPassthrough("marginEnd");
const marginTop = transformNumberOrPassthrough("marginTop");
const marginRight = transformNumberOrPassthrough("marginRight");
const marginBottom = transformNumberOrPassthrough("marginBottom");
const marginLeft = transformNumberOrPassthrough("marginLeft");
const margin = union(marginTop, marginBottom, marginLeft, marginRight);

const smMarginTop = transformNumberOrPassthrough("smMarginTop");
const smMarginRight = transformNumberOrPassthrough("smMarginRight");
const smMarginBottom = transformNumberOrPassthrough("smMarginBottom");
const smMarginLeft = transformNumberOrPassthrough("smMarginLeft");
const smMargin = union(smMarginTop, smMarginBottom, smMarginLeft, smMarginRight);

const mdMarginTop = transformNumberOrPassthrough("mdMarginTop");
const mdMarginRight = transformNumberOrPassthrough("mdMarginRight");
const mdMarginBottom = transformNumberOrPassthrough("mdMarginBottom");
const mdMarginLeft = transformNumberOrPassthrough("mdMarginLeft");
const mdMargin = union(mdMarginTop, mdMarginBottom, mdMarginLeft, mdMarginRight);

const lgMarginTop = transformNumberOrPassthrough("lgMarginTop");
const lgMarginRight = transformNumberOrPassthrough("lgMarginRight");
const lgMarginBottom = transformNumberOrPassthrough("lgMarginBottom");
const lgMarginLeft = transformNumberOrPassthrough("lgMarginLeft");
const lgMargin = union(lgMarginTop, lgMarginBottom, lgMarginLeft, lgMarginRight);

const paddingX = bind(rangeWithoutZero("paddingX"), whitespace);
const paddingY = bind(rangeWithoutZero("paddingY"), whitespace);
const padding = union(paddingX, paddingY);

const smPaddingX = bind(rangeWithoutZero("smPaddingX"), whitespace);
const smPaddingY = bind(rangeWithoutZero("smPaddingY"), whitespace);
const smPadding = union(smPaddingX, smPaddingY);

const mdPaddingX = bind(rangeWithoutZero("mdPaddingX"), whitespace);
const mdPaddingY = bind(rangeWithoutZero("mdPaddingY"), whitespace);
const mdPadding = union(mdPaddingX, mdPaddingY);

const lgPaddingX = bind(rangeWithoutZero("lgPaddingX"), whitespace);
const lgPaddingY = bind(rangeWithoutZero("lgPaddingY"), whitespace);
const lgPadding = union(lgPaddingX, lgPaddingY);

const opacityMap = mapClassName((name) => styles[name]);
const opacity = (val: any) => {
  if (val > 0 && val < 1) {
    return opacityMap(range("opacity0")(val * 10));
  }
  return opacityMap(range("opacity")(val));
};

/*

These functions are legacy. I'd like to get rid of most of this file's dependency on importing `./style.js` directly once these are removed.

*/
const prefix = (pre: string) => mapClassName((name) => `${pre}${name}`);
const display = (value: string | boolean) => {
  switch (value) {
    case "flex":
      return fromClassName("DisplayFlex", "DirectionRow");
    case "flexColumn":
      return fromClassName("DisplayFlex", "DirectionColumn");
    case "inlineBlock":
      return fromClassName("DisplayInlineBlock");
    case "visuallyHidden":
      return fromClassName("DisplayVisuallyHidden");
    case false:
      return fromClassName("DisplayNone");
    default:
      /* block */
      return fromClassName("DisplayBlock");
  }
};
const column = range("Col");

const COLOR_MAPPING = mapping({
  blue: colors.blueBg,
  darkGray: colors.darkGrayBg,
  pine: colors.pineBg,
  gray: colors.grayBg,
  red: colors.redBg,
  olive: colors.oliveBg,
  lightGray: colors.lightGrayBg,
  white: colors.whiteBg,
  orange: colors.orangeBg,
  green: colors.greenBg,
  navy: colors.navyBg,
  midnight: colors.midnightBg,
  purple: colors.purpleBg,
  orchid: colors.orchidBg,
  eggplant: colors.eggplantBg,
  maroon: colors.maroonBg,
  watermelon: colors.watermelonBg,
  lightWash: colors.lightWashBg,
  darkWash: colors.darkWashBg,
  transparentDarkGray: colors.transparentDarkGrayBg,
  primaryLighter: colors.primaryLighterBg,
  primaryLight: colors.primaryLightBg,
  primary: colors.primaryBg,
  primaryDark: colors.primaryDarkBg,
  primaryDarker: colors.primaryDarkerBg,
  secondaryLighter: colors.secondaryLighterBg,
  secondaryLight: colors.secondaryLightBg,
  secondary: colors.secondaryBg,
  secondaryDark: colors.secondaryDarkBg,
  secondaryDarker: colors.secondaryDarkerBg,
  tertiaryLighter: colors.tertiaryLighterBg,
  tertiaryLight: colors.tertiaryLightBg,
  tertiary: colors.tertiaryBg,
  tertiaryDark: colors.tertiaryDarkBg,
  tertiaryDarker: colors.tertiaryDarkerBg,
  accentLighter: colors.accentLighterBg,
  accentLight: colors.accentLightBg,
  accent: colors.accentBg,
  accentDark: colors.accentDarkBg,
  accentDarker: colors.accentDarkerBg,
  neutral900: colors.neutral900,
  neutral800: colors.neutral800,
  neutral700: colors.neutral700,
  neutral600: colors.neutral600,
  neutral500: colors.neutral500,
  neutral400: colors.neutral400,
  neutral300: colors.neutral300,
  neutral200: colors.neutral200,
  neutral100: colors.neutral100,
  neutral90: colors.neutral90,
  neutral80: colors.neutral80,
  neutral70: colors.neutral70,
  neutral60: colors.neutral60,
  neutral50: colors.neutral50,
  neutral40: colors.neutral40,
  neutral30: colors.neutral30,
  neutral20: colors.neutral20,
  neutral10: colors.neutral10,
  // default: transparent
});

/*

It's preferable to put new properties into that object directly just so it's easier to read.

*/
const propToFn = {
  xs: (value: any) => {
    if (!value) {
      return identity();
    }
    return mapClassName((c) => styles[c])(
      prefix("xs")(
        concat([
          value.column ? column(value.column) : identity(),
          typeof value.display !== "undefined" ? display(value.display) : identity(),
        ])
      )
    );
  },
  sm: (value: any) => {
    if (!value) {
      return identity();
    }
    return mapClassName((c) => styles[c])(
      prefix("sm")(
        concat([
          value.column ? column(value.column) : identity(),
          typeof value.display !== "undefined" ? display(value.display) : identity(),
        ])
      )
    );
  },
  md: (value: any) => {
    if (!value) {
      return identity();
    }
    return mapClassName((c) => styles[c])(
      prefix("md")(
        concat([
          value.column ? column(value.column) : identity(),
          typeof value.display !== "undefined" ? display(value.display) : identity(),
        ])
      )
    );
  },
  lg: (value: any) => {
    if (!value) {
      return identity();
    }
    return mapClassName((c) => styles[c])(
      prefix("lg")(
        concat([
          value.column ? column(value.column) : identity(),
          typeof value.display !== "undefined" ? display(value.display) : identity(),
        ])
      )
    );
  },

  display: mapping({
    none: styles.xsDisplayNone,
    flex: styles.xsDisplayFlex,
    block: styles.xsDisplayBlock,
    inlineBlock: styles.xsDisplayInlineBlock,
    visuallyHidden: styles.xsDisplayVisuallyHidden,
  }),
  column: bind(range("xsCol"), styles),
  direction: mapping({
    row: styles.xsDirectionRow,
    column: styles.xsDirectionColumn,
  }),

  smDisplay: mapping({
    none: styles.smDisplayNone,
    flex: styles.smDisplayFlex,
    block: styles.smDisplayBlock,
    inlineBlock: styles.smDisplayInlineBlock,
    visuallyHidden: styles.smDisplayVisuallyHidden,
  }),
  smColumn: bind(range("smCol"), styles),
  smDirection: mapping({
    row: styles.smDirectionRow,
    column: styles.smDirectionColumn,
  }),

  mdDisplay: mapping({
    none: styles.mdDisplayNone,
    flex: styles.mdDisplayFlex,
    block: styles.mdDisplayBlock,
    inlineBlock: styles.mdDisplayInlineBlock,
    visuallyHidden: styles.mdDisplayVisuallyHidden,
  }),
  mdColumn: bind(range("mdCol"), styles),
  mdDirection: mapping({
    row: styles.mdDirectionRow,
    column: styles.mdDirectionColumn,
  }),

  lgDisplay: mapping({
    none: styles.lgDisplayNone,
    flex: styles.lgDisplayFlex,
    block: styles.lgDisplayBlock,
    inlineBlock: styles.lgDisplayInlineBlock,
    visuallyHidden: styles.lgDisplayVisuallyHidden,
  }),
  lgColumn: bind(range("lgCol"), styles),
  lgDirection: mapping({
    row: styles.lgDirectionRow,
    column: styles.lgDirectionColumn,
  }),

  alignContent: mapping({
    start: layout.contentStart,
    end: layout.contentEnd,
    center: layout.contentCenter,
    between: layout.contentBetween,
    around: layout.contentAround,
    evenly: layout.contentEvenly,
    // default: stretch
  }),
  alignItems: mapping({
    start: layout.itemsStart,
    end: layout.itemsEnd,
    center: layout.itemsCenter,
    baseline: layout.itemsBaseline,
    // default: stretch
  }),
  alignSelf: mapping({
    start: layout.selfStart,
    end: layout.selfEnd,
    center: layout.selfCenter,
    baseline: layout.selfBaseline,
    stretch: layout.selfStretch,
    // default: auto
  }),
  bottom: toggle(layout.bottom0),
  borderSize: (value: string) =>
    concat([
      mapping({
        sm: borders.sizeSm,
        lg: borders.sizeLg,
        // default: none
      })(value),
      fromClassName(borders.solid), // fromClassName(colors.lightGrayBorder),
    ]),
  borderColor: COLOR_MAPPING,
  color: COLOR_MAPPING,
  fit: toggle(layout.fit),
  flex: mapping({
    grow: layout.flexGrow,
    none: layout.flexNone,
    // default: shrink
  }),
  height: (height: number) => fromInlineStyle({height}),
  justifyContent: mapping({
    end: layout.justifyEnd,
    center: layout.justifyCenter,
    between: layout.justifyBetween,
    around: layout.justifyAround,
    evenly: layout.justifyEvenly,
    // default: start
  }),
  left: toggle(layout.left0),
  marginStart,
  marginEnd,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  smMargin,
  smMarginTop,
  smMarginRight,
  smMarginBottom,
  smMarginLeft,
  mdMargin,
  mdMarginTop,
  mdMarginRight,
  mdMarginBottom,
  mdMarginLeft,
  lgMargin,
  lgMarginTop,
  lgMarginRight,
  lgMarginBottom,
  lgMarginLeft,
  maxHeight: (maxHeight: number) => fromInlineStyle({maxHeight}),
  maxWidth: (maxWidth: number) => fromInlineStyle({maxWidth}),
  minHeight: (minHeight: number) => fromInlineStyle({minHeight}),
  minWidth: (minWidth: number) => fromInlineStyle({minWidth}),
  opacity,
  overflow: mapping({
    hidden: layout.overflowHidden,
    scroll: layout.overflowScroll,
    auto: layout.overflowAuto,
    scrollX: layout.overflowScrollX,
    scrollY: layout.overflowScrollY,
    // default: visible
  }),
  padding,
  paddingX,
  paddingY,
  smPadding,
  smPaddingX,
  smPaddingY,
  mdPadding,
  mdPaddingX,
  mdPaddingY,
  lgPadding,
  lgPaddingX,
  lgPaddingY,
  position: mapping({
    absolute: layout.absolute,
    relative: layout.relative,
    fixed: layout.fixed,
    // default: static
  }),
  right: toggle(layout.right0),
  rounding,
  top: toggle(layout.top0),
  width: (width: number) => fromInlineStyle({width}),
  wrap: toggle(layout.flexWrap),
  dangerouslySetInlineStyle: (value: any) =>
    /* eslint-disable-next-line no-underscore-dangle */
    value && value.__style ? fromInlineStyle(value.__style) : identity(),
};

/*

# The Component

*/
const contains = (key: string, arr: any[]) => arr.indexOf(key) >= 0;
const omit = (keys: string[], obj: any) =>
  Object.keys(obj).reduce((acc, k: string) => {
    if (contains(k, keys)) {
      return acc;
    }
    return {
      ...acc,
      [k]: obj[k],
    };
  }, {});

// Box is a "pass-through" component, meaning that if you pass properties to it
// that it doesn't know about (`aria-label` for instance) it passes directly
// back to the underlying `<div/>`.
const blacklistProps: any[] = [];

const Box = React.forwardRef(({children, ...props}: BoxProps, ref: any) => {
  // Flow can't reason about the constant nature of Object.keys so we can't use
  // a functional (reduce) style here.

  // All Box's are box-sized by default, so we start off building up the styles
  // to be applied with a Box base class.
  let s = fromClassName(styles.box);

  // Init the list of props we'll omit from passthrough. We'll add to this
  // list as we match props against the transforms list.
  const omitProps = [...blacklistProps];

  // This loops through each property and if it exists in the previously
  // defined transform map, concatentes the resulting styles to the base
  // styles. If there's a match, we also don't pass through that property. This
  // means Box's runtime is only dependent on the number of properties passed
  // to it (which is typically small) instead of the total number of possible
  // properties (~30 or so). While it may ~feel~ like Box is innefficient, its
  // biggest performance impact is on startup time because there's so much code
  // here.

  for (const prop in props) {
    if (Object.prototype.hasOwnProperty.call(propToFn, prop)) {
      const fn = (propToFn as any)[prop];
      const value = (props as any)[prop];
      omitProps.push(prop);
      s = concat([s, fn(value)]);
    }
  }

  // Add any specified classnames. We should avoid this, but sometimes it's not possible.
  if ((props as any).className) {
    s.className.add((props as any).className);
  }

  // And... magic!
  // console.log("BOX", s);
  return (
    <div {...omit(omitProps, props)} {...toProps(s)} ref={ref}>
      {children}
    </div>
  );
});

//  NOTE: This is needed in order to override the ForwardRef display name that is
//  used in dev tools and in snapshot testing.
Box.displayName = "Box";

export default Box;