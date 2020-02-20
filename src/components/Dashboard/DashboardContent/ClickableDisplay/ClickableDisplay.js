import React from "react";
import cn from "classnames/bind";
import styles from "./ClickableDisplay.scss";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("ClickableDisplay")}>
			ClickableDisplay
			<div>testtest</div>
		</div>
	);
}
