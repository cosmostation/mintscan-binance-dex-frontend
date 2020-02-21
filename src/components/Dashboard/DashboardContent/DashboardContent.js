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
				<ul className={cx("LinkWrapper")}>
					<li>a</li>
					<li>b</li>
					<li>c</li>
					<li>d</li>
				</ul>
			</div>
			<div className={cx("BlockTx-wrapper")}>
				<div className={cx("CardFixed")}>asdf</div>
				<div className={cx("CardFixed")}>asdf</div>
			</div>
		</div>
	);
}

const cardData = Object.freeze([
	{
		svg: process.env.PUBLIC_URL + "/assets/dashboard/exchange_ic.svg",
		title: "Exchange",
		content: "Blockchain and crypto asset exchange",
	},
	{
		svg: process.env.PUBLIC_URL + "/assets/dashboard/dex_ic.svg",
		title: "Binance DEX",
		content: "decentralized digital asset exchange",
	},
	{
		svg: process.env.PUBLIC_URL + "/assets/dashboard/academy_ic.svg",
		title: "Academy",
		content: "Blockchain and crypto education",
	},
	{
		svg: process.env.PUBLIC_URL + "/assets/dashboard/launchpad_ic.svg",
		title: "Launchpad",
		content: "Token launch platform",
	},
]);

const DashboardCard = ({svg, title, content}) => <li className={cx("DashboardCard-wrapper")}></li>;
