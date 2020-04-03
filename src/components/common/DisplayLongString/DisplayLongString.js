import React from "react";
import cn from "classnames/bind";
import styles from "./DisplayLongString.scss";

const cx = cn.bind(styles);

const CUT_DISPLAY = 12;

export default function({inputString = "", long = false, displayThresh = CUT_DISPLAY}) {
	return (
		<span className={cx({"DisplayExtraLongString-wrapper": long, "DisplayLongString-wrapper": !long})}>
			<span className={cx("front")}>{inputString.substr(0, displayThresh)}</span>
			<span className={cx("middle")}>{inputString.substr(displayThresh, inputString.length - displayThresh * 2)}</span>
			<span>{inputString.substr(inputString.length - displayThresh, inputString.length)}</span>
		</span>
	);
}
