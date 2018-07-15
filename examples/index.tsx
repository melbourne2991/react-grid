import * as React from "react";
import { render } from "react-dom";
import { BasicExample } from "./Basic";

const root = document.createElement("div");
document.body.appendChild(root);

render(<BasicExample />, root);
