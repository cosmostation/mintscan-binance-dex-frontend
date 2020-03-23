import React from "react";
import cn from "classnames/bind";
import styles from "./Decimal.scss";
import {formatNumber} from "src/lib/scripts";

const cx = cn.bind(styles);

export default function Decimal({value = "0.000000", fontSizeBase = 11, bottom = 1}) {
	const split = value.split(".");
	return (
		<div className={cx("DecimalDisplay")} style={{fontSize: `${fontSizeBase}px`}}>
			{formatNumber(split[0])}.
			<span className={cx("decimal")} style={{fontSize: `${fontSizeBase - 3}px`, bottom: `${bottom}px`}}>
				{split[1]}
			</span>
		</div>
	);
}
