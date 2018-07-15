import { Grid } from "./Grid";
import { Container } from "./Container";
import { Col } from "./Col";
import { Row } from "./Row";
import { defaultProps } from "recompose";

import {
  GridProps,
  ContainerProps,
  ColProps,
  RowProps,
  BreakpointConfig,
  BreakpointMap,
  UnitConfig
} from "./types";

interface LayoutDefaults<T extends { [breakpointName: string]: number }> {
  breakpoints: BreakpointMap<number, T>;
  gutters: BreakpointConfig<number, T>;
  columns: number;
  units: UnitConfig;
  widths: BreakpointConfig<number | "fluid", T>;
}

// Well that's what they are :/
const defaultDefaults: LayoutDefaults<{
  sm: 576;
  md: 768;
  lg: 992;
  xl: 1200;
}> = {
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },

  widths: {
    default: "fluid",
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },

  columns: 12,
  gutters: 20,
  units: {
    type: "px",
    ratio: 1
  }
};

export function Layout<T extends { [breakpointName: string]: number }>(
  defaults = defaultDefaults
) {
  const mergedDefaults: LayoutDefaults<T> = {
    ...defaultDefaults,
    ...defaults
  } as LayoutDefaults<T>;

  const GridWithDefaults = defaultProps({
    columns: mergedDefaults.columns,
    units: mergedDefaults.units,
    breakpoints: mergedDefaults.breakpoints,
    gutters: mergedDefaults.gutters
  } as Partial<GridProps>)(Grid);

  const ContainerWithDefaults = defaultProps({
    widths: mergedDefaults.widths,
    units: mergedDefaults.units,
    gutters: mergedDefaults.gutters,
    breakpoints: mergedDefaults.breakpoints
  } as Partial<ContainerProps>)(Container);

  return {
    Grid: GridWithDefaults,
    Container: ContainerWithDefaults,
    Col,
    Row
  } as {
    Grid: React.ComponentType<GridProps<T>>;
    Container: React.ComponentType<ContainerProps<T>>;
    Col: React.ComponentType<ColProps<T>>;
    Row: React.ComponentType<RowProps<T>>;
  };
}
