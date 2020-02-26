import * as React from "react";
import cn from "classnames/bind";
import styles from "./BlockHeader.scss";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("BlockDetail-wrapper")}>
			<div className={cx("title")}>asdf</div>
		</div>
	);
}
