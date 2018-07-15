import * as React from "react";
import { GridProps } from "./types";
import { GridContext } from "./Context";
import { css } from "emotion";

export const Grid: React.SFC<GridProps> = ({
  gutters,
  columns,
  breakpoints,
  units,
  children
}) => {
  return (
    <GridContext.Provider
      value={{
        gutters: gutters,
        columns: columns,
        breakpoints: breakpoints,
        units: units
      }}
    >
      <div className={css({ boxSizing: "border-box" })}>{children}</div>
    </GridContext.Provider>
  );
};
