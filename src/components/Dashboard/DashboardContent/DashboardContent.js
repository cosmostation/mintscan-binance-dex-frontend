import React from "react";
import cn from "classnames/bind";
import styles from "./DashboardContent.scss";

//  components
import GraphDisplay from "./GraphDisplay";
import PriceDisplay from "./PriceDisplay";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("DashboardContent-wrapper")}>
			<div className={cx("PriceGraphClickable-wrapper")}>
				<div className={cx("Card", "PriceGraph-wrapper")}>
					<PriceDisplay />
					<GraphDisplay />
				</div>
				<div className={cx("CardFixed")}>asdf</div>
			</div>
			<div className={cx("BlockTx-wrapper")}>
				<div className={cx("CardFixed")}>asdf</div>
				<div className={cx("CardFixed")}>asdf</div>
			</div>
		</div>
	);
}
