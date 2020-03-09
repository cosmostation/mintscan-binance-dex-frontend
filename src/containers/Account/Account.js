import * as React from "react";
import cn from "classnames/bind";
import style from "./Account.scss";

const cx = cn.bind(style);

export default function Account(props) {
	return (
		<div className={cx("Account-wrapper")}>
			working...
			<div>params - {props.match.params.account}</div>
		</div>
	);
}
