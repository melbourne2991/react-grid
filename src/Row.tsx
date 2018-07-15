import * as React from "react";
import { RowProps, GridContextProps } from "./types";
import { applyBreakpointStyles, getBreakpointConfig } from "./util";
import { withGridContext } from "./Context";
import { css } from "emotion";
import { CSSObject } from "create-emotion";

const RowComponent: React.SFC<RowProps & GridContextProps> = ({
  grid,
  children,
  className = ""
}) => {
  const styles: CSSObject = {
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    width: "auto"
  };

  const breakpointGutterSizes = getBreakpointConfig(grid.gutters);

  applyBreakpointStyles(
    styles,
    grid.breakpoints,

    {
      config: breakpointGutterSizes,
      applyStyles: gutterSize => {
        const halfGutterSize = (gutterSize * grid.units.ratio) / 2;

        return {
          marginLeft: `-${halfGutterSize}${grid.units.type}`,
          marginRight: `-${halfGutterSize}${grid.units.type}`
        };
      }
    }
  );

  return <div className={`${css(styles)} ${className}`} children={children} />;
};

export const Row = withGridContext(RowComponent);
