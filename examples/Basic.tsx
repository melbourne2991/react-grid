import * as React from "react";
import { Layout } from "../src";

const { Grid, Row, Col } = Layout();

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

const gutters = 20;

const units = {
  type: "px",
  ratio: 1
};

const Box = () => (
  <div
    style={{
      background: "#000",
      marginBottom: "20px",
      width: "100%",
      minHeight: "30px"
    }}
  />
);

export const BasicExample: React.SFC<{}> = () => {
  return (
    <Grid
      columns={12}
      units={units}
      breakpoints={breakpoints}
      gutters={gutters}
    >
      <Row>
        <Col span={6}>
          <Box />
        </Col>

        <Col span={6}>
          <Box />
        </Col>
      </Row>
    </Grid>
  );
};
