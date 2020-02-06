import React from "react";
import classNames from "classnames/bind";

import styles from "./Loading.scss";
import loading from "./loading_bk.gif";

const cx = classNames.bind(styles);

const Loading = () => (
	<div className={cx("loading-wrapper")}>
		<img className={cx("loading-img")} src={loading} alt='loading' />
	</div>
);

export default Loading;
