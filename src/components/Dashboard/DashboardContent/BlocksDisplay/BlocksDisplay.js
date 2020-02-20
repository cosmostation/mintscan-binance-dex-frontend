import React from "react";
import cn from "classnames/bind";
import styles from "./BlocksDisplay.scss";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("BlocksDisplay")}>
			BlocksDisplay
			<div>testtest</div>
		</div>
	);
}
