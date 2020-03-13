import * as React from "react";
import styles from "./TableRow.scss";
import cn from "classnames/bind";
import {useHistory} from "react-router-dom";

import {_, refineAddress, formatNumber, reduceString} from "src/lib/scripts";
import {fixed} from "src/lib/Big";

//  components
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";

//  assets
const symbolNoneSVG = process.env.PUBLIC_URL + "/assets/transactions/symbol_none.svg";

const cx = cn.bind(styles);

export const ThinTableRow = ({asset}) => {
	const history = useHistory();

	const formattedMarketCap = !_.isNil(asset.marketCap) ? formatNumber(Math.round(asset.marketCap)) : undefined;
	const formattedPrice = !_.isNil(asset.price) ? formatNumber(fixed(asset.price, 6)).split(".") : undefined;
	const formattedSupply = !_.isNil(asset.supply) ? formatNumber(fixed(asset.supply, 6)).split(".") : undefined;
	return (
		<div className={cx("AssetList-thinTableRow")}>
			<div className={cx("divider")} />
			<div className={cx("section-wrapper")}>
				{asset.name ? (
					<div className={cx("nameImg-wrapper")}>
						<img src={asset?.assetImg ? asset?.assetImg : symbolNoneSVG} alt={"alt"} />
						<div className={cx("name-wrapper")}>
							<div>{asset.mappedAsset}</div>
							<div className={cx("name")}>{asset.name}</div>
						</div>
					</div>
				) : (
					<Skeleton />
				)}
			</div>
			<div className={cx("divider")} />
			<ul className={cx("row")}>
				<li>Market Cap(USD)</li>
				<li className={cx("number-wrapper")}>{formattedMarketCap ? <>$ {formattedMarketCap}</> : <Skeleton />}</li>
			</ul>
			<ul className={cx("row")}>
				<li>Price</li>
				<li className={cx("number-wrapper")}>
					{formattedPrice ? (
						<>
							{asset.price !== 0 ? (
								<>
									{`$ ${formattedPrice[0]}.`}
									<span>{formattedPrice[1]}</span>
								</>
							) : (
								"-"
							)}
						</>
					) : (
						<Skeleton />
					)}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>Supply</li>
				<li className={cx("number-wrapper")}>
					{formattedSupply ? (
						<>
							{formattedSupply[0]}
							{formattedSupply[1] ? (
								<>
									.<span>{formattedSupply[1]}</span>
								</>
							) : (
								undefined
							)}
						</>
					) : (
						<Skeleton />
					)}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>Owner</li>
				<li className={cx("owner")}>{asset.owner ? reduceString(asset.owner, 7, 5) : <Skeleton />}</li>
			</ul>
		</div>
	);
};

export default function({asset}) {
	const history = useHistory();

	const formattedMarketCap = !_.isNil(asset.marketCap) ? formatNumber(Math.round(asset.marketCap)) : undefined;
	const formattedPrice = !_.isNil(asset.price) ? formatNumber(fixed(asset.price, 6)).split(".") : undefined;
	const formattedSupply = !_.isNil(asset.supply) ? formatNumber(fixed(asset.supply, 6)).split(".") : undefined;
	return (
		<TableRow className={cx("AssetList-tableRow")} key={asset.id}>
			<TableCell className={cx("tableCell", "nameCell")} component='th' scope='row' alignt='left'>
				{asset.name ? (
					<div className={cx("nameImg-wrapper")}>
						<img src={asset?.assetImg ? asset?.assetImg : symbolNoneSVG} alt={"alt"} />
						<div className={cx("name-wrapper")}>
							<div>{asset.mappedAsset}</div>
							<div className={cx("name")}>{asset.name}</div>
						</div>
					</div>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tableCell")} component='th' scope='row' align='right'>
				{formattedMarketCap ? <div className={cx("number-wrapper")}>{asset.price !== 0 ? `$ ${formattedMarketCap}` : "-"}</div> : <Skeleton />}
			</TableCell>
			<TableCell className={cx("tableCell")} component='th' scope='row' align='right'>
				{formattedPrice ? (
					<div className={cx("number-wrapper")}>
						{asset.price !== 0 ? (
							<>
								{`$ ${formattedPrice[0]}.`}
								<span>{formattedPrice[1]}</span>
							</>
						) : (
							"-"
						)}
					</div>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tableCell")} component='th' scope='row' align='right'>
				{formattedSupply ? (
					<div className={cx("number-wrapper")}>
						{formattedSupply[0]}
						{formattedSupply[1] ? (
							<>
								.<span>{formattedSupply[1]}</span>
							</>
						) : (
							undefined
						)}
					</div>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tableCell")} component='th' scope='row' align='left'>
				<div className={cx("owner")} onClick={() => history.push(`/account/${asset.owner}`)}>
					{asset.owner ? reduceString(asset.owner, 7, 5) : <Skeleton />}
				</div>
			</TableCell>
		</TableRow>
	);
}
