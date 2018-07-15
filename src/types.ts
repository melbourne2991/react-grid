import { CSSProperties } from "react";

export interface UnitConfig {
  ratio: number;
  type: string;
}

export type BreakpointThresholds = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type BreakpointThreshold = keyof BreakpointThresholds;

export type BreakpointMap<T = number, Thresholds = BreakpointThresholds> = {
  [K in keyof Thresholds]?: T
};

export type BreakpointMapWithDefault<
  T,
  BPT = BreakpointThresholds
> = BreakpointMap<T, BPT> & {
  default: T;
};

export type BreakpointConfig<T, BPT = BreakpointThresholds> =
  | T
  | BreakpointMapWithDefault<T, BPT>;

export interface GridContextValue {
  breakpoints: Partial<BreakpointMap>;
  columns: number;
  gutters: BreakpointConfig<number>;
  units: UnitConfig;
}

export interface GridProps<BPT = BreakpointThresholds> {
  children: React.ReactElement<RowProps> | React.ReactElement<RowProps>[];
  breakpoints: BreakpointMap<number, BPT>;
  columns: number;
  gutters: BreakpointConfig<number, BPT>;
  units: UnitConfig;
}

export interface ColProps<BPT = BreakpointThresholds> {
  span?: BreakpointConfig<number | "auto", BPT>;
  offset?: BreakpointConfig<number>;
  children: React.ReactNode;
  className?: string;
}

export interface RowProps<BPT = BreakpointThresholds> {
  className?: string;
  children:
    | React.ReactElement<ColProps<BPT>>
    | React.ReactElement<ColProps<BPT>>[];
}

export interface GridContextProps {
  grid: GridContextValue;
}

export interface ContainerProps<BPT = BreakpointThresholds> {
  children: React.ReactNode;
  widths: BreakpointConfig<number | "fluid", BPT>;
  units: UnitConfig;
  gutters: BreakpointConfig<number, BPT>;
  breakpoints: Partial<BreakpointMap<number, BPT>>;
  className?: string;
}

export interface ApplyBreakpointStyleParam<T = number> {
  config: BreakpointMapWithDefault<T>;
  applyStyles: (value: T) => CSSProperties;
}
