import React from "react";
import classNames from "classnames/bind";

import styles from "./Loading.scss";
import spinSVG from "src/assets/common/spin.svg";

const cx = classNames.bind(styles);

const Loading = () => (
	<div className={cx("loading-wrapper")}>
		<img className={cx("loading-img")} src={spinSVG} alt='loading' />
	</div>
);

export default Loading;
