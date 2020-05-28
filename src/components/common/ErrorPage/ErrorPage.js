import * as React from "react";
import cn from "classnames/bind";
import styles from "./ErrorPage.scss";

import errorSVG from "src/assets/misc/error_ic.svg";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("ErrorPage-wrapper")}>
			<img src={errorSVG} alt='error' />
			<div>Some error has occurred, try refreshing the page</div>
			<div>If the error persists, contact admin</div>
		</div>
	);
}
