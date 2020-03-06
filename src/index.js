import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import * as serviceWorker from "./serviceWorker";

import Root from "./Root";
//  base styles
import "./styles/base.scss";

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();

ReactGA.initialize("something");
ReactGA.pageview("/dashboard");
