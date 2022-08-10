import Ad from "src/components/Ad";
import BlocksDisplay from "./BlocksDisplay";
//  components
import GraphDisplay from "./GraphDisplay";
import PriceDisplay from "./PriceDisplay";
import React from "react";
import TxDisplay from "./TxDisplay";
import {_} from "src/lib/scripts";
import cn from "classnames/bind";
import dexSVG from "src/assets/dashboard/dex_ic.svg";
//  assets
import exchangeSVG from "src/assets/dashboard/exchange_ic.svg";
import jexSVG from "src/assets/dashboard/jex_ic.svg";
import launchpadSVG from "src/assets/dashboard/launchpad_ic.svg";
import styles from "./DashboardContent.scss";

const cx = cn.bind(styles);

const cardData = Object.freeze([
	{
		svg: exchangeSVG,
		title: "Exchange",
		content: "Blockchain and crypto asset exchange",
		link: "https://accounts.binance.com/en/register?ref=39076268",
	},
	{
		svg: dexSVG,
		title: "Binance DEX",
		content: "decentralized digital asset exchange",
		link: "https://www.binance.org/en/trade/",
	},
	{
		svg: jexSVG,
		title: "Binance JEX",
		content: "Bitcoin futures & Crypto options",
		link: "https://www.jex.com/",
	},
	{
		svg: launchpadSVG,
		title: "Launchpad",
		content: "Token launch platform",
		link: "https://launchpad.binance.com/",
	},
]);

export default function(props) {
	return (
		<div className={cx("DashboardContent-wrapper")}>
			<div className={cx("PriceGraphClickable-wrapper")}>
				<div className={cx("Card", "PriceGraph-wrapper")}>
					<PriceDisplay />
					<GraphDisplay />
					<LinkCardInside />
				</div>
				<LinkCard />
			</div>
			<Ad />
			<div className={cx("BlockTx-wrapper")}>
				<BlocksDisplay />
				<div className={cx("CardFixed")}>
					<TxDisplay />
				</div>
			</div>
		</div>
	);
}

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

const LinkCardInside = () => (
	<ul className={cx("LinkWrapperInside")}>
		{_.map(cardData, (data, i) => (
			<DashboardCard key={i} {...data} />
		))}
	</ul>
);
