import React from "react";
import cn from "classnames/bind";
import styles from "./Address.scss";

const cx = cn.bind(styles);

export default function Address(props) {
	return (
		<div className={cx("Address-wrapper")}>
			Address related
		</div>
	)
}