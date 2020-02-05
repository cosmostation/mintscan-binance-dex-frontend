import React from "react";
import classNames from "classnames/bind";
import styles from "./App.scss";

//redux
//  import redux stuff

//  components
import Router from "src/containers/Router/Router";
import Header from "src/containers/Header";
import Footer from "src/containers/Footer";

const cx = classNames.bind(styles);

export default function() {
	return (
		<div className={cx("App")}>
			<Header />
			<Router />
			<Footer />
		</div>
	);
}
