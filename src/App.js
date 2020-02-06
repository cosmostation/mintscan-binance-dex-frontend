import React from "react";
import classNames from "classnames/bind";
import styles from "./App.scss";
import {Helmet} from "react-helmet";

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
			<Helmet>
				<meta charSet='utf-8' />
				<meta name='description' content='Mintscan binance explorer' />
				<title>Mintscan, By Cosmostation</title>
			</Helmet>
			<Header />
			<Router />
			<Footer />
		</div>
	);
}
