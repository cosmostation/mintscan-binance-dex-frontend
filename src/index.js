import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import Root from "./Root";
//  base styles
import "./styles/base.scss";

console.log(process.env);
ReactDOM.render(<Root />, document.getElementById("root"));

ReactGA.initialize("something");
ReactGA.pageview("/dashboard");
