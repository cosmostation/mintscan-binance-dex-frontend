import React from "react";
import cn from "classnames/bind";
import styles from "./HeaderWrapper.scss";
const cx = cn.bind(styles);

export default function(props) {
	return <div className={cx("headerWrapper")}>{props.children}</div>;
}
