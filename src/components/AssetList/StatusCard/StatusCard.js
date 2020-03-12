import React from "react";
import styles from "./StatusCard.scss";
import classNames from "classnames/bind";
import {formatNumber} from "src/lib/scripts";

const cx = classNames.bind(styles);

const symbolNoneSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";
const upSVG = process.env.PUBLIC_URL + "/assets/assets/up_gr.svg";

export default function({asset}) {
	const splitPrice = asset?.price ? formatNumber(asset.price).split(".") : ["0", "00000"];
	return (
		<div className={cx("statuscard-wrapper")}>
			<div className={cx("wrapper")}>
				<div className={cx("asset-graph-wrapper")}>
					<div className={cx("asset")}>
						<img src={asset?.assetImg ? asset?.assetImg : symbolNoneSVG} alt={"none"} />
						<div className={cx("name")}>{asset?.name ? asset.name : "-"}</div>
					</div>
					<div className={cx("graph-wrapper")}>graph area</div>
				</div>
				<div className={cx("price-percentage-wrapper")}>
					<div className={cx("price")}>
						<span>$ {splitPrice[0]}.</span>
						{splitPrice[1]}
					</div>
					<div className={cx("percentage")}>
						<img src={upSVG} alt='direc' />
						9.17% (24h)
					</div>
				</div>
				<div className={cx("market-cap")}>Market Cap : $ {formatNumber(asset?.marketCap)}</div>
			</div>
		</div>
	);
}
