import React from "react";
import ReactDOM from "react-dom";
import cn from "classnames/bind";
import styles from "./Portal.scss";

const cx = cn.bind(styles);

export default function({children, show = false}) {
	return ReactDOM.createPortal(<div className={cx("modal", {invisible: show})}>{children}</div>, document.getElementById("root"));
}
