import * as React from "react";
import { GridContextProps, ApplyBreakpointStyleParam, ColProps } from "./types";
import { applyBreakpointStyles, getBreakpointConfig, borderBox } from "./util";
import { css } from "emotion";
import { withGridContext } from "./Context";
import { CSSObject } from "create-emotion";

const ColComponent: React.SFC<GridContextProps & ColProps> = ({
  span = "auto",
  grid,
  offset,
  children
}: ColProps & GridContextProps) => {
  const breakpointSpanSizes = getBreakpointConfig(span);
  const breakpointGutterSizes = getBreakpointConfig(grid.gutters);

  const styles: CSSObject = {
    boxSizing: "border-box"
  };

  const breakpointStyles: ApplyBreakpointStyleParam<number | "auto">[] = [
    {
      config: breakpointSpanSizes,
      applyStyles: (spanSize: number | "auto") => {
        const width =
          spanSize === "auto" ? "auto" : getWidth(spanSize, grid.columns);

        return {
          width,
          flexBasis: width
        };
      }
    },

    {
      config: breakpointGutterSizes,
      applyStyles: gutterSize => {
        const halfGutterSize = ((gutterSize as number) * grid.units.ratio) / 2;

        return {
          paddingLeft: `${halfGutterSize}${grid.units.type}`,
          paddingRight: `${halfGutterSize}${grid.units.type}`
        };
      }
    }
  ];

  if (offset) {
    const offsetSizes = getBreakpointConfig(offset);

    breakpointStyles.push({
      config: offsetSizes,
      applyStyles(offsetSize) {
        return {
          marginLeft: getWidth(offsetSize as number, grid.columns)
        };
      }
    });
  }

  applyBreakpointStyles<number | "auto">(
    styles,
    grid.breakpoints,
    ...breakpointStyles
  );

  return (
    <div className={css(styles)} {...borderBox}>
      {children}
    </div>
  );
};

function getWidth(span: number, columns: number) {
  return `${(span / columns) * 100}%`;
}

export const Col = withGridContext(ColComponent);
