import React from "react";
import classNames from "classnames/bind";
import styles from "./App.scss";

//redux
//  import redux stuff

//  components
import Header from "./components/Header";

const cx = classNames.bind(styles);

export default function() {
	return (
		<div className={cx("App")}>
			<Header />
		</div>
	);
}
