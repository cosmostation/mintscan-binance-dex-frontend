import React from "react";
import classNames from "classnames/bind";

import styles from "./Loading.scss";
// import loading from "./loading_bk.gif";

const cx = classNames.bind(styles);
const spinSVG = process.env.PUBLIC_URL + "/assets/icons/common/spin.svg";

const Loading = () => (
	<div className={cx("loading-wrapper")}>
		<img className={cx("loading-img")} src={spinSVG} alt='loading' />
	</div>
);

export default Loading;
