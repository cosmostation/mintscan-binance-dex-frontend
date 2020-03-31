import React from "react";
import cn from "classnames/bind";
import styles from "./Spinner.scss";

import spinSVG from "src/assets/common/spin.svg";

const cx = cn.bind(styles);

export default function Spinner({styles}) {
	return (
		<div className={cx("spinner-wrapper")} style={styles}>
			<img className={cx("spinner")} src={spinSVG} alt={"SPIN ME ROUND"} />
		</div>
	);
}
