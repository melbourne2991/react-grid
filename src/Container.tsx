import * as React from "react";
import { ContainerProps } from "./types";
import { getBreakpointConfig, applyBreakpointStyles } from "./util";
import { css } from "emotion";
import { CSSObject } from "create-emotion";

export const Container: React.SFC<ContainerProps> = ({
  widths,
  gutters,
  units,
  breakpoints,
  ...props
}) => {
  const styles: CSSObject = {
    display: "block",
    margin: "0 auto",
    boxSizing: "border-box"
  };

  const containerWidths = getBreakpointConfig(widths);
  const breakpointGutterSizes = getBreakpointConfig(gutters);

  applyBreakpointStyles(
    styles,
    breakpoints,
    {
      config: containerWidths,
      applyStyles: (width: number | "fluid") => {
        let maxWidth;

        if (width === "fluid") {
          maxWidth = "100%";
        } else {
          maxWidth = `${width * units.ratio}${units.type}`;
        }

        return {
          maxWidth
        };
      }
    },
    {
      config: breakpointGutterSizes,
      applyStyles: gutterSize => {
        const halfGutterSize = ((gutterSize as number) * units.ratio) / 2;

        return {
          paddingLeft: `${halfGutterSize}${units.type}`,
          paddingRight: `${halfGutterSize}${units.type}`
        };
      }
    }
  );

  return <div className={css(styles)} {...props} />;
};
