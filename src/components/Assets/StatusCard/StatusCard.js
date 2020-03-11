import React from "react";
import styles from "./StatusCard.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const symbolNoneSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";
const upSVG = process.env.PUBLIC_URL + "/assets/assets/up_gr.svg";

export default function(props) {
	return (
		<div className={cx("statuscard-wrapper")}>
			<div className={cx("wrapper")}>
				<div className={cx("asset-graph-wrapper")}>
					<div className={cx("asset")}>
						<img src={props.symbol ? props.symbol : symbolNoneSVG} alt={"none"} />
						<div className={cx("name")}>{props.name ? props.name : "USDSB"}</div>
					</div>
					<div className={cx("graph-wrapper")}>graph area</div>
				</div>
				<div className={cx("price-percentage-wrapper")}>
					<div className={cx("price")}>
						<span>$ 1.</span>2039410
					</div>
					<div className={cx("percentage")}>
						<img src={upSVG} alt='direc' />
						9.17% (24h)
					</div>
				</div>
				<div className={cx("market-cap")}>Market Cap : $ 90,356,251,500</div>
			</div>
		</div>
	);
}
