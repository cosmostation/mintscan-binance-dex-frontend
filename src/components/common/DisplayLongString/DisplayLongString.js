import React from "react";
import cn from "classnames/bind";
import styles from "./DisplayLongString.scss";

const cx = cn.bind(styles);

const CUT_DISPLAY = 12;

export default function({inputString = "", long = false, displayThresh = CUT_DISPLAY, medium = false}) {
	return (
		<span className={cx({"DisplayMedium-wrapper": medium, "DisplayExtraLongString-wrapper": !medium && long, "DisplayLongString-wrapper": !medium && !long})}>
			<span className={cx("front")}>{inputString.substr(0, displayThresh)}</span>
			<span className={cx("middle")}>{inputString.substr(displayThresh, inputString.length - displayThresh * 2)}</span>
			<span>{inputString.substr(inputString.length - displayThresh, inputString.length)}</span>
		</span>
	);
}
