import React from "react";
import cn from "classnames/bind";
import styles from "./Decimal.scss";

const cx = cn.bind(styles);

export default function Decimal({value = "0.000000", fontSizeBase = 11}) {
	const split = value.split(".");
	return (
		<div className={cx("DecimalDisplay")} style={{fontSize: `${fontSizeBase}px`}}>
			{split[0]}.
			<p className={cx("decimal")} style={{fontSize: `${fontSizeBase - 3}px`}}>
				{split[1]}
			</p>
		</div>
	);
}
