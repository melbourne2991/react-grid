import * as React from "react";
import { GridContextValue, GridContextProps } from "./types";

export const GridContext = React.createContext<GridContextValue>(
  {} as GridContextValue
);

export function withGridContext<P>(
  Component: React.ComponentType<P & GridContextProps>
): React.SFC<P> {
  return (props: P) => {
    return (
      <GridContext.Consumer>
        {(value: GridContextValue) => <Component grid={value} {...props} />}
      </GridContext.Consumer>
    );
  };
}
