import React from "react";
import cn from "classnames/bind";
import styles from "./DashboardContent.scss";
import {_} from "src/lib/scripts";
//  components
import GraphDisplay from "./GraphDisplay";
import PriceDisplay from "./PriceDisplay";
import BlocksDisplay from "./BlocksDisplay";
import TxDisplay from "./TxDisplay";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("DashboardContent-wrapper")}>
			<div className={cx("PriceGraphClickable-wrapper")}>
				<div className={cx("Card", "PriceGraph-wrapper")}>
					<PriceDisplay />
					<GraphDisplay />
				</div>
				<LinkCard />
			</div>
			<div className={cx("BlockTx-wrapper")}>
				<BlocksDisplay />
				<div className={cx("CardFixed")}>
					<TxDisplay />
				</div>
			</div>
		</div>
	);
}

const cardData = Object.freeze([
	{
		svg: process.env.PUBLIC_URL + "/assets/dashboard/exchange_ic.svg",
		title: "Exchange",
		content: "Blockchain and crypto asset exchange",
		link: "https://www.binance.org/en/trade",
	},
	{
		svg: process.env.PUBLIC_URL + "/assets/dashboard/dex_ic.svg",
		title: "Binance DEX",
		content: "decentralized digital asset exchange",
		link: "https://www.binance.org/",
	},
	{
		svg: process.env.PUBLIC_URL + "/assets/dashboard/academy_ic.svg",
		title: "Academy",
		content: "Blockchain and crypto education",
		link: "https://www.binance.vision/",
	},
	{
		svg: process.env.PUBLIC_URL + "/assets/dashboard/launchpad_ic.svg",
		title: "Launchpad",
		content: "Token launch platform",
		link: "https://launchpad.binance.com/",
	},
]);

const DashboardCard = ({svg, title, content, link}) => (
	<li className={cx("DashboardCard-wrapper")} onClick={() => window.open(link, "_blank")}>
		<img src={svg} alt={"logo"} />
		<div className={cx("text-wrapper")}>
			<div className={cx("title")}>{title}</div>
			<p className={cx("content")}>{content}</p>
		</div>
	</li>
);

const LinkCard = () => (
	<ul className={cx("LinkWrapper")}>
		{_.map(cardData, (data, i) => (
			<DashboardCard key={i} {...data} />
		))}
	</ul>
);
