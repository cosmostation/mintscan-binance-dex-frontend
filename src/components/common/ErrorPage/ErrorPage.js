import * as React from "react";
import cn from "classnames/bind";
import styles from "./ErrorPage.scss";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("ErrorPage-wrapper")}>
			<div>Some error has occurred</div>
			<div>OH NOES</div>
			<div>Try refreshing the page</div>
			<div>if it still doesn't work, contact admin</div>
		</div>
	);
}
