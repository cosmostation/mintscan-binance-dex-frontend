import * as React from "react";
import cn from "classnames/bind";
import style from "./Details.scss";

import {useHistory} from "src/hooks";
//  utils
import {_, empty, formatNumber, refineAddress} from "src/lib/scripts";
import {fixed} from "src/lib/Big";
//  components
import InfoRow from "src/components/common/InfoRow";
import Skeleton from "react-skeleton-loader";
import DisplayIcon from "src/components/common/DisplayIcon";

import symbolNoneSVG from "src/assets/transactions/symbol_none.svg";

const cx = cn.bind(style);

export default function Details({asset}) {
	const history = useHistory();
	const mediaList = React.useMemo(() => {
		if (empty(asset.mediaList)) return;
		const ret = {};
		_.each(asset.mediaList, v => {
			if (v.mediaName !== "Binance Info") ret[v.mediaName] = v.mediaUrl;
			else ret.Info = v.mediaUrl;
		});
		if (asset.contactEmail !== "@" && asset.contactEmail?.length >= 5) _.assign(ret, {email: asset.contactEmail});
		return ret;
	}, [asset]);

	const formattedPrice = !_.isNil(asset.price) ? formatNumber(fixed(asset.price, 6)).split(".") : undefined;
	const clickLink = link => window.open(link, "__blank");
	return (
		<div className={cx("AssetDetails-wrapper")}>
			<div className={cx("header")}>
				<div className={cx("asset")}>
					<DisplayIcon image={asset?.assetImg ? asset?.assetImg : symbolNoneSVG} size={40} />
					<div className={cx("text")}>
						<p>{asset?.mappedAsset}</p>
						<p className={cx("currency")}>{asset?.name}</p>
					</div>
				</div>
				<div className={cx("clickables")}>
					{_.isNil(mediaList)
						? undefined
						: _.map(_.keys(mediaList), key => <img key={key} className={cx(_.camelCase(key))} alt={key} onClick={() => clickLink(mediaList[key])} />)}
				</div>
			</div>
			<div className={cx("divider")} />
			<div className={cx("table")}>
				<InfoRow label={"Asset Name"}>{asset?.asset}</InfoRow>
				<InfoRow label={"Owner"}>
					<span className={cx("blueLink")} onClick={() => history.push(`/account/${refineAddress(asset.owner)}`)}>
						{asset?.owner}
					</span>
				</InfoRow>
				<InfoRow label={"Supply"}>{formatNumber(asset?.supply)}</InfoRow>
				<InfoRow label={"Mintable"}>{asset?.mintable === 1 ? "No" : "Yes"}</InfoRow>
				<InfoRow label={"Price"}>
					{formattedPrice ? (
						<>
							{asset.price !== 0 ? (
								<div className={cx("number-wrapper")}>
									{`$ ${formattedPrice[0]}.`}
									<span className={cx("decimal")}>{formattedPrice[1]} </span>
									<span className={cx(asset.changeRange >= 0 ? "green" : "red")}>
										({asset.changeRange >= 0 ? "+" : "-"} {fixed(Math.abs(asset.changeRange / 100), 3)}%)
									</span>
								</div>
							) : (
								"-"
							)}
						</>
					) : (
						<Skeleton />
					)}
				</InfoRow>
				<InfoRow label={"Holders"}>
					{formatNumber(asset.holders)} Address{asset.holders > 1 ? "es" : ""}
				</InfoRow>
				<InfoRow label={"Transactions"}>{formatNumber(asset.transactions)}</InfoRow>
				{asset.officialSiteUrl ? (
					<InfoRow label={"Website"}>
						<span className={cx("blueLink")} onClick={() => window.open(asset.officialSiteUrl, "__blank")}>
							{asset.officialSiteUrl}
						</span>
					</InfoRow>
				) : (
					undefined
				)}
			</div>
		</div>
	);
}

// const assetDef = {
// 	"id": 44,
// 	"asset": "USDSB-1AC",
// 	"mappedAsset": "USDSB",
// 	"name": "USDS",
// 	"assetImg": "https://static.binance.org/icon/7df5e4de406a4764971244909ae9fcbf",
// 	"supply": 90000000000,
// 	"price": 0.97689466,
// 	"quoteUnit": "USD",
// 	"changeRange": 286.11,
// 	"owner": "bnb1nf5qjthrmxwxnfct4j0w4ct03fghthq24qt990",
// 	"mintable": 0,
// 	"visible": null,
// 	"description": "",
// 	"assetCreateTime": 1560404783743,
// 	"transactions": 1586906,
// 	"holders": 1067,
// 	"officialSiteUrl": "https://www.stably.io",
// 	"contactEmail": "@",
// 	"mediaList": [
// 		{
// 			"mediaName": "Facebook",
// 			"mediaUrl": "https://www.facebook.com/stablycoin",
// 			"mediaImg": "2f1f2622872c4b9c80c6546d797606fd"
// 		},
// 		{
// 			"mediaName": "Twitter",
// 			"mediaUrl": "https://twitter.com/stablycoin",
// 			"mediaImg": "871bf290593148a2bd2eccaa26ee9808"
// 		},
// 		{
// 			"mediaName": "Medium",
// 			"mediaUrl": "https://medium.com/stably-blog",
// 			"mediaImg": "56345f7a9fb744e98b1d72caacd0944c"
// 		},
// 		{
// 			"mediaName": "Instagram",
// 			"mediaUrl": "https://www.instagram.com/stableusd/",
// 			"mediaImg": "6ce578a63b14443ab7779a67694e7ccf"
// 		}
// 	]
// }
