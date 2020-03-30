import React from "react";
import styles from "./NotFound.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const notFoundImg = process.env.PUBLIC_URL + "/assets/misc/404_img.svg";

const NotFound = ({altText = "Sorry! Page Not Found"}) => (
	<div className={cx("notFound_wrapper")}>
		<img src={notFoundImg} alt='not found' />
		<h2>{altText}</h2>
	</div>
);

export default NotFound;
