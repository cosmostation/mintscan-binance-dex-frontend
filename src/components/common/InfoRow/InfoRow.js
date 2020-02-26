import * as React from "react";
import cn from "classnames/bind";
import styles from "./InfoRow.scss";

const cx = cn.bind(styles);

export default function({label, children}) {
	return (
		<ul className={cx("infoRow-grid")}>
			<li className={cx("label")}>{label}</li>
			<li className={cx("value")}>{children}</li>
		</ul>
	);
}
