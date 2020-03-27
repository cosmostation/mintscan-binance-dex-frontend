import React from "react";
import cn from "classnames/bind";
import styles from "./Spinner.scss";

const cx = cn.bind(styles);

const spinSVG = process.env.PUBLIC_URL + "/assets/icons/common/spin.svg";

export default function Spinner(props) {
	return (
		<div className={cx("spinner-wrapper")}>
			<img className={cx("spinner")} src={spinSVG} alt={"SPIN ME ROUND"} />
		</div>
	);
}
