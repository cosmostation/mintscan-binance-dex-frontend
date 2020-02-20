import React from "react";
import cn from "classnames/bind";
import styles from "./templateComp.scss";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("templateComp")}>
			templateComp
			<div>testtest</div>
		</div>
	);
}
