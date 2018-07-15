import { css } from "emotion";

import {
  BreakpointMapWithDefault,
  BreakpointConfig,
  BreakpointMap,
  ApplyBreakpointStyleParam
} from "./types";

// import isObject = require("lodash");

export function getBreakpointKey(breakpoints: BreakpointMap, name: string) {
  return `@media(min-width: ${breakpoints[name]}px)`;
}

export function getBreakpointConfig<T>(
  config: BreakpointConfig<T>
): BreakpointMapWithDefault<T> {
  if (typeof config === "object") {
    return config as BreakpointMapWithDefault<T>;
  } else {
    return {
      default: config as T
    };
  }
}

export function applyBreakpointStyles<T>(
  styles: {},
  breakpoints: BreakpointMap,
  ...params: ApplyBreakpointStyleParam<T>[]
) {
  // Breakpoint keys with default
  const breakpointNames = [...Object.keys(breakpoints), "default"];

  breakpointNames.forEach(breakpointName => {
    params.forEach(param => {
      const value = param.config[breakpointName];

      // If default apply to root of style object
      if (value && breakpointName === "default") {
        return Object.assign(styles, param.applyStyles(value));
      }

      // Else merge with breakpoint object eg: 'media(min-width: $breakpointValue)'
      if (value) {
        const breakpointKey = getBreakpointKey(breakpoints, breakpointName);
        styles[breakpointKey] = styles[breakpointKey] || {};
        return Object.assign(styles[breakpointKey], param.applyStyles(value));
      }
    });
  });

  return styles;
}

export const borderBox = css({
  boxSizing: "border-box"
});
