// Originally based on https://github.com/pinterest/gestalt
// Forked, updated to Typescript, and added features.
import * as React from "react";
import borders from "./Borders.module.css";
import styles from "./Box.module.css";
import whitespace from "./boxWhitespace.module.css";
import colors from "./Colors.module.css";
import {BoxProps, Rounding, Margin} from "./Common";
import layout from "./Layout.module.css";
import {Unifier} from "./Unifier";
import {
  bind,
  concat,
  fromClassName,
  fromInlineStyle,
  identity,
  mapClassName,
  mapping,
  mergeInlineStyles,
  range,
  rangeWithoutZero,
  Style,
  toggle,
  toProps,
  union,
} from "./Utilities";

export class Box extends React.Component<BoxProps, {}> {
  isBottom(el: any) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  render() {
    const {onClick, shadow, avoidKeyboard, ...props} = this.props;
    if (props.scroll) {
      props.overflow = "scrollY";
    }
    let rounding: "pill" | "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined = undefined;
    if (this.props.shape === "pill") {
      rounding = "pill";
    } else if (this.props.shape === "circle") {
      rounding = "circle";
    } else if (this.props.shape === "rounded") {
      rounding = 3;
    }

    let body = (
      <GestaltBox
        {...props}
        display={props.display || "flex"} // Default to flexbox to more closely match React Native
        direction={props.direction || "column"}
        onClick={() => {
          // Unifier.utils.haptic();
          onClick && onClick();
        }}
        color={this.props.color}
        rounding={rounding}
        dangerouslySetInlineStyle={mergeInlineStyles(this.props.dangerouslySetInlineStyle, {
          cursor: this.props.onClick ? "pointer" : undefined,
          boxShadow: shadow ? "0px 3px 8px rgba(0, 0, 0, 0.5)" : undefined,
          borderWidth: this.props.border ? 2 : undefined,
          borderColor: this.props.border ? Unifier.theme[this.props.border] : undefined,
          borderStyle: this.props.border ? "solid" : undefined,
          borderRadius:
            this.props.border && typeof rounding === "number" ? rounding * 4 : undefined,
        })}
      >
        {this.props.children}
      </GestaltBox>
    );

    return body;
  }
}

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

const GestaltBox = React.forwardRef(({children, ...props}: BoxProps, ref: any) => {
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
      const fn = propToFn[prop];
      const value = props[prop];
      omitProps.push(prop);
      s = concat([s, fn(value)]);
    }
  }

  // Add any specified classnames. We should avoid this, but sometimes it's not possible.
  if (props.className) {
    s.className.add(props.className);
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
GestaltBox.displayName = "Box";
