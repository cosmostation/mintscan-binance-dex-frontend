import React from "react";
import styles from "./NotFound.scss";
import classNames from "classnames/bind";

import notFoundImg from "src/assets/misc/404_img.svg";

const cx = classNames.bind(styles);

const NotFound = ({altText = "Sorry! Page Not Found"}) => {
	return (
		<div className={cx("notFound_wrapper")}>
			<img src={notFoundImg} alt='not found' />
			<h2>{altText}</h2>
		</div>
	);
};

export default NotFound;
